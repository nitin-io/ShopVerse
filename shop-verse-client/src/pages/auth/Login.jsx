import React, { useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [inputText, setInputText] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();
    const { email, password } = inputText;

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

    setInputText((prevValues) => ({ ...prevValues, [name]: value }));
  }

  return (
    <>
      <Layout title={"Sign In"}>
        <form onSubmit={handleSubmit}>
          <h2>Sign in to your account</h2>
          <input
            type="text"
            name="email"
            placeholder="Enter email address"
            onChange={handleChange}
            value={inputText.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
            value={inputText.password}
          />
          <button type="submit" className="btn">
            Login
          </button>
          <Link to="/register">Create new account</Link>
        </form>
      </Layout>
    </>
  );
}

export default Login;
