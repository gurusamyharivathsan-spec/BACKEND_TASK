// src/components/Navbar.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <span
        className="navbar-brand"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/dashboard")}
      >
        🏠 Home
      </span>

      <div className="ms-auto d-flex align-items-center">
        <form className="d-flex me-3" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ width: "250px" }}
          />
          <button className="btn btn-outline-light" type="submit">
            Search
          </button>
        </form>

        <button
          className="btn btn-outline-light me-2"
          onClick={() => navigate("/all-products")}
        >
          All Products
        </button>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
