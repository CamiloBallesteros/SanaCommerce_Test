import { useState } from "react";

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitRegister = async (e) => {
        e.preventDefault();

        const registerData = {
            firstName,
            lastName,
            address,
            email,
            password
        };
        const response = await fetch("api/customers/Register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(registerData)
        });

        if (response.ok) {
            var customerID = await response.json();
            if (customerID > 0) {
                alert("Customer created Successfully");
                window.location.href = "/";
            } else {
                alert("The Email/Password entered is incorrect.");
            }
        }
    };

    return (
        <div className="container-fluid mt-3 mx-2 d-flex">
            <div className="col-6 offset-3 rounded d-flex flex-wrap align-content-start p-3 mt-5" style={{ minHeight: "55vh", backgroundColor: "white" }}>
                <h2 className="col-12 mb-4">Register new Customer</h2>
                <hr />
                <form onSubmit={submitRegister}>
                    <div className="row d-flex">
                        <div className="input-group mb-4" style={{ width: "50%" }}>
                            <span className="input-group-text">FirstName</span>
                            <input type="text" className="form-control" required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="input-group mb-4" style={{ width: "50%" }}>
                            <span className="input-group-text">LastName</span>
                            <input type="text" className="form-control"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div className="input-group mb-4">
                            <span className="input-group-text">Address</span>
                            <input type="text" className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className="input-group mb-4">
                            <span className="input-group-text">Email</span>
                            <input type="email" className="form-control" required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="input-group mb-4">
                            <span className="input-group-text">Password</span>
                            <input type="password" className="form-control" required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="w-100 d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary w-50 fs-5 fw-600"  >Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;