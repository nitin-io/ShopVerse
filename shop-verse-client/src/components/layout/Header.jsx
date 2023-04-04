import React from "react";
import { NavLink } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useAuth } from "../context/auth";

export const Header = () => {
  const [auth, setAuth] = useAuth();

  function handleLogout() {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
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
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <NavLink to="/" className="navbar-brand">
              <FiShoppingCart /> ShopVerse
            </NavLink>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                  className={"nav-link"}
                >
                  Hello, {auth.user ? auth.user.fName : "User"}
                </NavLink>
              </li>
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
                          auth?.user?.role === 1 ? "admin" : "user"
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
                <NavLink to="/cart" className="nav-link">
                  Cart
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
