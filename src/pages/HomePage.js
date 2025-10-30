// src/pages/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function HomePage() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome to the Secure Online Test App</h1>
      <p>This is the main homepage.</p>
      
      {!user && (
        <div>
          <p>Please <Link to="/login">log in</Link> or <Link to="/register">register</Link> to continue.</p>
        </div>
      )}

      {user && (
        <div>
          <p>Hello, {user.email}.</p>
          {/* You can add links to their specific dashboards here */}
        </div>
      )}
    </div>
  );
}

export default HomePage;