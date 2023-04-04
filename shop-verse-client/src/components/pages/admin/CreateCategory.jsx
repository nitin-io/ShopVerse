import React from "react";
import { Layout } from "../../layout/Layout";
import AdminMenu from "../../layout/AdminMenu";

const CreateCategory = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminMenu />
          </div>
          <div className="col-md-10">
            <h1>Create Category</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
