// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CategoryList from "./CategoryList";

function Dashboard() {
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setFirstName(decoded.firstName || "User");
    } catch (error) {
      console.error("Invalid token", error);
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="container text-center mt-4">
      <h2>Welcome, {firstName} 👋</h2>
      <p>Browse categories below</p>

      <div className="container mt-4">
        <h3 className="text-center mb-3">Categories</h3>
        <CategoryList />
      </div>
    </div>
  );
}

export default Dashboard;
