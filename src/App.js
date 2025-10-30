// src/App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// --- Import Navbar ---
import Navbar from './components/Navbar'; 

// --- Page Imports ---
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage'; // Student Dashboard
import TestInterface from './pages/TestInterface';
import TestResult from './pages/TestResult';
import TeacherDashboard from './pages/TeacherDashboard'; // Import Teacher Dashboard
import AdminDashboard from './pages/AdminDashboard';

// --- Component Imports ---
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <div>
      {/* 1. Add the Navbar here, outside of <Routes> */}
      <Navbar /> 
      
      {/* 2. All your page routes */}
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* --- Protected Routes (Student/Teacher) --- */}
        <Route element={<PrivateRoute />}>
          {/* Student Routes */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/test/:assignmentId" element={<TestInterface />} />
          <Route path="/test/result" element={<TestResult />} />
          
          {/* Teacher Route */}
          <Route path="/teacher" element={<TeacherDashboard />} /> 
        </Route>

        {/* --- Admin Routes --- */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;