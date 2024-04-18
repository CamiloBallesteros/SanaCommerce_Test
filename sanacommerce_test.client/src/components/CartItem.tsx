import { useEffect, useState } from "react";
import CartDataModel from "../interfaces/CartDataModel";
import Order_Details from "../interfaces/OrderDetailsModel";
import productModel from '../interfaces/ProductModel';
import { useSessionStorage } from "../interfaces/SessionStorage";

const CartItem = ({ quantity, unitPrice, subtotal, productId, title, img }: Order_Details) => {
    const [stock, setStock] = useState<number>(0);
    const [qty, setQty] = useState<number>(quantity);
    const { setSessionItem, getSessionItem } = useSessionStorage('cartData');

    useEffect(() => {
        findProduct();
    },[]);

    const findProduct = async () => {
        const response = await fetch('api/products/' + productId);
        const data = (await response.json()) as productModel;
        setStock(data.stock);
    };

    const changeQty = async (value: string) => {
        var cartData = getSessionItem() as CartDataModel;
        var detail = cartData.orderDetails?.find((item) => item.productId == productId);
        if (detail) {
            await findProduct();
            var newQty = isNaN(Number(value))
                ? (value === "+" ? (detail.quantity + 1)
                    : value === "-" ? (detail.quantity - 1)
                        : 0)
                : Number(value);
            newQty = newQty > stock ? stock : newQty;
            var newOrderDetail = {
                quantity: newQty,
                unitPrice: detail.unitPrice,
                subtotal: detail.unitPrice * newQty,
                productId: detail.productId,
                title: title,
                img: img
            } as Order_Details;
            if (newQty === 0) {
                cartData.orderDetails?.splice(cartData.orderDetails?.indexOf(detail), 1);
            } else
                cartData.orderDetails?.splice(cartData.orderDetails?.indexOf(detail), 1, newOrderDetail);

            setSessionItem(cartData);
            setQty(newQty);
            window.location.reload();
        }
    }

    return (
        <>
            <div className="d-flex gap-2">
                <div className="align-content-center imgCol">
                    <img src={img} className="img-fluid rounded-start" alt={title} />
                </div>
                <div className="align-content-center productCol">
                    <h5>{title}</h5>
                </div>
                <div className="align-content-center qtyCol">
                    <p className="fs-5">{qty} Units.</p>
                    <div className="d-flex gap-4">
                        <button className="btn btn-success w-25"
                            onClick={() => changeQty("-")}>-</button>
                        {qty < stock
                            ? <button className="btn btn-success w-25" onClick={() => changeQty("+")}>+</button>
                            : <button className="btn btn-success w-25" disabled>+</button>
                        }
                    </div>
                </div>
                <div className="align-content-center priceCol">
                    <p className="fs-5 fw-600">$ {unitPrice}</p>
                </div>
                <div className="align-content-center subtotalCol">
                    <b className="fs-4">$ {qty * unitPrice}</b>
                </div>
            </div>
        </>
    );
}

export default CartItem;