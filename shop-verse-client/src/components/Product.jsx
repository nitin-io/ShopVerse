import React from "react";
import { useCart } from "./context/cartContext";
import { toast } from "react-toastify";

function Product({ product }) {
  const [cart, setCart] = useCart();
  return (
    <div
      className="card m-2"
      style={{
        width: "15rem",
        padding: "0",
      }}
    >
      <img
        src={`${import.meta.env.VITE_BASE_API_URL_DEV}/api/v1/product/images/${
          product._id
        }`}
        alt="product"
        height={"200px"}
        className="card-img-top img-fluid"
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <div className="card-text">
          {Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(product?.price)}
        </div>
        <div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Successfully Added Product in Cart");
            }}
          >
            Add to Cart
          </button>
          <button className="btn btn-primary btn-sm m-2">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default Product;
