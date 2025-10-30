// client/src/index.js
// Add this line to import the router
import { BrowserRouter } from 'react-router-dom';

// Add this line to import your AuthProvider
// (Adjust the path if your AuthContext.js file is somewhere else)
import { AuthProvider } from './context/AuthContext';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// You can add a global CSS file here
// import './index.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ CORRECT: Router is OUTSIDE */}
      <AuthProvider> {/* ✅ CORRECT: AuthProvider is now INSIDE */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);