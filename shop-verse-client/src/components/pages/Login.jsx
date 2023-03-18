import React, { useState } from "react";
import NavBar from "./../layout/NavBar";
import { Link } from "react-router-dom";

function Login() {
  const [inputText, setInputText] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();
    const { email, password } = inputText;

    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.token) {
      alert("Login successfully");
      localStorage.setItem("token", data.token);
    } else {
      console.log(data);
      alert("Password or Email is incorrect");
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setInputText((prevValues) => ({ ...prevValues, [name]: value }));
  }

  return (
    <>
      <NavBar />
      <main>
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
      </main>
    </>
  );
}

export default Login;
