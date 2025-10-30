// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ background: '#eee', padding: '10px', marginBottom: '20px' }}>
      <Link to="/" style={{ marginRight: '10px' }}>Home</Link>

      {/* --- Logged-in User Links --- */}
      {user && (
        <>
          {/* Role-based Dashboard Links */}
          {user.role === 'Admin' && <Link to="/admin" style={{ marginRight: '10px' }}>Admin Dashboard</Link>}
          {user.role === 'Teacher' && <Link to="/teacher" style={{ marginRight: '10px' }}>Teacher Dashboard</Link>}
          {user.role === 'Student' && <Link to="/dashboard" style={{ marginRight: '10px' }}>Dashboard</Link>}
          
          <button onClick={logout}>Logout</button>
        </>
      )}

      {/* --- Public Links --- */}
      {!user && (
        <>
          <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
          <Link to="/register" style={{ marginRight: '10px' }}>Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;