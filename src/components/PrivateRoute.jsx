import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../features/auth/authSlice'; 

const PrivateRoute = ({ children }) => {
  const token = isAuthenticated();

    if (!token) {
    return <Navigate to="/" replace />;
    }
  return children;
};

export default PrivateRoute;
