import React from "react";
import { Layout } from "../../layout/Layout";
import UserMenu from "../../layout/UserMenu";

const Orders = () => {
  return (
    <>
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <UserMenu />
            </div>
            <div className="col-md-10">Orders</div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Orders;
