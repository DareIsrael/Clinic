'use client';
import { useState } from 'react';

const WaitlistStatusDropdown = ({ waitlistEntry, onStatusChange }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus) => {
    if (newStatus === waitlistEntry.status) return;
    
    setIsUpdating(true);
    try {
      await onStatusChange(waitlistEntry._id, newStatus);
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Booked': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Accepted': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="relative">
      <select
        value={waitlistEntry.status || 'Active'}
        onChange={(e) => handleStatusChange(e.target.value)}
        disabled={isUpdating}
        className={`text-xs font-semibold rounded-full px-3 py-1 border focus:ring-2 focus:ring-sky-500 cursor-pointer transition-colors ${
          getStatusColor(waitlistEntry.status || 'Active')
        } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <option value="Active">Active</option>
        <option value="Booked">Booked</option>
        <option value="Accepted">Accepted</option>
        <option value="Rejected">Rejected</option>
        <option value="Called">Called</option>
        <option value="Left Voicemail">Left Voicemail</option>
        <option value="Not Reachable">Not Reachable</option>
      </select>
      {isUpdating && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-full">
          <div className="w-3 h-3 border border-sky-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default WaitlistStatusDropdown;