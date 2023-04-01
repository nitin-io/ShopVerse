import React, { useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [inputValues, setinputValues] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();
    const { email, password } = inputValues;

    // const response = await fetch(`${import.meta.env.VITE_BASE_API_URL_DEV}/api/login`, {
    //   method: "POST",
    //   headers: { "content-type": "application/json" },
    //   body: JSON.stringify({
    //     email,
    //     password,
    //   }),
    // });

    await axios
      .post(`${import.meta.env.VITE_BASE_API_URL_DEV}/api/login`, {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setinputValues((prevValues) => ({ ...prevValues, [name]: value }));
  }

  return (
    <>
      <Layout title={"Sign In"}>
        <div class="container form-container">
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
