import React from "react";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL_DEV}/api/v1/product/search/${
          values.keyword
        }`
      );
      setValues({ ...values, results: data.products });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="d-flex mx-auto w-50" role="search">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={values.keyword}
        onChange={(e) => {
          setValues({ ...values, keyword: e.target.value });
        }}
      />
      <button
        className="btn btn-outline-success"
        type="submit"
        onClick={handleSubmit}
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
