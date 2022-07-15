import React, { Fragment } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Default from "./components/Default";
import Cart from "./components/Cart";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
// import "./css/style.css";
import Landingpage from "./components/Landingpge";

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/list" element={<ProductList />}>
          <Route path="details" element={<ProductList />} />
        </Route>
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Landingpage />} />
        <Route component={Default} />{" "}
      </Routes>
    </Fragment>
  );
};

export default App;
