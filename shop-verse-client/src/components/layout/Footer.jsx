import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const linkStyle = {
    padding: "5px 10px",
    color: "#fff",
    textDecoration: "none",
  };

  return (
    <div className="bg-dark text-white p-3 text-center">
      <p>Copyright &copy; 2023 Nitin Chaudhary</p>
      <div>
        <Link to="/about" style={linkStyle}>
          About
        </Link>{" "}
        |{" "}
        <Link to="/contact" style={linkStyle}>
          Contact
        </Link>{" "}
        |
        <Link to="/privacy-and-policy" style={linkStyle}>
          Privacy & Policy
        </Link>
      </div>
    </div>
  );
};
