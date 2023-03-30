import React from "react";
import { Layout } from "../components/layout/Layout";

export const PageNotFound = () => {
  return (
    <>
      <Layout>
        <div className="container">
          <h3>404</h3>
          <p>Looks like you're lost</p>
        </div>
      </Layout>
    </>
  );
};
