import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Layout } from "../../layout/Layout";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [inputValues, setInputValues] = useState({});
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setInputValues((prevValues) => {
      return { ...prevValues, [name]: value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL_DEV}/api/v1/auth/forget-password`,
        // import.meta.env.VITE_BASE_API_URL_DEV
        {
          ...inputValues,
        }
      );
      setInputValues({});
      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 6000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <>
      <Layout title={"Forget Password - ShopVerse"}>
        <div className="container form-container">
          <form onSubmit={handleSubmit} className="row m-auto p-3">
            <h2>Forget Password</h2>
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              id="email"
              type="text"
              name="email"
              onChange={handleChange}
              value={inputValues.email}
              className="form-control"
            />
            <label htmlFor="answer" className="form-label">
              What is name of your first school?
            </label>
            <input
              id="answer"
              type="text"
              name="answer"
              onChange={handleChange}
              value={inputValues.answer}
              className="form-control"
            />
            <label htmlFor="newPassword" className="form-label">
              Enter New Password
            </label>
            <input
              id="newPassword"
              type="password"
              name="newPassword"
              onChange={handleChange}
              value={inputValues.newPassword}
              className="form-control"
            />
            <button type="submit" className="btn btn-primary mt-3">
              Reset Password
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default ForgetPassword;
