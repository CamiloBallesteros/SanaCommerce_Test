import { useState } from "react";
import CartDataModel from "../interfaces/CartDataModel";
import Order_Details from "../interfaces/OrderDetailsModel";
import { useSessionStorage } from "../interfaces/SessionStorage";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setSessionItem, getSessionItem } = useSessionStorage('cartData');

    const submitLogin = async (e) => {
        e.preventDefault();

        const loginData = {
            email: email,
            password: password
        };
        const response = await fetch("api/customers/Login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(loginData)
        });

        if (response.ok) {
            var cardData = getSessionItem() as CartDataModel;
            var customerID = await response.json();

            if (customerID > 0) {
                if (cardData) {
                    cardData.customerId = customerID;
                } else {
                    cardData = { customerId: customerID, orderDetails: new Array<Order_Details>(0) };
                }
                setSessionItem(cardData);
                window.location.reload();
            } else {
                alert("The Email/Password entered is incorrect.");
            }
        }
    };

    return (
        <form onSubmit={submitLogin} className="w-75">
            <div className="card d-flex flex-column align-items-center p-5">
                <h5 className="fs-3 fw-700 mb-4">Log In</h5>
                <div className="input-group mb-3">
                    <span className="input-group-text">Email</span>
                    <input type="email" className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Password</span>
                    <input type="password" className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </div>
        </form>
    );
}

export default Login;