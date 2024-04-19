import { useEffect, useState } from "react";
import CartDataModel from "../interfaces/CartDataModel";
import Order_Details from "../interfaces/OrderDetailsModel";
import { useSessionStorage } from "../interfaces/SessionStorage";
import '../styles/cart.css';
import CartItem from "../components/CartItem";
import OrderDetailsDTO from "../interfaces/OrderDetailsDTO";

function Cart() {
    const [cartList, setCartList] = useState<Array<Order_Details>>(new Array<Order_Details>(0));
    const [orderTotal, setOrderTotal] = useState<number>(0);
    const [isLogged, setLogged] = useState(false);

    const { setSessionItem, getSessionItem } = useSessionStorage('cartData');

    useEffect(() => {
        var cartData = getSessionItem() as CartDataModel;
        if (cartData) {
            if (cartData.orderDetails !== undefined && cartData.orderDetails.length > 0) {
                setCartList(cartData.orderDetails);
                var total = cartData.orderDetails.reduce((total, current) => total + current.subtotal, 0);
                setOrderTotal(total);
            }
            if (cartData.customerId !== undefined && cartData.customerId > 0)
                setLogged(true);
        }
    }, []);

    const processOrder = async(e) => {
        e.preventDefault();

        const cartData = getSessionItem() as CartDataModel;
        if (cartData.customerId !== 0) {
            var OrderDetailsDTO = cartData.orderDetails?.map<OrderDetailsDTO>(function (d)
            {
                return {
                    productId: d.productId,
                    orderId: 0,
                    quantity: d.quantity,
                    unitPrice: d.unitPrice,
                    subtotal: d.subtotal
                } as OrderDetailsDTO
            });
            const response = await fetch("api/orders/ProcessOrder?customerId=" + cartData.customerId, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(OrderDetailsDTO)
            });

            if (response.ok) {
                cartData.orderDetails = new Array<Order_Details>(0);
                setSessionItem(cartData);
                alert("Your order was successfully processed");
            }
            else {
                var msg = await response.json();
                alert("Error: " + msg);
            }
        }
    };

    const cart = cartList === undefined
        ? <p>Your Cart List is empty. Add some products from the Catalog page.</p>
        :
        <div>
            {
                cartList.map(cartItem =>
                    <CartItem key={cartItem.productId} {...cartItem} />
                )
            }
        </div>
        ;

    return (
        <div className="container-fluid mt-3">
            <div className="d-flex justify-content-start" id="titleBar">
                <h2>Shopping Cart</h2>
            </div>
            <hr />
            <div className="d-flex">
                <div className="col-9 mt-2 me-2 rounded p-3" style={{ backgroundColor: "white" }}>
                    <div className="w-100">
                        <div className="d-flex justify-content-end gap-2" id="cartListHeaders">
                            <b className="productCol">Product</b>
                            <b className="qtyCol">Quantity</b>
                            <b className="priceCol">Unit Price</b>
                            <b className="subtotalCol">Subtotal</b>
                        </div>
                        {cart}
                    </div>
                </div>
                <div className="col-3 mt-2 ">
                    <div className="card mx-2 p-4">
                        <h5 className="fw-600 mb-2">Order Summary</h5>
                        <div className="d-flex justify-content-between">
                            <p>Order Subtotal:</p>
                            <p className="text-secondary">$ {orderTotal}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p>Shipping:</p>
                            <p className="text-secondary">FREE</p>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between">
                            <b className="fs-4">Total:</b>
                            <b className="fs-4 fw-700 text-secondary">$ {orderTotal}</b>
                        </div>
                        <hr />
                        {cartList.length > 0
                            ? isLogged 
                                ? <form onSubmit={processOrder} className="d-flex justify-content-center">
                                    <button className="btn btn-success w-75 fs-5" type="submit">Process Order</button>
                                </form>
                                : <div className="d-flex flex-column align-items-center">
                                    <p>You need to be Log in to proceed with the Order</p>
                                    <a className="btn btn-outline-primary w-75 fs-5" href="/">Go To Log In</a>
                                  </div>
                            : <a className="btn btn-outline-success align-self-center w-75 fs-5" href="/catalog">Go To Catalog</a>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;