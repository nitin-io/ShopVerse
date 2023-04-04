import React from "react";
import { Layout } from "../../layout/Layout";
import jwt_decode from "jwt-decode";
import { json, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
function UserProfile() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  console.log(auth);
  console.log(auth.user);

  return (
    <>
      <Layout title={"User - Dashboard"}>
        <div>
          <h1></h1>
          <p>{auth.user ? JSON.stringify(auth.user.email) : "Not signed in"}</p>

          <img
            alt="User Profile"
            src="https://picsum.photos/seed/picsum/200/300"
          />
        </div>
      </Layout>
    </>
  );
}

export default UserProfile;
