import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../features/auth/authSlice'; // Adjust the path to your utility function

const PublicRoute = ({ children }) => {
  const token = isAuthenticated();

  if (token) {
    // If the token exists, redirect to the dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // If no token, render the children components (e.g., login, register)
  return children;
};

export default PublicRoute;
