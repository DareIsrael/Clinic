// // services/dashboardService.js
// import api from '@/utils/axiosConfig'; // Make sure this path is correct

// export const dashboardService = {
//   // Get dashboard stats (works for both admin and regular users)
//   getStats: async () => {
//     const response = await api.get('/dashboard/stats');
//     return response.data;
//   },

//   // Get recent appointments
//   getRecentAppointments: async (limit = 5) => {
//     const response = await api.get('/dashboard/appointments', {
//       params: { limit }
//     });
//     return response.data;
//   },

//   // Get admin stats - use the same endpoint as getStats since your backend handles role-based data
//   getAdminStats: async () => {
//     const response = await api.get('/dashboard/stats');
//     return response.data;
//   },

//   // Get all users (admin only)
//   getUsers: async (params = {}) => {
//     const response = await api.get('/admin/users', { params });
//     return response.data;
//   },

//   // Get all appointments with pagination
//   getAllAppointments: async (params = {}) => {
//     const response = await api.get('/dashboard/appointments', { params });
//     return response.data;
//   }
// };



// services/dashboardService.js
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
  },

  // Get all appointments with pagination
  getAllAppointments: async (params = {}) => {
    const response = await api.get('/dashboard/appointments', { params });
    return response.data;
  },

  // Update user status (admin only)
  updateUserStatus: async (userId, status) => {
    const response = await api.patch(`/admin/users/${userId}`, { status });
    return response.data;
  },

  getMonthlyReports: async (year, month) => {
    const response = await api.get('/admin/reports/monthly', {
      params: { year, month }
    });
    return response.data;
  },

  // Get reports overview (for the reports tab)
  getReportsOverview: async () => {
    const response = await api.get('/admin/reports/overview');
    return response.data;
  }
};