import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const leaveService = {
  getLeaveRequests: async (params = {}, token) => {
    return await axios.get(`${API_URL}/leaves`, { 
      params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  createLeaveRequest: async (leaveData, token) => {
    return await axios.post(`${API_URL}/leaves`, leaveData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  approveLeaveRequest: async (id, approvalData, token) => {
    return await axios.put(`${API_URL}/leaves/${id}/approve`, approvalData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  rejectLeaveRequest: async (id, rejectionData, token) => {
    return await axios.put(`${API_URL}/leaves/${id}/reject`, rejectionData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  getLeaveTypes: async (token) => {
    return await axios.get(`${API_URL}/leave-types`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
};

export default leaveService;
