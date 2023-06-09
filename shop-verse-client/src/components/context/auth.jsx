import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

// To get a value we need to wrap a component with Context.Provider
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // Default Authorization Token
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("auth"));
    if (data) {
      setAuth({ user: data.user, token: data.token });
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
