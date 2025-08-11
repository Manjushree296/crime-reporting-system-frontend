// Navbar.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">
        <span
          className="navbar-brand fw-bold"
          style={{
            fontSize: "1.5rem",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            letterSpacing: "1px",
            color: "#FFD700",
          }}
        >
          Crime Reporting System
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
