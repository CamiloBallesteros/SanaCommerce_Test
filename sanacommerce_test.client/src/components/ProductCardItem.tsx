import { useEffect, useState } from "react";
import CartDataModel from "../interfaces/CartDataModel";
import Order_Details from "../interfaces/OrderDetailsModel";
import Product from "../interfaces/ProductModel";
import { useSessionStorage } from "../interfaces/SessionStorage";

const ProductCardItem = ({ id, code, title, description, price, stock, brand, imgURL }: Product) => {
    const [newItem, isNewItem] = useState(true);
    const [productQty, setProductQty] = useState(0);

    const { setSessionItem, getSessionItem } = useSessionStorage('cartData');

    useEffect(() => {
        var cardData = getSessionItem() as CartDataModel;
        if (cardData) {
            var detail = cardData.orderDetails?.find((item) => item.productId == id);
            if (detail && detail?.quantity > 0) {
                setProductQty(detail.quantity);
                isNewItem(false);
            }
        }
    }, []);

    const addToCart = () => {
        var cardData = getSessionItem() as CartDataModel;
        cardData.orderDetails?.push(
            {
                quantity: 1,
                unitPrice: price,
                subtotal: price,
                productId: id,
                title: title,
                img: imgURL
            } as Order_Details
        );
        setSessionItem(cardData);
        setProductQty(1);
        isNewItem(false);
    }

    const changeQty = (value: string) => {
        var cardData = getSessionItem() as CartDataModel;
        var detail = cardData.orderDetails?.find((item) => item.productId == id);
        if (detail) {
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
                img: imgURL
            } as Order_Details;
            if (newQty === 0) {
                cardData.orderDetails?.splice(cardData.orderDetails?.indexOf(detail), 1);
                isNewItem(true);
            } else
                cardData.orderDetails?.splice(cardData.orderDetails?.indexOf(detail), 1, newOrderDetail);

            setSessionItem(cardData);
            setProductQty(newQty);
        }

    }

    return (
        <div className="card mx-2 mb-3 d-flex flex-wrap flex-row align-content-center" style={{ width: "100%", minHeight: "200px" }} >
            <div className="col-md-3 align-content-center">
                <img src={imgURL} className="img-fluid rounded-start" alt={title} />
            </div>
            <div className="col-md-7 px-2">
                <div className="card-body">
                    <div>
                        <h5 className="card-title">{title}</h5>
                        <small className="text-body-secondary">Item Code ({code})</small>
                    </div>
                    <p className="card-text">{description}</p>
                    <p className="card-text fs-5 fw-semibold">
                        <small className="text-success">Stock: {stock} Units.</small>
                    </p>
                </div>
            </div>
            <div className="col-md-2 d-flex flex-column justify-content-evenly px-2">
                <b className="card-text" style={{ fontSize: "20px" }}>$ {price}</b>
                {newItem && stock !== 0
                    ? <button className="btn btn-success" onClick={addToCart}>Add to Cart</button>
                    : <div className="d-flex">
                        <button className="btn btn-success w-25" style={{ borderBottomRightRadius: 0, borderTopRightRadius: 0 }}
                            onClick={() => changeQty("-")}>-</button>
                        <input className="w-50" type="number"
                            value={productQty > 0 ? productQty : ""}
                            onChange={(e) => setProductQty(Number(e.target.value))}
                            onBlur={() => changeQty(productQty.toString())} />
                        {productQty < stock
                            ? <button className="btn btn-success w-25" onClick={() => changeQty("+")} style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }}>+</button>
                            : <button className="btn btn-success w-25" disabled style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }}>+</button>}
                    </div>
                }
            </div>
        </div>
    );
}

export default ProductCardItem;