import { Layout } from "../layout/Layout";
import { useAuth } from "../context/auth.jsx";
import Product from "../Product";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function Home() {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();

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

  const fetchAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL_DEV}/api/v1/category/all`
      );
      if (data.success) {
        setCategories(data.allCategories);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllProducts();
    fetchAllCategories();
  }, []);
  return (
    <>
      <Layout title={"All Products - ShopVerse"}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 d-flex flex-column">
              Filter by category
              {categories?.map((category) => {
                return (
                  <label key={category._id}>
                    <input type="radio" name="category" value={category._id} />{" "}
                    {category.name}
                  </label>
                );
              })}
            </div>
            <div className="col-md-10 mx-auto">
              <div className="container-fluid">
                <div className="row">
                  {products?.map((product) => {
                    return (
                      <Product
                        key={product._id}
                        name={product.name}
                        slug={product.slug}
                        price={product.price}
                        id={product._id}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Home;
