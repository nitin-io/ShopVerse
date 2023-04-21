import React from "react";
import { useSearch } from "../context/search";
import { Layout } from "../layout/Layout";
import Product from "../Product";

const Search = () => {
  const [values, setValues] = useSearch();
  console.log(values);
  return (
    <Layout title={"Search Results"}>
      <div className="text-center">
        {values?.results?.length > 0
          ? "Found " + values?.results.length + " Results"
          : "No Result Found"}
      </div>
      <div className="container">
        <div className="row">
          {values?.results?.map((product) => {
            return <Product product={product} />;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
