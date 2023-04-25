import { Layout } from "../layout/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/cartContext";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [cart, setCart] = useCart();
  const params = useParams();

  const fetchSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL_DEV}/api/v1/product/${params.slug}`
      );
      if (data.success) {
        setProduct(data.product);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleProduct();
  }, []);

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row my-5">
          <div className="col-md-4 my-4">
            <img
              src={`${
                import.meta.env.VITE_BASE_API_URL_DEV
              }/api/v1/product/images/${product._id}`}
              width={"100%"}
            />
          </div>
          <div className="col-md-8">
            <h2>{product?.name}</h2>
            <pre>{product?.description}</pre>
            <h4 className="text-info-emphasis fw-bold">
              {Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(product?.price)}
            </h4>
            <button
              className="btn btn-primary btn-sm w-25 mx-auto"
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                toast.success("Successfully Added Product in Cart");
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
        <hr />
        <div className="row">
          <h4>Similar Products</h4>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
