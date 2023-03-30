import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import Helmet from "react-helmet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Layout = ({ children, title, discription, keywords, author }) => {
  return (
    <>
      <Helmet>
        <meta name="description" content={discription} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "80vh" }}>{children}</main>
      <ToastContainer />
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "Online shopping for men, women, and kids",
  discription: "shop verse - e-commerce website",
  keywords: "best offers, best deals",
  author: "Nitin Chaudhary",
};
