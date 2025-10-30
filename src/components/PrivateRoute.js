// src/components/ProtectedRoute.js

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
  const { user } = useAuth(); // Get the user from your AuthContext

  if (!user) {
    // If there is no user, redirect to the /login page
    return <Navigate to="/login" replace />;
  }

  // If there is a user, render the child component (e.g., Dashboard)
  return <Outlet />;
};

export default PrivateRoute;