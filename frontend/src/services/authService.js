import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const authService = {
  login: async (credentials) => {
    return await axios.post(`${API_URL}/auth/login`, credentials);
  },

  logout: async () => {
    return await axios.post(`${API_URL}/auth/logout`);
  },

  getCurrentUser: async (token) => {
    return await axios.get(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  register: async (userData) => {
    return await axios.post(`${API_URL}/auth/register`, userData);
  }
};

export default authService;
