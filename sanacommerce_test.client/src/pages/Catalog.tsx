import { useEffect, useState } from "react";
import ProductCardItem from "../components/ProductCardItem";
import productModel from '../interfaces/ProductModel';
import CartDataModel from "../interfaces/CartDataModel";
import Order_Details from "../interfaces/OrderDetailsModel";
import { useSessionStorage } from "../interfaces/SessionStorage";
import ReactPaginate from "react-paginate";

function Catalog() {
    const [products, setProducts] = useState<productModel[]>(new Array<productModel>(0));
    const { setSessionItem, getSessionItem } = useSessionStorage('cartData');

    useEffect(() => {
        populateProductsData();
        var cardData = getSessionItem() as CartDataModel;
        if (!cardData) {
            setSessionItem({ customerId: 0, orderDetails: new Array<Order_Details>(0) } as CartDataModel);
        }
    }, []);

    function ProductList({ productsList }) {
        return (productsList.length == 0
            ? <h5 className="my-4 ms-3">The Product List is empty. Refresh the page or contact support for further information.</h5>
            : <div className="d-flex flex-wrap pt-3">
                {
                    productsList.map(product =>
                        <ProductCardItem key={product.id} {...product} />
                    )
                }
            </div>
        )
    }
    function PaginatedItems({ itemsPerPage }) {
        // Here we use item offsets; we could also use page offsets
        // following the API or data you're working with.
        const [itemOffset, setItemOffset] = useState(0);

        // Simulate fetching items from another resources.
        // (This could be items from props; or items loaded in a local state
        // from an API endpoint with useEffect and useState)
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        const productsList = products?.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(products.length / itemsPerPage);

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % products.length;
            console.log(
                `User requested page number ${event.selected}, which is offset ${newOffset}`
            );
            setItemOffset(newOffset);
        };

        return (
            <>
                <ProductList productsList={productsList} />
                <div className="d-flex justify-content-center">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                    />
                </div>
            </>
        );
    }

    return (
        <div className="container-fluid mt-3">
            <div className="d-flex justify-content-between" id="titleBar">
                <h2>Products</h2>
                <div className="d-flex gap-2 align-items-center">
                    <select className="form-select" defaultValue="0">
                        <option value="0">Sort By ...</option>
                        <option value="1">Price: Low to High</option>
                        <option value="2">Price: High to Low</option>
                        <option value="3">Title: A - Z</option>
                        <option value="4">Title: Z - A</option>
                    </select>
                </div>
            </div>
            <hr />
            <div className="d-flex gap-2 mt-2">
                <div className="sideContent card col-2 p-2">
                    <h4>Filters</h4>

                </div>
                <div className="container card col-10" id="productsList">
                    <PaginatedItems itemsPerPage={3} />
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