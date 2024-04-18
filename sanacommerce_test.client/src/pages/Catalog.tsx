import { useEffect, useState } from "react";
import ProductCardItem from "../components/ProductCardItem";
import productModel from '../interfaces/ProductModel';
import CartDataModel from "../interfaces/CartDataModel";
import Order_Details from "../interfaces/OrderDetailsModel";
import { useSessionStorage } from "../interfaces/SessionStorage";

function Catalog() {
    const [products, setProducts] = useState<productModel[]>();
    const { setSessionItem, getSessionItem } = useSessionStorage('cartData');

    useEffect(() => {
        populateProductsData();
        var cardData = getSessionItem() as CartDataModel;
        if (!cardData) {
            setSessionItem({ customerId: 1, orderDetails: new Array<Order_Details>(0) } as CartDataModel);
        }
    }, []);

    const productList = products === undefined
        ? <h5 className="my-4 ms-3">The Product List is empty. Refresh the page or contact support for further information.</h5>
        :
        <div className="d-flex flex-wrap pt-3">
            {
                products.map(product =>
                    <ProductCardItem key={product.id} {...product} />
                )
            }
        </div>
        ;

    return (
        <div className="container-fluid mt-3">
            <div className="d-flex justify-content-between" id="titleBar">
                <h2>Products</h2>
                <div className="d-flex gap-2 align-items-center">
                    <a href="#">
                        Cards
                    </a>
                    <a href="#">
                        InLine
                    </a>
                    <select className="form-select" defaultValue="0">
                        <option value="0">Order By ...</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
            </div>
            <hr />
            <div className="d-flex gap-2 mt-2">
                <div className="sideContent card col-2 p-2">
                    <h4>Filters</h4>

                </div>
                <div className="container card col-10" id="productsList">
                    {productList}
                </div>
            </div>
        </div>
    );

    async function populateProductsData() {
        const response = await fetch('api/products');
        const data = await response.json();
        setProducts(data);
    }
}

export default Catalog;