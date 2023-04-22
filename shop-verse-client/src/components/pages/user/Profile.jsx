import React, { useState, useEffect } from "react";
import { Layout } from "../../layout/Layout";
import UserMenu from "../../layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const [values, setValues] = useState({});
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [auth, setAuth] = useAuth();

  const fetchUserDetails = () => {
    try {
      setValues(auth?.user);
    } catch (error) {
      console.log("user fetching error: " + error);
    }
  };

  // Request to get all states on every refresh
  async function getStates() {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_API_URL_DEV}/api/v1/info/states`
    );
    setStates(response.data);
  }

  useEffect(() => {
    fetchUserDetails();
    console.log(values?.address?.addressLine);
    getStates();
  }, []);

  // Get all disctrict when state changes
  async function getDistricts(stateName) {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BASE_API_URL_DEV
        }/api/v1/info/${stateName}/districts`
      );
      setDistricts(data?.doc?.districts);
    } catch (error) {
      console.log(error);
      toast.error("Error in fetching district names");
    }
  }

  // Change Districts based on selected State
  useEffect(() => {
    getDistricts(values?.address?.state);
  }, [values?.state]);

  // Handle Change on Inputs with help of Destructuring
  function handleChange(event) {
    const { name, value } = event.target;

    setValues((prevValue) => ({ ...prevValue, [name]: value }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BASE_API_URL_DEV}/api/v1/auth/profile`,
        values
      );

      if (data.success) {
        setAuth({ ...auth, user: data?.user });
        let ls = JSON.parse(localStorage.getItem("auth"));
        ls.user = data.user;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <>
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <UserMenu />
            </div>
            <div className="col-md-10">
              <form className="container-fluid" onSubmit={handleSubmit}>
                <div className="col-sm-6">
                  <label htmlFor="first-name" className="form-label">
                    First Name
                  </label>
                  <input
                    id="first-name"
                    type="text"
                    name="fName"
                    onChange={handleChange}
                    value={values?.fName}
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
                    onChange={handleChange}
                    value={values?.lName}
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
                    disabled
                    onChange={handleChange}
                    value={values?.email}
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
                    onChange={handleChange}
                    value={values?.phone}
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
                    value={values?.password}
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
                    value={values?.address?.addressLine}
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
                    value={values?.address?.state}
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
                    value={values?.address?.city}
                  >
                    <option selected>Select Your District</option>
                    {districts?.map((district) => {
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
                    value={values?.address?.zipCode}
                    className="form-control"
                  />
                </div>

                <div class="col-md-12">
                  <button
                    className="btn btn-primary my-3 position-end "
                    type="submit"
                  >
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Profile;
