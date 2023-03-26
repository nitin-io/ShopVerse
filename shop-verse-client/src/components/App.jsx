import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import UserProfile from "./pages/UserProfile";
import Register from "./pages/Register";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/wishlist" element={<Wishlist />} />
        <Route exact path="/profile" element={<UserProfile />} />
        <Route exact path="/add-new-product" element={<AddProduct />} />
      </Routes>
    </>
  );
}

export default App;
