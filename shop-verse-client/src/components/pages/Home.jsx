import { Layout } from "../layout/Layout";
import Product from "../Product";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Prices } from "../Price";

function Home() {
  const [products, setProducts] = useState([]);
  const [isAllProductRendered, setIsAllProductRendered] = useState(false);
  const [productCounter, setProductCounter] = useState(5);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  const loadMore = () => {
    setProductCounter(productCounter + 5);
    if (productCounter >= products.length) {
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
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <div className=" d-flex flex-column">
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
              <div className=" d-flex flex-column">
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
            <div className="col-md-9 mx-auto">
              {JSON.stringify(radio)}
              {JSON.stringify(checked)}
              <div className="container-fluid">
                <div className="row">
                  {products?.slice(0, productCounter).map((product) => {
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
                {!isAllProductRendered && (
                  <button
                    className="btn btn-outline-primary btn-sm m-auto"
                    onClick={loadMore}
                  >
                    Load More
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Home;
