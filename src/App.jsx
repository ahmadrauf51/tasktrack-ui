import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import { Dashboard } from './pages/Dashboard';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';





// App Component with Routes
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        <Route path="/dashboard" element={
          <PrivateRoute><Dashboard /></PrivateRoute>} />
           <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;