// client/src/services/adminService.js
// (Delete your old code and use this)

import api from './api';

/**
 * Creates a new user (by an Admin).
 * Calls POST /api/auth/register
 */
export const registerUser = async (email, password, fullName, role) => {
  try {
    const res = await api.post('/auth/register', {
      email,
      password,
      fullName,
      role
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};