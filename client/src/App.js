import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Details from "./pages/Details";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Register";
import Shipping from "./pages/Shipping";
import PrivateRoute from "./components/PrivateRoute";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/details/:prodId" element={<Details />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/payment" element={<Payment />} />
        </Route>
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
