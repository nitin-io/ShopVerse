import React, { useEffect, useState } from "react";
import AdminMenu from "../../layout/AdminMenu";
import { Layout } from "../../layout/Layout";
import ProductForm from "../form/ProductForm";
import axios from "axios";

const CreateProduct = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminMenu />
          </div>
          <div className="col-md-10">
            <h1>Create Product</h1>
            <ProductForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
