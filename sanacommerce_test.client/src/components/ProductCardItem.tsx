const ProductCardItem = ({ code, title, description, price, stock, brand, imgURL }) => {


    return (
        <div className="card mx-2 mb-3 d-flex align-content-center" style={{ width: "100%", minHeight: "200px" }} >
            <div className="row g-0">
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
                <div className="col-md-2 d-flex flex-column px-2">
                    <b className="card-text" style={{ fontSize: "20px" }}>$ {price}</b>
                    <button className="btn btn-success">Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

export default ProductCardItem;