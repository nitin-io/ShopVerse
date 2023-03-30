import React, { useState } from "react";
import { Layout } from "../../components/layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import states from "../../assets/statesAndDistricts.json";

function Register() {
  const [inputValue, setInputValue] = useState({});
  const [districts, setDistricts] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    toast.success("Hello World");

    console.log(inputValue);
    console.log(JSON.stringify(inputValue));
    await axios.post(
      `${import.meta.env.VITE_BASE_API_URL_DEV}/api/v1/auth/register`,
      {
        ...inputValue,
      }
    );
  }
  function handleChange(event) {
    const { name, value } = event.target;

    setInputValue((prevValue) => ({ ...prevValue, [name]: value }));
    console.log(inputValue);
  }

  return (
    <>
      <Layout title={"Create new account"}>
        <div className="container m-5">
          <form onSubmit={handleSubmit} className="register row mx-auto">
            <h2 className="my-4">Register Form</h2>
            <div className="col-sm-6">
              <label htmlFor="first-name" className="form-label">
                First Name
              </label>
              <input
                id="first-name"
                type="text"
                name="fName"
                required
                onChange={handleChange}
                value={inputValue.fName}
                className="form-control"
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="last-name" className="form-label">
                Last Name
              </label>
              <input
                id="last-name"
                type="text"
                name="lName"
                required
                onChange={handleChange}
                value={inputValue.lName}
                className="form-control"
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                id="email"
                type="text"
                name="email"
                required
                onChange={handleChange}
                value={inputValue.email}
                className="form-control"
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="phone-number" className="form-label">
                Phone Number
              </label>
              <input
                id="phone-number"
                type="number"
                name="phone"
                required
                onChange={handleChange}
                value={inputValue.phone}
                className="form-control"
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                required
                value={inputValue.password}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="address-line" className="form-label">
                Address
              </label>
              <input
                id="address-line"
                type="text"
                name="addressLine"
                required
                value={inputValue.addressLine}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <select
                className="form-select"
                id="state"
                name="state"
                onChange={handleChange}
                value={inputValue.state}
              >
                <option selected>Select State</option>
                {states.states.map((state) => {
                  return <option value={state.state}>{state.state}</option>;
                })}
              </select>
            </div>
            <div className="col-md-12">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <select
                className="form-select"
                id="city"
                name="city"
                onChange={handleChange}
                value={inputValue.city}
              >
                <option selected>Select Your City</option>
                {states.states.districts.map((district) => {
                  return <option value={district}>{district}</option>;
                })}
              </select>
            </div>

            <div className="col-md-12">
              <label htmlFor="zip-code" className="form-label">
                Zip Code
              </label>
              <input
                id="zip-code"
                type="number"
                name="zipCode"
                required
                onChange={handleChange}
                value={inputValue.zipCode}
                className="form-control"
              />
            </div>

            <div className="col-md-12 mx-auto m-3">
              <button className="btn btn-primary" type="submit">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
}

export default Register;
