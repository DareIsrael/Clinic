import api from '@/utils/axiosConfig';

export const dashboardService = {
  // Get dashboard stats (works for both admin and regular users)
  getStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },

  // Get recent appointments
  getRecentAppointments: async (limit = 5) => {
    const response = await api.get('/dashboard/appointments', {
      params: { limit }
    });
    return response.data;
  },

  // Get admin stats - use the same endpoint as getStats since your backend handles role-based data
  getAdminStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },

  // Get all users (admin only)
  getUsers: async (params = {}) => {
    const response = await api.get('/admin/users', { params });
    return response.data;
  }
};