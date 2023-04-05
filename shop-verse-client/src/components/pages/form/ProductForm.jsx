import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const ProductForm = ({ handleSubmit, values, setValues }) => {
  const [categories, setCategories] = useState([]);

  const fetchAllCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL_DEV}/api/v1/category/all`
      );
      if (response.data.success) {
        setCategories(response.data.allCategories);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);
  return (
    <div className="container-lg form-container m-1">
      <form className="row mx-auto p-3">
        <div className="col-md-12">
          <label htmlFor="product-name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="product-name"
            className="form-control"
            value={values?.name}
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="product-discription" className="form-label">
            Discription
          </label>
          <input
            type="text"
            name="discription"
            id="product-discription"
            className="form-control"
            value={values?.discription}
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="product-price" className="form-label">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="product-price"
            className="form-control"
            value={values?.price}
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="product-category" className="form-label">
            Category
          </label>
          <select
            id="product-category"
            name="category"
            className="form-control"
          >
            <option>Select a category</option>
            {categories?.map((category) => {
              return <option key={category._id}>{category.name}</option>;
            })}
          </select>
        </div>
        <div className="col-md-12">
          <label htmlFor="product-quantity" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            id="product-quantity"
            className="form-control"
            value={values?.name}
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="product-image" className="form-label">
            Image
          </label>
          <input
            type="file"
            name="images"
            id="product-image"
            className="form-control"
            value={values?.name}
          />
        </div>

        <div className="col-md-4 my-3">
          <button className="btn btn-primary">Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
