import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const permissionService = {
  getPermissions: async (params = {}, token) => {
    return await axios.get(`${API_URL}/permissions`, { 
      params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  createPermission: async (permissionData, token) => {
    return await axios.post(`${API_URL}/permissions`, permissionData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  approvePermission: async (id, approvalData, token) => {
    return await axios.put(`${API_URL}/permissions/${id}/approve`, approvalData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  rejectPermission: async (id, rejectionData, token) => {
    return await axios.put(`${API_URL}/permissions/${id}/reject`, rejectionData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  getPermissionTypes: async (token) => {
    return await axios.get(`${API_URL}/permission-types`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
};

export default permissionService;
