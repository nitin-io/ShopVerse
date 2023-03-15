import React, { useState } from "react";
import NavBar from "../layout/NavBar";
// import axios from "axios";

function Register() {
  const [inputValue, setInputValue] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();

    console.log(inputValue);
    console.log(JSON.stringify(inputValue));
    await fetch(`${process.env.API_BASE_URL}/register`, {
      method: "POST",
      headers: {"content-type" : "application/json"},
      body: {inputValue}
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setInputValue(prevValue => ({...prevValue, [name]: value}));
    console.log(inputValue);
  }

  return (
    <>
      <NavBar />
      <h1>Register Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fName"
          required
          placeholder="First Name"
          onChange={handleChange}
          value={inputValue.fName}
        />
        <input
          type="text"
          name="lName"
          required
          placeholder="Last Name"
          onChange={handleChange}
          value={inputValue.lName}
        />
        {/* <label>
          <input
            type="radio"
            name="gender"
            value="male"
            required
            onChange={handleChange}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={inputValue.gender === "famale"}
          />
          Female
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="other"
            checked={inputValue.gender === "other"}
          />
          Other
        </label> */}
        <input
          type="text"
          name="email"
          required
          placeholder="Email"
          onChange={handleChange}
          value={inputValue.email}
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          value={inputValue.password}
          onChange={handleChange}
        />
        <input type="submit" value="Register" />
      </form>
    </>
  );
}

export default Register;
