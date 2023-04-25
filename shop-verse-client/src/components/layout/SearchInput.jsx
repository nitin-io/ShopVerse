import React from "react";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import { SearchOutlined } from "@ant-design/icons";

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
    <div className="d-flex mx-auto" role="search">
      <Input
        type="search"
        placeholder="Type a keyword..."
        aria-label="Search"
        value={values.keyword}
        onChange={(e) => {
          setValues({ ...values, keyword: e.target.value });
        }}
        prefix={<SearchOutlined />}
      />
      <button
        className="btn btn-sm btn-outline-primary mx-1"
        type="submit"
        onClick={handleSubmit}
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
