import { useEffect, useState } from "react";
import "../styles/navbar.css"
import { useSessionStorage } from "../interfaces/SessionStorage";
import CartDataModel from "../interfaces/CartDataModel";

function NavBar() {
    const [isCartList, setCartList] = useState(false);
    const [isLogged, setLogged] = useState(false);
    const { setSessionItem, getSessionItem } = useSessionStorage('cartData');

    useEffect(() => {
        const cartData = getSessionItem() as CartDataModel;
        if (cartData.orderDetails !== undefined && cartData.orderDetails.length > 0)
            setCartList(true);

        if (cartData.customerId !== undefined && cartData.customerId > 0)
            setLogged(true);
    }, []);

    const LogOut = () => {
        const cartData = getSessionItem() as CartDataModel;
        cartData.customerId = 0;
        setSessionItem(cartData);
        window.location.href = "/";
    };

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <ul className="navbar-nav ms-1 me-auto gap-2">
                    <li className="nav-item">
                        <a className="nav-link logo" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/about">About Us</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/contact">Contact</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/catalog ">Catalog</a>
                    </li>
                </ul>
                <ul className="navbar-nav me-1 gap-2">
                    {isCartList
                        ? <div style={{
                            backgroundColor: "red", position: "relative", width: "12px", height: "12px"
                            , borderRadius: "25px", left: "71px", top: "9px"
                        }} ></div>
                        : null}
                    <li className="nav-item">
                        <a className="nav-link" href="/cart">
                            Cart
                        </a>
                    </li>
                    {isLogged
                        ? <li className="nav-item">
                            <a className="nav-link" href="#" onClick={LogOut}>Log Out</a>
                          </li>
                        : null}
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;