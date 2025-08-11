import React, { useEffect, useState } from "react";
import { getMyReports, submitReport } from "../services/reportService";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CitizenDashboard() {
  const [reports, setReports] = useState([]);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("SELF");
  const [forOthers, setForOthers] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await getMyReports();
      setReports(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load reports");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitReport({ description, date, location, type, forOthers });
      alert("Report submitted successfully");
      setDescription("");
      setDate("");
      setLocation("");
      setType("SELF");
      setForOthers(false);
      fetchReports();
    } catch (err) {
      console.error(err);
      alert("Cannot submit report");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container mt-4">
      {/* Navbar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Citizen Dashboard</h2>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="row">
        {/* Submit Report Form */}
        <div className="col-md-6">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">
              Submit New Report
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Date of Crime</label>
                  <input
                    type="date"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Location</label>
                  <input
                    className="form-control"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Type</label>
                  <select
                    className="form-select"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="SELF">Self</option>
                    <option value="OTHERS">For Others</option>
                  </select>
                </div>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={forOthers}
                    onChange={(e) => setForOthers(e.target.checked)}
                    id="forOthers"
                  />
                  <label className="form-check-label" htmlFor="forOthers">
                    Filing on behalf of someone else
                  </label>
                </div>
                <button className="btn btn-primary w-100">Submit</button>
              </form>
            </div>
          </div>
        </div>

        {/* My Reports */}
        <div className="col-md-6">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-success text-white">My Reports</div>
            <div className="card-body">
              {reports.length === 0 ? (
                <p>No reports yet</p>
              ) : (
                <div className="list-group">
                  {reports.map((r) => (
                    <div key={r.id} className="list-group-item">
                      <h6>Status: {r.status}</h6>
                      <p>{r.description}</p>
                      <p>
                        <b>Date:</b> {r.dateOfCrime || r.date}
                      </p>
                      <p>
                        <b>Location:</b> {r.location}
                      </p>
                      {r.rejectionReason && (
                        <p className="text-danger">
                          <b>Rejected:</b> {r.rejectionReason}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-info text-white">
          Frequently Asked Questions
        </div>
        <div className="card-body">
          <div className="accordion" id="faqAccordion">
            {/* Q1 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="q1">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#a1"
                >
                  What documents are needed to file a case?
                </button>
              </h2>
              <div
                id="a1"
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  You will need a valid ID proof (Aadhaar, Passport, Driving
                  License), any supporting evidence (photos, videos, witness
                  statements), and a written description of the incident.
                </div>
              </div>
            </div>

            {/* Q2 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="q2">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#a2"
                >
                  How long does it take for a case to be assigned?
                </button>
              </h2>
              <div
                id="a2"
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Cases are usually assigned to an officer within 24-48 hours of
                  submission, depending on workload and urgency.
                </div>
              </div>
            </div>

            {/* Q3 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="q3">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#a3"
                >
                  Can I report a crime anonymously?
                </button>
              </h2>
              <div
                id="a3"
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Yes, you may choose to file anonymously, but providing your
                  details helps in faster case processing and follow-up.
                </div>
              </div>
            </div>

            {/* Q4 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="q4">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#a4"
                >
                  What happens if my report is rejected?
                </button>
              </h2>
              <div
                id="a4"
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  If rejected, you will receive a rejection reason. You can
                  correct missing or incorrect details and resubmit.
                </div>
              </div>
            </div>

            {/* Q5 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="q5">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#a5"
                >
                  Can I edit my report after submission?
                </button>
              </h2>
              <div
                id="a5"
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  No, once submitted, a report cannot be edited. You can submit
                  a new report with updated details.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center p-3 mt-4">
        <p>
          <b>Emergency Numbers:</b> Police: 100 | Ambulance: 108 | Women
          Helpline: 1091
        </p>
      </footer>
    </div>
  );
} 
