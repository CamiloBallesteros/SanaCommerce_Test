import { useEffect, useState } from "react";
import Login from "../components/Login";
import { useSessionStorage } from "../interfaces/SessionStorage";
import CartDataModel from "../interfaces/CartDataModel";

function Home() {
    const [isLogged, setLogged] = useState(false);
    const { getSessionItem } = useSessionStorage('cartData')

    useEffect(() => {
        const cartData = getSessionItem() as CartDataModel;
        if (cartData.customerId !== undefined && cartData.customerId > 0)
            setLogged(true);
    }, []);

    return (
        <div className="container-fluid mt-3 mx-2 d-flex">
            <div className="col-6 offset-1 rounded d-flex flex-wrap align-content-start p-3 mt-5" id="homeContainer" style={{ minHeight: "70vh" }}>
                <h2 className="col-12 mb-4">Home Page</h2>
                <hr />
                <div className="row">
                    <div className="col-6">
                        <p style={{ textAlign: "justify" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget efficitur mi. Duis maximus risus id neque convallis vehicula. Suspendisse egestas congue sem, ut consequat nibh. Proin commodo ex quis nunc tristique, quis ultrices turpis venenatis. Etiam posuere risus et ornare sodales. Aliquam id enim nulla. Suspendisse congue sagittis odio, in venenatis quam rutrum quis. Nullam et lorem viverra diam tempor ultricies. Praesent quis urna vitae velit convallis venenatis eget quis justo.</p>
                    </div>
                    <div className="col-6">
                        <p style={{ textAlign: "justify" }}>Nulla scelerisque sapien id pulvinar eleifend. Praesent molestie ex ac nibh aliquet aliquet. Curabitur porttitor pulvinar nisl, sed blandit nisi ullamcorper tincidunt. Nullam et maximus est. Vestibulum id ornare libero. Aliquam fringilla velit eu libero pulvinar, ut suscipit arcu commodo. Morbi ut tellus sit amet ante placerat luctus. Pellentesque a convallis orci, sed aliquet ipsum. Aenean vitae tincidunt urna, vitae aliquet lorem. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                    </div>
                </div>
            </div>
            <div className="col-5 d-flex justify-content-center px-3 mt-5">
                {!isLogged
                    ? <Login />
                    : <div className="card d-flex flex-column align-items-center p-5">
                        <h4>You are already successfully Logged</h4>
                        <p className="mt-3 fs-5">Start adding items to your cart from the&nbsp;
                            <a href="/catalog ">Catalog</a>&nbsp;Page
                        </p>
                    </div>
                }
            </div>
        </div>
    );
}

export default Home;