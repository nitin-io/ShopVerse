import React from "react";
import NavBar from "./../layout/NavBar";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate;

async function UserProfile() {

  const user = await localStorage.getItem("user");

  if(!user){
    navigate("/login");
  } else {
    const decoded = jwt_decode(user.token);
    console.log(decoded);
  }

  return (
    <>
      <NavBar />
      <main>
        <div>
          <h1>Username</h1>
          <p>This is a profile Component.</p>
          <img alt="User Profile" src="https://picsum.photos/seed/picsum/200/300" />
        </div>
      </main>
    </>
  );
}

export default UserProfile;
