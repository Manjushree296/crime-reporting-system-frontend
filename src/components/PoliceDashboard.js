// src/pages/PoliceDashboard.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const PoliceDashboard = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const token = authService.getToken();
      const res = await axios.get("http://localhost:8080/api/reports/pending", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(res.data);
    } catch (error) {
      console.error("Error fetching reports", error);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  const handleInvestigate = async (id) => {
    try {
      const token = authService.getToken();
      await axios.put(
        `http://localhost:8080/api/reports/${id}/investigate`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Report marked as under investigation!");
      fetchReports();
    } catch (error) {
      console.error("Error investigating report", error);
    }
  };

  const handleReject = async () => {
    try {
      const token = authService.getToken();
      await axios.put(
        `http://localhost:8080/api/reports/${selectedReport}/reject`,
        { reason: rejectReason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Report rejected successfully!");
      setRejectReason("");
      setSelectedReport(null);
      fetchReports();
    } catch (error) {
      console.error("Error rejecting report", error);
    }
  };

  return (
    <div className="container mt-4">
      {/* Dashboard Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">🚔 Police Dashboard</h2>
        <button className="btn btn-warning" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="mb-3 text-muted">
        Welcome, Officer! Below are pending crime reports.
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-white bg-primary shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Pending Reports</h5>
              <h3>{reports.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Investigating</h5>
              <h3>5</h3> {/* You can replace with real count */}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-danger shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Rejected</h5>
              <h3>2</h3> {/* Replace with real count */}
            </div>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="card shadow-sm">
        <div className="card-header bg-light fw-bold">Pending Crime Reports</div>
        <div className="card-body p-0">
          <table className="table table-hover table-striped mb-0">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Date</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.length > 0 ? (
                reports.map((report) => (
                  <tr key={report.id}>
                    <td>
                      <span className="badge bg-secondary">{report.id}</span>
                    </td>
                    <td>{report.description}</td>
                    <td>{report.date}</td>
                    <td>{report.location}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={() => handleInvestigate(report.id)}
                      >
                        Investigate
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => setSelectedReport(report.id)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-3">
                    No pending reports.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reject Modal */}
      {selectedReport && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Reject Report</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedReport(null)}
                ></button>
              </div>
              <div className="modal-body">
                <label className="form-label">Reason for rejection:</label>
                <textarea
                  className="form-control"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Enter reason..."
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedReport(null)}
                >
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleReject}>
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoliceDashboard;
