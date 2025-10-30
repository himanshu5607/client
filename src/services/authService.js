// client/src/services/authService.js
// (Delete your old code and use this)

import api from './api';

/**
 * Logs a user in.
 * Calls POST /api/auth/login
 */
export const login = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  return res.data; // { token, user }
};

/**
 * Registers a new user (public signup).
 * Calls POST /api/auth/signup
 */
export const signup = async (email, password, fullName) => {
  const res = await api.post('/auth/signup', {
    email,
    password,
    fullName
  });
  return res.data;
};