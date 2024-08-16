// src/pages/NotFound.js

import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;
