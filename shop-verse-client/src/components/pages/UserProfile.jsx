import React from "react";
import NavBar from "./../layout/NavBar";

function UserProfile() {
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
