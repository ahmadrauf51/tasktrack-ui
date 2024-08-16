import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../features/auth/authSlice'; // Adjust the path to your utility function

const PrivateRoute = ({ children }) => {
  const token = isAuthenticated();

  if (!token) {
    // If no token is found, redirect to the login page
    return <Navigate to="/" replace />;
  }

  // If the token exists, render the children components (e.g., dashboard)
  return children;
};

export default PrivateRoute;
