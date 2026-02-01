'use client';
import { useState } from 'react';

const AppointmentStatusDropdown = ({ appointment, onStatusChange }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus) => {
    if (newStatus === appointment.status) return;
    
    setIsUpdating(true);
    try {
      await onStatusChange(appointment._id, newStatus);
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'no_show': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="relative">
      <select
        value={appointment.status || 'scheduled'}
        onChange={(e) => handleStatusChange(e.target.value)}
        disabled={isUpdating}
        className={`text-xs font-semibold rounded-lg px-3 py-1.5 border focus:ring-2 focus:ring-sky-500 cursor-pointer transition-colors ${
          getStatusColor(appointment.status || 'scheduled')
        } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <option value="scheduled">Scheduled</option>
        <option value="confirmed">Confirmed</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
        <option value="no_show">No Show</option>
      </select>
      {isUpdating && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
          <div className="w-3 h-3 border border-sky-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default AppointmentStatusDropdown;