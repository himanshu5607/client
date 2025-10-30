// src/pages/DashboardPage.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api'; // Your axios instance

function DashboardPage() {
  const { user, logout } = useAuth(); // Get user info and logout function
  const [tests, setTests] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch tests assigned for today
    const fetchTests = async () => {
      try {
        // This calls GET /api/student/dashboard
        const res = await api.get('/student/dashboard');
        setTests(res.data);
      } catch (err) {
        console.error('Error fetching dashboard', err);
        setError('Could not load tests.');
      }
    };
    fetchTests();
  }, []);

  return (
    <div>
      {/* Use fullName from the JWT payload */}
      <h1>Welcome, {user?.fullName}</h1>
      <button onClick={logout}>Logout</button>
      
      <hr />

      <h2>Your Tests for Today</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {tests.length === 0 && !error ? (
        <p>No tests assigned for today.</p>
      ) : (
        <ul>
          {tests.map((test) => (
            <li key={test.AssignmentID}>
              {test.SubjectName} - 
              {/* This links to the TestInterface component */}
              <Link to={`/test/${test.AssignmentID}`}>Start Test</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Use a default export to match your App.js import
export default DashboardPage;