import api from '@/utils/axiosConfig';

export const waitlistService = {
  // Get waitlist with pagination
  getWaitlist: async (params = {}) => {
    const response = await api.get('/admin/waitlist', { params });
    return response.data;
  },

  // Update waitlist status
  updateWaitlistStatus: async (waitlistId, status) => {
    const response = await api.patch('/admin/waitlist', { id: waitlistId, status });
    return response.data;
  },

  // Get waitlist reports
  getMonthlyReports: async (year, month) => {
    const response = await api.get('/admin/waitlist/reports/monthly', {
      params: { year, month }
    });
    return response.data;
  },

  // Get waitlist overview
  getReportsOverview: async () => {
    const response = await api.get('/admin/waitlist/reports/overview');
    return response.data;
  }
};