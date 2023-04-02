import React, { useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../components/context/auth";

function Login() {
  const [inputValues, setinputValues] = useState({});
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const { email, password } = inputValues;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL_DEV}/api/v1/auth/login`,
        {
          email,
          password,
        }
      );

      setAuth({
        ...auth,
        user: response.data.user,
        token: response.data.token,
      });

      localStorage.setItem("auth", JSON.stringify(response.data));
      navigate("/");
      setinputValues({});
      toast.success("Loged In Successfully.");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setinputValues((prevValues) => ({ ...prevValues, [name]: value }));
  }

  return (
    <>
      <Layout title={"Sign In"}>
        <div className="container form-container">
          <form onSubmit={handleSubmit} className="row m-auto p-3">
            <h2>Sign in to your account</h2>
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              value={inputValues.email}
              className="form-control"
            />
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={inputValues.password}
              className="form-control"
            />
            <button type="submit" className="btn btn-primary mt-3">
              Login
            </button>
            <Link to="/register" className="p-3">
              Create new account
            </Link>
          </form>
        </div>
      </Layout>
    </>
  );
}

export default Login;
