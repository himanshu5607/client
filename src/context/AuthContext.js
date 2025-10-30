// client/src/context/AuthContext.js

import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // We'll create this
import { login as loginService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const { token, user: userData } = await loginService(email, password);
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      api.defaults.headers.common['x-auth-token'] = token;
      
      setUser(userData);

      // Redirect based on role
      if (userData.role === 'Admin') navigate('/admin');
      else if (userData.role === 'Teacher') navigate('/teacher');
      else if (userData.role === 'User') navigate('/dashboard');
      
    } catch (err) {
      console.error('Login failed', err);
      throw err; // Let the Login component handle the error display
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['x-auth-token'];
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};