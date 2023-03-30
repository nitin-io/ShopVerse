import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="bg-dark text-white p-3 text-center">
      <p>Copyright &copy; 2023 Nitin Chaudhary</p>
      <div>
        <Link to="/">About</Link>|<Link to="/">Contack</Link>|
        <Link to="/">Privacy & Policy</Link>
      </div>
    </div>
  );
};
