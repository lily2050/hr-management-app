import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const employeeService = {
  getEmployees: async (params = {}) => {
    return await axios.get(`${API_URL}/employees`, { params });
  },

  getEmployeeById: async (id, token) => {
    return await axios.get(`${API_URL}/employees/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  createEmployee: async (employeeData, token) => {
    return await axios.post(`${API_URL}/employees`, employeeData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  updateEmployee: async (id, employeeData, token) => {
    return await axios.put(`${API_URL}/employees/${id}`, employeeData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  deleteEmployee: async (id, token) => {
    return await axios.delete(`${API_URL}/employees/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
};

export default employeeService;
