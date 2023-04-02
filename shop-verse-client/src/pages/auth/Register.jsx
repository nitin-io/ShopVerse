import React, { useState, useEffect } from "react";
import "./auth-style.css";
import { Layout } from "../../components/layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const [inputValue, setInputValue] = useState({});
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const navigate = useNavigate();

  // Request to get all states on every refresh
  async function getStates() {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_API_URL_DEV}/api/v1/info/states`
    );
    setStates(response.data);
  }

  useEffect(() => {
    getStates();
  }, []);

  // Get all disctrict when state changes
  async function getDistricts(stateName) {
    const response = await axios.get(
      `${
        import.meta.env.VITE_BASE_API_URL_DEV
      }/api/v1/info/${stateName}/districts`
    );
    setDistricts(response.data.doc.districts);
  }

  // Change Districts based on selected State
  useEffect(() => {
    getDistricts(inputValue.state);
  }, [inputValue.state]);

  // Handling Submit Request
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL_DEV}/api/v1/auth/register`,
        {
          ...inputValue,
        }
      );

      if (response.data.success) {
        toast.success(`${response.data.message}, Redirecting to Login Page`);
        setInputValue({});
        setTimeout(() => {
          navigate("/login");
        }, 6000);
      } else if (!response.data.success) {
        toast.error(`${response.data.message}`);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  function handleChange(event) {
    const { name, value } = event.target;

    setInputValue((prevValue) => ({ ...prevValue, [name]: value }));
  }

  return (
    <>
      <Layout title={"Create new account"}>
        <div className="container-lg form-container my-5 mx-auto">
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
                minLength={8}
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
                {states.map((state) => {
                  return (
                    <option key={state._id} value={state.state}>
                      {state.state}
                    </option>
                  );
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
                <option selected>Select Your District</option>
                {districts.map((district) => {
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

            <div class="col-md-12">
              <button
                className="btn btn-primary my-3 position-end "
                type="submit"
              >
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
