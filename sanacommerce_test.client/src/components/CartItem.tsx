import Order_Details from "../interfaces/OrderDetailsModel";

const CartItem = ({ quantity, unitPrice, subtotal, productId, title, img }: Order_Details) => {
  return (
      <div className="d-flex gap-2">
          <div className="align-content-center imgCol">
              <img src={img} className="img-fluid rounded-start" alt={title} />
          </div>
          <div className="align-content-center productCol">
              <h5>{title}</h5>
          </div>
          <div className="align-content-center qtyCol">
              <p className="fs-5">{quantity} Units.</p>
          </div>
          <div className="align-content-center priceCol">
              <p className="fs-5 fw-600">$ {unitPrice | .00}</p>
          </div>
          <div className="align-content-center subtotalCol">
              <b className="fs-4">$ {subtotal}</b>
          </div>
      </div>
  );
}

export default CartItem;