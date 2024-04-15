import { useEffect, useState } from 'react';
import './App.css';
import ProductCardItem from './components/ProductCardItem';

interface Product {
    id: number,
    code: string,
    title: string,
    description: string,
    price: number,
    stock: number,
    categoryId: number,
    brand: string,
    imgURL: string
}

function App() {
    const [products, setProducts] = useState<Product[]>();

    useEffect(() => {
        populateProductsData();
    }, []);

    const productList = products === undefined
        ? <p>The product List is empty. Refresh the page or contact support for further information.</p>
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
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <ul className="navbar-nav ms-1 me-auto">
                        <li className="nav-item">
                            <a className="nav-link logo" href="./">Home</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#">About Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Contact</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Catalog</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav me-1">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Profile</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Cart</a>
                        </li>
                    </ul>
                </div>
            </nav>

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
                        <select className="form-select">
                            <option selected>Order By ...</option>
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
        </>
    );

    async function populateProductsData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        setProducts(data);
    }
}

export default App;