import React from "react";
import { Layout } from "../../layout/Layout";
import AdminMenu from "../../layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminMenu />
          </div>
          <div className="col-9">
            <div className="card col-md-10">
              <h4>Admin Name: {auth?.user?.fName + " " + auth?.user?.lName}</h4>
              <h4>Admin Email: {auth?.user?.email}</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
