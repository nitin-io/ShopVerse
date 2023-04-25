import { Layout } from "../layout/Layout";
import Product from "../Product";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Prices } from "../Price";
import { useCart } from "../context/cartContext";

function Home() {
  const [products, setProducts] = useState([]);
  const [isAllProductRendered, setIsAllProductRendered] = useState(false);
  const [productCounter, setProductCounter] = useState(5);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [cart, setCart] = useCart();

  const loadMore = () => {
    setProductCounter(productCounter + 5);
    if (productCounter > products.length) {
      setIsAllProductRendered(true);
    } else {
      setIsAllProductRendered(false);
    }
  };

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

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all?.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const fetchFilterProducts = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL_DEV}/api/v1/product/filter`,
        { radio, checked }
      );

      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (radio.length > 0 || checked.length > 0) fetchFilterProducts();
  }, [checked, radio]);

  useEffect(() => {
    fetchAllCategories();
    if (radio.length === 0 || checked.length === 0) fetchAllProducts();
  }, []);
  return (
    <>
      <Layout title={"All Products - ShopVerse"}>
        <div
          className="offcanvas offcanvas-start white-transparent-background"
          style={{ width: "250px" }}
          data-bs-scroll="true"
          data-bs-backdrop="false"
          tabIndex={-1}
          id="offcanvasScrolling"
          aria-labelledby="offcanvasScrollingLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasScrollingLabel"></h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
          <div className="offcanvas-body">
            <div className="d-flex flex-column">
              <h5>Filter by category</h5>
              {categories?.map((category) => {
                return (
                  <label key={category._id}>
                    <input
                      type="checkbox"
                      name="category"
                      value={category._id}
                      onChange={(e) =>
                        handleFilter(e.target.checked, category._id)
                      }
                    />{" "}
                    {category.name}
                  </label>
                );
              })}
            </div>
            <div className="d-flex flex-column">
              <h5>Filter by price</h5>
              {Prices?.map((price) => {
                return (
                  <label key={price._id}>
                    <input
                      type="radio"
                      name="price"
                      onChange={() => {
                        setRadio(price.array);
                      }}
                    />{" "}
                    {price.name}
                  </label>
                );
              })}
            </div>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                window.location.reload();
              }}
            >
              Reset All Filters
            </button>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row justify-content-center">
            {products?.slice(0, productCounter).map((product) => {
              return (
                <Product key={product._id} id={product._id} product={product} />
              );
            })}
          </div>
          {!isAllProductRendered && (
            <div className="w-100 text-center my-3">
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={loadMore}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

export default Home;
