import React from "react";
import { useCart } from "./context/cartContext";
import { toast } from "react-toastify";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from "axios";
import { useAuth } from "./context/auth";
import { useNavigate } from "react-router-dom";

function Product({ product }) {
  const [auth] = useAuth();
  const navigate = useNavigate();

  const iconPosition = {
    position: "absolute",
    right: "5%",
    top: "5%",
    cursor: "pointer",
    color: "blue",
  };

  const [cart, setCart] = useCart();
  return (
    <div
      className="card m-2"
      style={{
        width: "15rem",
        padding: "0",
      }}
    >
      <AiOutlineHeart
        style={iconPosition}
        title="Add To Wishlist"
        onClick={async () => {
          try {
            if (auth?.token) {
              await axios.put(
                `${
                  import.meta.env.VITE_BASE_API_URL_DEV
                }/api/v1/auth/add-to-wishlist/${product._id}`
              );
              toast.success("Added To Wishlist");
            } else {
              toast.warn("Login to add product into wishlist");
            }
          } catch (err) {
            console.log(err);
            toast.error("Something is wrong");
          }
        }}
      />

      <img
        src={`${import.meta.env.VITE_BASE_API_URL_DEV}/api/v1/product/images/${
          product._id
        }`}
        alt="product"
        height={"200px"}
        className="card-img-top object-fit-contain"
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <div className="card-text text-info-emphasis fw-bold">
          {Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(product?.price)}
        </div>
      </div>
      <div className="card-footer mx-auto">
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => {
            navigate(`/product/${product?.slug}`);
          }}
        >
          More Details
        </button>
        <button
          className="btn btn-primary btn-sm m-1"
          onClick={() => {
            setCart([...cart, product]);
            localStorage.setItem("cart", JSON.stringify([...cart, product]));
            toast.success("Successfully Added Product in Cart");
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Product;
