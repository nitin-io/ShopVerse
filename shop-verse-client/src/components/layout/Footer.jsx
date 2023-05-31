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
      <p style={{ fontSize: "0.7rem" }}>Copyright &copy; 2023 ShopVerse.com</p>
    </div>
  );
};
