// client/src/pages/AdminDashboard.js

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../services/adminService'; // We will create this

function AdminDashboard() {
  const { user, logout } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState(''); // Use fullName
  const [role, setRole] = useState('Teacher');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    // ...
    try {
      // Pass all fields
      const res = await registerUser(email, password, fullName, role);
      setMessage(res.message);
      setEmail('');
      setPassword('');
      setFullName('');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user?.email} (Admin)</p> {/* Use user.email */}
      <button onClick={logout}>Logout</button>
      <hr />
      <h3>Create New User</h3>
      <form onSubmit={handleRegister}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Teacher">Teacher</option>
            <option value="User">Student</option> {/* Your role is 'User' */}
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button type="submit">Create User</button>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default AdminDashboard;