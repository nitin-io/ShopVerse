import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cartContext";
import SearchInput from "./SearchInput";
import { GiHamburgerMenu } from "react-icons/gi";
import { Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

export const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const location = useLocation();
  console.log(location)
  function handleLogout() {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
  }
  return (
    <>
      <nav className="navbar px-4 navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <NavLink to="/" className="navbar-brand">
            <FiShoppingCart /> ShopVerse
          </NavLink>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <SearchInput />
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" aria-current="page">
                  Home
                </NavLink>
              </li>
              {auth.user ? (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    User
                  </a>
                  <ul className="dropdown-menu">
                    <li></li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? 'admin' : 'user'
                        }`}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/login"
                        className="dropdown-item"
                        onClick={handleLogout}
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink to="/wishlist" className="nav-link">
                  Wishlist
                </NavLink>
              </li>
              <li className="nav-item">
                <Badge count={cart?.length}>
                  <NavLink to="/cart" className="nav-link">
                    <ShoppingCartOutlined style={{ fontSize: '22px' }} />
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {location.pathname === '/' && (
        <div className="ml-4 bg-white shadow-sm py-2 px-2">
          <button
            class="btn btn-sm btn-outline-primary d-flex justify-content-center align-items-center gap-1"
            type="button"
            title="Filters"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasScrolling"
            aria-controls="offcanvasScrolling"
          >
            <GiHamburgerMenu />
            Filters
          </button>
        </div>
      )}
    </>
  );
};
