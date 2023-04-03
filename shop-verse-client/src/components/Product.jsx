import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
// import AiOutlineHeartFilled from "react-icons/tb";

function Product(props) {
  const [inWishlist, setInWishlist] = useState("false");
  function handleWishlist() {}

  return (
    <div className="product-item" id={props.id}>
      <img
        src="https://picsum.photos/seed/picsum/200/300"
        alt="product"
        height="200px"
        width="300px"
      />
      <h2>{props.name}</h2>
      <h3>₹{props.price}</h3>
      <div>
        <button
          className="btn"
          onClick={handleWishlist}
          title="Add To Wishlist"
        >
          <AiOutlineHeart />
        </button>
        <button className="btn">Add to cart</button>
      </div>
    </div>
  );
}

export default Product;
