import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import CitizenDashboard from "./components/CitizenDashboard";
import PoliceDashboard from "./components/PoliceDashboard";
import Logout from "./components/Logout";

function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg"
        style={{
          backgroundColor: "#003366", // Dark Blue
          padding: "12px 20px",
        }}
      >
        <div className="container-fluid">
          <Link
            to="/"
            className="navbar-brand"
            style={{
              color: "white",
              fontSize: "1.5rem",
              fontWeight: "bold",
              letterSpacing: "1px",
              textDecoration: "none",
            }}
          >
            Crime Reporting System
          </Link>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/citizen-dashboard" element={<CitizenDashboard />} />
          <Route path="/police-dashboard" element={<PoliceDashboard />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
