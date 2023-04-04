import React from "react";
import { Layout } from "../../layout/Layout";
import jwt_decode from "jwt-decode";
import { json, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import UserMenu from "../../layout/UserMenu";

function UserProfile() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  console.log(auth);
  console.log(auth.user);

  return (
    <>
      <Layout title={"User - Dashboard"}>
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <UserMenu />
            </div>
            <div className="col-md-10">User</div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default UserProfile;
