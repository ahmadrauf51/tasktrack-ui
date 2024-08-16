import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../features/auth/authSlice';

const PublicRoute = ({ children }) => {
  const token = isAuthenticated();

    if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default PublicRoute;
