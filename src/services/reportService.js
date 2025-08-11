// src/services/reportService.js
import axios from "axios";

const BASE = "http://localhost:8080/api/reports";

const getAuthHeader = () => {
  const raw = localStorage.getItem("user");
  if (!raw) return {};
  const user = JSON.parse(raw);
  return { Authorization: `Bearer ${user.token}` };
};

export const submitReport = (payload) => {
  // payload: { description, date, location, type, forOthers }
  return axios.post(`${BASE}/submit`, payload, { headers: getAuthHeader() });
};

export const getMyReports = () => {
  return axios.get(`${BASE}/my-reports`, { headers: getAuthHeader() });
};

export const getPendingReports = () => {
  return axios.get(`${BASE}/pending`, { headers: getAuthHeader() });
};

export const investigateReport = (id) => {
  return axios.put(`${BASE}/${id}/investigate`, {}, { headers: getAuthHeader() });
};

export const rejectReport = (id, reason) => {
  return axios.put(`${BASE}/${id}/reject?reason=${encodeURIComponent(reason)}`, {}, { headers: getAuthHeader() });
};
