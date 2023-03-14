import React, { useState } from "react";
import NavBar from "./../layout/NavBar";
import { Link } from "react-router-dom";

function Login() {
  const [inputText, setInputText] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();

    const {email, password} = inputText;

    const response = await fetch(`${process.env.API_URL}/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = response.json();
    console.log(response);
    console.log(data);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setInputText(prevValues => ({...prevValues, [name]: value}));
  }

  return (
    <>
      <NavBar />
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit}>
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
        <input type="submit" value="submit" />
      </form>

      <Link to="/register">Create new account</Link>
    </>
  );
}

export default Login;
