import React, { useEffect, useState } from "react";
import { Layout } from "../../layout/Layout";
import AdminMenu from "../../layout/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import CategoryForm from "../form/CategoryForm";
import { Button, Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [newName, setNewName] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL_DEV}/api/v1/category/create`,
        {
          newCategory,
        }
      );
      if (response.data.success) {
        fetchAllCategories();
        toast.success("New Category Added Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const handleDelete = async (pid) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_API_URL_DEV}/api/v1/category/delete/${pid}`
      );
      fetchAllCategories();
      toast.success("Deleted");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL_DEV}/api/v1/category/all`
      );
      setNewCategory("");
      if (response.data.success) {
        setCategories(response.data.allCategories);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.put(
      `${import.meta.env.VITE_BASE_API_URL_DEV}/api/v1/category/update/${
        selected._id
      }`,
      { name: newName }
    );
    console.log(response.data);
    if (response.data.success) {
      setNewName("");
      setIsModalOpen(false);
      fetchAllCategories();
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminMenu />
          </div>
          <div className="col-md-10">
            <h1>Create Category</h1>
            <CategoryForm
              handleSubmit={handleSubmit}
              value={newCategory}
              setValue={setNewCategory}
            />
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Category</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((category) => {
                  return (
                    <tr>
                      <td key={category._id}>{category.name}</td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            setIsModalOpen(true);
                            setNewName(category.name);
                            setSelected(category);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger mx-2 btn-sm"
                          onClick={() => {
                            handleDelete(category._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <Modal
          title={"Update Category"}
          onCancel={() => {
            setIsModalOpen(false);
          }}
          footer={null}
          open={isModalOpen}
        >
          <CategoryForm
            value={newName}
            setValue={setNewName}
            handleSubmit={handleUpdateSubmit}
          />
        </Modal>
      </div>
    </Layout>
  );
};

export default CreateCategory;
