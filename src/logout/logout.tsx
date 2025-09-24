import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.post("http://127.0.0.1:8000/api/logout", {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        localStorage.removeItem("token");
        navigate("/login");
      })
      .catch(() => {
        // Even if API fails, clear token
        localStorage.removeItem("token");
        navigate("/login");
      });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <p>Logging out...</p>;
};

export default Logout;
