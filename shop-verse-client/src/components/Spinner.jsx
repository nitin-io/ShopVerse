import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 && navigate("/login", { state: location.pathname });
    return () => clearInterval(intervalId);
  }, [count, navigate, location]);

  return (
    <div
      className="text-center"
      style={{ height: "100vh", display: "grid", placeContent: "center" }}
    >
      <h3>Redirecting to login page in {count} seconds</h3>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
