import api from '@/utils/axiosConfig';

export const appointmentService = {
  // Create new appointment
  createAppointment: async (appointmentData) => {
    const response = await api.post('/appointments', appointmentData);
    return response.data;
  },

  // Get user appointments
  getUserAppointments: async (params = {}) => {
    const response = await api.get('/appointments', { params });
    return response.data;
  },

  // Get all appointments (admin only) - FIXED: Use correct endpoint
  getAllAppointments: async (params = {}) => {
    const response = await api.get('/dashboard/appointments', { params });
    return response.data;
  },

  // Cancel appointment
  cancelAppointment: async (appointmentId) => {
    const response = await api.delete(`/appointments/${appointmentId}`);
    return response.data;
  },

  // Update appointment status (admin only)
  updateAppointmentStatus: async (appointmentId, status) => {
    const response = await api.put(`/appointments/${appointmentId}`, { status });
    return response.data;
  }
};