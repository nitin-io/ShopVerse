import React, { useState } from "react";
import NavBar from "../layout/NavBar";

function Register() {
  const [inputValue, setInputValue] = useState({});

  async function handleSubmit(event) {

    event.preventDefault();
    console.log(inputValue);
    console.log(JSON.stringify(inputValue));
    await fetch("http://127.0.0.1:8080/register", {
      method: "POST",
      mode: "cors",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: JSON.stringify(inputValue),
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
