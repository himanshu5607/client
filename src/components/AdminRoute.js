// src/components/AdminRoute.js

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
  const { user } = useAuth(); // Get the user from your AuthContext

  // Check 1: Is the user logged in?
  if (!user) {
    // If not logged in, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // Check 2: Is the user an Admin?
  if (user.role !== 'Admin') {
    // If logged in but NOT an Admin, redirect to the homepage
    // (or you could create a specific "Unauthorized" page)
    return <Navigate to="/" replace />;
  }

  // If logged in AND an Admin, render the child component
  return <Outlet />;
};

export default AdminRoute;