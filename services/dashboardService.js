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
// import api from '@/utils/axiosConfig';

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
//   },

//   // Update user status (admin only)
//   updateUserStatus: async (userId, status) => {
//     const response = await api.patch(`/admin/users/${userId}`, { status });
//     return response.data;
//   },

//   getMonthlyReports: async (year, month) => {
//     const response = await api.get('/admin/reports/monthly', {
//       params: { year, month }
//     });
//     return response.data;
//   },

//   // Get reports overview (for the reports tab)
//   getReportsOverview: async () => {
//     const response = await api.get('/admin/reports/overview');
//     return response.data;
//   },
  
// };



// import api from '@/utils/axiosConfig';

// export const dashboardService = {




  
//   // Get dashboard stats
//   getStats: async () => {
//     const response = await api.get('/dashboard/stats');
//     return response.data;
//   },

//   // Get admin stats
//   getAdminStats: async () => {
//     const response = await api.get('/dashboard/stats');
//     return response.data;
//   },

//   // Get all waitlist entries
//   getWaitlist: async (params = {}) => {
//     const response = await api.get('/admin/waitlist', { params });
//     return response.data;
//   },

//   // Update waitlist status
//   updateWaitlistStatus: async (waitlistId, status) => {
//     const response = await api.patch('/admin/waitlist', { 
//       id: waitlistId, 
//       status 
//     });
//     return response.data;
//   },

//   // Get monthly reports
//   getMonthlyReports: async (year, month) => {
//     const response = await api.get('/admin/reports/monthly', {
//       params: { year, month }
//     });
//     return response.data;
//   },

//   // Get reports overview
//   getReportsOverview: async () => {
//     const response = await api.get('/admin/reports/overview');
//     return response.data;
//   }
// };


import api from '@/utils/axiosConfig';

export const dashboardService = {
  // Get dashboard stats
  getStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },

  // Get admin stats
  getAdminStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },

  // Get all waitlist entries
  getWaitlist: async (params = {}) => {
    const response = await api.get('/admin/waitlist', { params });
    return response.data;
  },

  // Update waitlist status
  updateWaitlistStatus: async (waitlistId, status) => {
    const response = await api.patch('/admin/waitlist', { 
      id: waitlistId, 
      status 
    });
    return response.data;
  },

  // Get monthly reports
  getMonthlyReports: async (year, month) => {
    const response = await api.get('/admin/reports/monthly', {
      params: { year, month }
    });
    return response.data;
  },

  // Get reports overview
  getReportsOverview: async () => {
    const response = await api.get('/admin/reports/overview');
    return response.data;
  },

  // Announcement functions
  // Get announcements (admin=true for admin view, false for public view)
  getAnnouncements: async (isAdmin = false) => {
    const response = await api.get('/announcements', {
      params: { admin: isAdmin }
    });
    return response.data;
  },

  // Create announcement
  createAnnouncement: async (announcementData) => {
    const response = await api.post('/announcements', announcementData);
    return response.data;
  },

  // Update announcement
  updateAnnouncement: async (id, announcementData) => {
    const response = await api.put(`/announcements/${id}`, announcementData);
    return response.data;
  },

  // Delete announcement
  deleteAnnouncement: async (id) => {
    const response = await api.delete(`/announcements/${id}`);
    return response.data;
  }
};