import React from "react";
import { Layout } from "../components/layout/Layout";

function Wishlist() {
  return (
    <>
      <Layout title={"Your Wishlist"}>
        <ul>
          <li>This</li>
          <li>is</li>
          <li>a</li>
          <li>Wishlist</li>
          <li>Component.</li>
        </ul>
      </Layout>
    </>
  );
}

export default Wishlist;
