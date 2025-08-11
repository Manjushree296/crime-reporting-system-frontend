// src/pages/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear token and any stored user data
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // Redirect to login
    navigate('/login');
  }, [navigate]);

  return (
    <div className="container text-center mt-5">
      <h2>You have been logged out.</h2>
      <p>Redirecting to login...</p>
    </div>
  );
};

export default Logout;
