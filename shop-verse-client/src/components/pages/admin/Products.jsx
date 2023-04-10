import React, { useEffect, useState } from "react";
import { Layout } from "../../layout/Layout";
import AdminMenu from "../../layout/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL_DEV}/api/v1/product/products`
      );
      if (data.success) {
        setProducts(data.allProducts);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_API_URL_DEV}/api/v1/product/delete/${id}`
      );
      toast.success("Product deleted successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminMenu />
          </div>
          <div className="col-md-10">
            <h1>Products</h1>
            <div className="container-fluid">
              <div className="row">
                {products?.map((product) => {
                  return (
                    <div
                      onClick={() => {
                        navigate(
                          `/dashboard/admin/update-product/${product.slug}`
                        );
                      }}
                      className="card"
                      style={{
                        width: "18rem",
                        padding: "0",
                      }}
                    >
                      <img
                        src={`${
                          import.meta.env.VITE_BASE_API_URL_DEV
                        }/api/v1/product/images/${product._id}`}
                        alt="product"
                        height={"200px"}
                        className="card-img-top img-fluid"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <div className="card-text">Rs {product.price}</div>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleDelete(product._id);
                          }}
                        >
                          Delete Product
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
