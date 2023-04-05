import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit} className="col-md p-3">
        <input
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className="form-control"
          name="name"
        />
        <button className="btn btn-sm btn-primary">Submit</button>
      </form>
    </>
  );
};

export default CategoryForm;
