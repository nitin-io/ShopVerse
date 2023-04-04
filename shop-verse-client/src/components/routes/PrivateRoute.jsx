import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import Spinner from "../Spinner";

const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL_DEV}/api/v1/auth/user-auth`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );

      if (response.data.ok) {
        return setOk(true);
      }
    }

    if (auth?.token) checkAuth();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
};

export default PrivateRoute;
