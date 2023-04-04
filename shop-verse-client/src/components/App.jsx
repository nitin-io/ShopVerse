import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Dashboard from "./pages/user/Dashboard";
import { PageNotFound } from "./pages/PageNotFound";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PrivateRoute from "./routes/PrivateRoute";
import ForgetPassword from "./pages/auth/ForgetPassword";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/forget-password" element={<ForgetPassword />} />
        <Route exact path="/dashboard" element={<PrivateRoute />}>
          <Route exact path="" element={<Dashboard />} />
        </Route>
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/wishlist" element={<Wishlist />} />
        <Route exact path="/add-new-product" element={<AddProduct />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
