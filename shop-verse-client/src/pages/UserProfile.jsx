import React from "react";
import { Layout } from "../components/layout/Layout";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate;

async function UserProfile() {
  const user = await localStorage.getItem("user");

  if (!user) {
    navigate("/login");
  } else {
    const decoded = jwt_decode(user.token);
    console.log(decoded);
  }

  return (
    <>
      <Layout>
        <div>
          <h1>Username</h1>
          <p>This is a profile Component.</p>
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
