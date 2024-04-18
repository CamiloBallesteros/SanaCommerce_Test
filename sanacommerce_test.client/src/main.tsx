import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css'

import Layout from './containers/Layout.tsx';
import Home from './pages/Home.tsx';
import Catalog from './pages/Catalog.tsx';
import NotFound from './pages/NotFound.tsx';
import ProfileManagement from './pages/ProfileManagement.tsx';
import About from './pages/About.tsx';
import Contact from './pages/Contact.tsx';
import Cart from './pages/Cart.tsx';



ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="catalog" element={<Catalog />} >
                        <Route path="type" />
                    </Route>
                    <Route path="cart" element={<Cart />} />
                    <Route path="profile" element={<ProfileManagement />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    </React.StrictMode>
)

//function init() {
//    useEffect(() => {
//        sessionStorage.setItem('cartData', JSON.stringify({ customerId: 0, orderDetails: new Array<Order_Details>(0) }));
//    }, []);
//}


