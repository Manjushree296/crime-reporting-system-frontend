import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

const login = (username, password) => {
  return axios.post(API_URL + 'login', { username, password })
    .then(response => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    });
};

const register = (username, email, password) => {
  return axios.post(API_URL + 'register', { username, email, password });
};

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  return null;
};

const authService = {
  login,
  register,
  logout,
  getCurrentUser
};

export default authService;
