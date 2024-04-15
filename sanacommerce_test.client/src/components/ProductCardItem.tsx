const ProductCardItem = ({ code, title, description, price, stock, brand, imgURL }) => {
    return (
        <div className="card mx-2 mb-3" style={{ width: "100%" }} >
            <div className="row g-0">
                <div className="col-md-3">
                    <img src={imgURL} className="img-fluid rounded-start" alt={title} />
                </div>
                <div className="col-md-9">
                    <div className="card-body">
                        <div>
                            <h5 className="card-title">{title}</h5>
                            <small className="text-body-secondary">Item Code ({code})</small>
                        </div>
                        <p className="card-text">{description}</p>
                        <p className="card-text">
                            <small className="text-body-success">{stock}</small>
                        </p>
                        <p>$ {price}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCardItem;