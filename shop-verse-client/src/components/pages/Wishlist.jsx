import React from "react";
import { Layout } from "../layout/Layout";
import { FiShoppingCart } from "react-icons/fi";

function Wishlist() {
  return (
    <>
      <Layout title={"Your Wishlist"}>
        <h1
          text-align-center
          item-align-center
          style={{
            display: "grid",
            placeContent: "center",
            height: "100vh",
          }}
        >
          <FiShoppingCart
            style={{
              width: "200px",
              height: "200px",
            }}
          />
        </h1>
      </Layout>
    </>
  );
}

export default Wishlist;
