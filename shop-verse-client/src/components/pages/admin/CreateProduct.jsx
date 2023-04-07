import React, { useEffect, useState } from "react";
import AdminMenu from "../../layout/AdminMenu";
import { Layout } from "../../layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const [values, setValues] = useState({});
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevVals) => ({ ...prevVals, [name]: value }));
  };

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

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log("Submit");
      console.log(values);
      const productData = new FormData();
      productData.append("name", values.name);
      productData.append("description", values.description);
      productData.append("price", values.price);
      productData.append("quantity", values.quantity);
      productData.append("category", values.category);
      productData.append("images", image);
      console.log(productData);
      const response = await axios
        .post(
          `${import.meta.env.VITE_BASE_API_URL_DEV}/api/v1/product/add-product`,
          productData
        )
        .catch((err) => {
          console.log(err);
        });
      console.log("Axios Request Sent");
      console.log(response?.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminMenu />
          </div>
          <div className="col-md-10">
            <h1>Create Product</h1>
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
                    onChange={handleChange}
                    value={values?.name}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="product-description" className="form-label">
                    Description
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    id="product-description"
                    className="form-control"
                    onChange={handleChange}
                    value={values?.description}
                    required
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
                    onChange={handleChange}
                    value={values?.price}
                    required
                  />
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
                    onChange={handleChange}
                    value={values?.quantity}
                    required
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
                    onChange={handleChange}
                    value={values?.category}
                    required
                  >
                    <option>Select a category</option>
                    {categories?.map((category) => {
                      return (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="col-md-12 mt-3">
                  <button className="btn btn-outline-secondary">
                    <label>
                      {image ? image.name : "Upload an image"}
                      <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                        hidden
                      />
                    </label>
                  </button>
                  <div className="form-text">Image size must be under 5MB</div>
                </div>
                <div className="col-md-12 mt-3">
                  {image && (
                    <img
                      src={URL.createObjectURL(image)}
                      width={"200px"}
                      alt="Product Image"
                      className="img img-responsive"
                    />
                  )}
                </div>

                <div className="col-md-4 my-3">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
