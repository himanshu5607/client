// client/src/pages/StudentDashboard.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api'; // Use the api helper

function StudentDashboard() {
  const { user, logout } = useAuth();
  const [tests, setTests] = useState([]);

  useEffect(() => {
    // Fetch tests assigned for today
    const fetchTests = async () => {
      try {
        const res = await api.get('/student/dashboard');
        setTests(res.data);
      } catch (err) {
        console.error('Error fetching dashboard', err);
      }
    };
    fetchTests();
  }, []);

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <button onClick={logout}>Logout</button>
      
      <h2>Your Tests for Today</h2>
      {tests.length === 0 ? (
        <p>No tests assigned for today.</p>
      ) : (
        <ul>
          {tests.map((test) => (
            <li key={test.AssignmentID}>
              {test.SubjectName} - 
              <Link to={`/test/${test.AssignmentID}`}>Start Test</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudentDashboard;
