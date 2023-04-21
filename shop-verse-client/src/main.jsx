import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/context/auth";
import App from "./components/App";
import "./index.css";
import "antd/dist/reset.css";
import { CartProvider } from "./components/context/cartContext";
import { SearchProvider } from "./components/context/search";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <SearchProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </SearchProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
