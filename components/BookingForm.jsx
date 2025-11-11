'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { appointmentService } from '@/services/appointmentService';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    serviceType: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  const serviceOptions = [
    { value: 'Dental Care', label: 'Dental Care' },
    { value: 'Eye Care', label: 'Eye Care' },
    { value: 'General Checkup', label: 'General Checkup' },
    { value: 'Cardiology', label: 'Cardiology' },
    { value: 'Dermatology', label: 'Dermatology' },
    { value: 'Pediatrics', label: 'Pediatrics' }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await appointmentService.createAppointment(formData);

      if (response.success) {
        setMessage('Appointment booked successfully!');
        setFormData({
          serviceType: '',
          preferredDate: '',
          preferredTime: '',
          message: ''
        });
        
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        setMessage(response.message || 'Failed to book appointment');
      }
    } catch (error) {
      console.error('Booking error:', error);
      setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Book an Appointment</h1>
        <p className="text-gray-600 mt-2">Schedule your visit with our healthcare professionals</p>
      </div>

      {message && (
        <div className={`p-4 mb-6 rounded-lg ${
          message.includes('successfully') 
            ? 'bg-green-100 text-green-700 border border-green-200' 
            : 'bg-red-100 text-red-700 border border-red-200'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Service Type */}
        <div>
          <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
            Service Type *
          </label>
          <select
            id="serviceType"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            required
            className="w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-700 duration-300"
          >
            <option value="">Select a service</option>
            {serviceOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Date *
            </label>
            <input
              type="date"
              id="preferredDate"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              min={today}
              required
              className="w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 transition duration-300"
            />
          </div>

          <div>
            <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Time *
            </label>
            <select
              id="preferredTime"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              required
              className="w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 transition duration-300"
            >
              <option value="">Select a time</option>
              {timeSlots.map(time => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 focus:border-blue-500 transition duration-300"
            placeholder="Any specific concerns or notes for the doctor..."
          />
        </div>

        {/* Patient Information Summary */}
        <div className="bg-blue-50 p-4 rounded-lg border  border-blue-200">
          <h3 className="font-medium text-blue-900 mb-2">Patient Information</h3>
          <p className="text-sm text-blue-700">
            <strong>Name:</strong> {user?.firstName} {user?.lastName}
          </p>
          <p className="text-sm text-blue-700">
            <strong>Email:</strong> {user?.email}
          </p>
          <p className="text-sm text-blue-700">
            <strong>Phone:</strong> {user?.cellPhone}
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition duration-300 transform hover:scale-105 font-medium"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Booking Appointment...
            </span>
          ) : (
            'Book Appointment'
          )}
        </button>
      </form>

      {/* Help Text */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Need help? Contact us at <a href="tel:5551234567" className="text-blue-600 hover:text-blue-700">(555) 123-4567</a></p>
        <p className="mt-1">Our team is available Monday - Friday, 8:00 AM - 8:00 PM</p>
      </div>
    </div>
  );
}