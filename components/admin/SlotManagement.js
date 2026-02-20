'use client';
import { useState, useEffect } from 'react';

export default function SlotManagement() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [times, setTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [viewDate, setViewDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [viewLoading, setViewLoading] = useState(false);
  const [allSlots, setAllSlots] = useState([]);
  const [allSlotsLoading, setAllSlotsLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });

  // Common time slots
  const commonTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  // SIMPLE: Get today's date as YYYY-MM-DD
  const getTodayDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // SIMPLE: Get future date as YYYY-MM-DD
  const getFutureDate = (daysToAdd) => {
    const future = new Date();
    future.setDate(future.getDate() + daysToAdd);
    const year = future.getFullYear();
    const month = String(future.getMonth() + 1).padStart(2, '0');
    const day = String(future.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // SIMPLE: Format date for display
  const formatDisplayDate = (dateString) => {
    if (!dateString) return '';
    
    // If it's a YYYY-MM-DD string, format it nicely
    if (typeof dateString === 'string' && dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateString.split('-');
      const dateObj = new Date(year, month - 1, day);
      
      const options = { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      };
      return dateObj.toLocaleDateString('en-US', options);
    }
    
    return dateString;
  };

  // Today's date for min attribute
  const todayDate = getTodayDate();

  // Load all slots on component mount
  useEffect(() => {
    fetchAllSlots();
  }, []);

  const fetchAllSlots = async () => {
    try {
      setAllSlotsLoading(true);
      
      // Set default date range (today to 30 days from now)
      const today = getTodayDate();
      const futureDate = getFutureDate(30);
      
      setDateRange({
        start: today,
        end: futureDate
      });
      
      // console.log('Fetching slots for date range:', { today, futureDate });
      const response = await fetch(`/api/slots/admin?startDate=${today}&endDate=${futureDate}`);
      const data = await response.json();
      
      if (data.success) {
        // console.log('Received slots:', data.slots?.length || 0);
        setAllSlots(data.slots || []);
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to load slots' });
      }
    } catch (error) {
      console.error('Error loading slots:', error);
      setMessage({ type: 'error', text: 'Failed to load slots' });
    } finally {
      setAllSlotsLoading(false);
    }
  };


  // ADD THIS MISSING FUNCTION
  const fetchSlotsByDateRange = async () => {
    if (!dateRange.start || !dateRange.end) {
      setMessage({ type: 'error', text: 'Please select both start and end dates' });
      return;
    }

    try {
      setAllSlotsLoading(true);
      // console.log('Fetching slots for custom range:', dateRange);
      
      const response = await fetch(`/api/slots/admin?startDate=${dateRange.start}&endDate=${dateRange.end}`);
      const data = await response.json();
      
      if (data.success) {
        setAllSlots(data.slots || []);
        setMessage({ type: 'success', text: `Loaded ${data.slots?.length || 0} slots` });
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to load slots' });
      }
    } catch (error) {
      console.error('Error loading slots:', error);
      setMessage({ type: 'error', text: 'Failed to load slots' });
    } finally {
      setAllSlotsLoading(false);
    }
  };

  const addTime = () => {
    if (time && !times.includes(time)) {
      setTimes([...times, time]);
      setTime('');
    }
  };

  const removeTime = (timeToRemove) => {
    setTimes(times.filter(t => t !== timeToRemove));
  };

  const addCommonTime = (commonTime) => {
    if (!times.includes(commonTime)) {
      setTimes([...times, commonTime]);
    }
  };

  const clearAllTimes = () => {
    setTimes([]);
  };

  const submitSlots = async () => {
    if (!date || times.length === 0) {
      setMessage({ type: 'error', text: 'Please select a date and add at least one time slot' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // console.log('Submitting slots for Canada date:', date, 'times:', times);
      
      const response = await fetch('/api/appointments/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          date: date,
          times 
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: `Successfully added ${data.count} slot(s) for ${formatDisplayDate(date)}` });
        setTimes([]);
        setDate('');
        // Refresh all slots
        await fetchAllSlots();
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch (error) {
      console.error('Error adding slots:', error);
      setMessage({ type: 'error', text: 'Failed to add slots' });
    } finally {
      setLoading(false);
    }
  };

  const viewSlots = async () => {
    if (!viewDate) {
      setMessage({ type: 'error', text: 'Please select a date to view slots' });
      return;
    }

    setViewLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // console.log('Viewing slots for date:', viewDate);
      const response = await fetch(`/api/appointments?date=${viewDate}`);
      const data = await response.json();

      if (data.success) {
        setAvailableSlots(data.slots || []);
      } else {
        setAvailableSlots([]);
        setMessage({ type: 'error', text: data.message });
      }
    } catch (error) {
      console.error('Error loading slots:', error);
      setAvailableSlots([]);
      setMessage({ type: 'error', text: 'Failed to load slots' });
    } finally {
      setViewLoading(false);
    }
  };

  const toggleSlotAvailability = async (slotId, currentAvailability) => {
    try {
      const response = await fetch('/api/appointments/admin', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          slotId, 
          isAvailable: !currentAvailability 
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Update local state
        setAvailableSlots(prev =>
          prev.map(slot =>
            slot._id === slotId
              ? { ...slot, isAvailable: !currentAvailability }
              : slot
          )
        );
        // Also update all slots
        setAllSlots(prev =>
          prev.map(slot =>
            slot._id === slotId
              ? { ...slot, isAvailable: !currentAvailability }
              : slot
          )
        );
        setMessage({ type: 'success', text: 'Slot availability updated' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to update slot' });
      }
    } catch (error) {
      console.error('Error toggling slot:', error);
      setMessage({ type: 'error', text: 'Failed to update slot' });
    }
  };

  const deleteSlot = async (slotId) => {
    if (!confirm('Are you sure you want to delete this slot? This cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/slots/admin?slotId=${slotId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        // Remove from local state
        setAllSlots(prev => prev.filter(slot => slot._id !== slotId));
        setAvailableSlots(prev => prev.filter(slot => slot._id !== slotId));
        setMessage({ type: 'success', text: 'Slot deleted successfully' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to delete slot' });
      }
    } catch (error) {
      console.error('Error deleting slot:', error);
      setMessage({ type: 'error', text: 'Failed to delete slot' });
    }
  };

  const deleteAllSlotsForDate = async (date) => {
    if (!confirm(`Are you sure you want to delete ALL slots for ${formatDisplayDate(date)}? This cannot be undone.`)) {
      return;
    }

    try {
      // console.log('Deleting slots for Canada date:', date);
      const response = await fetch(`/api/slots/admin?date=${date}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        // Remove from local state using canadaDate or date property
        setAllSlots(prev => prev.filter(slot => {
          const slotDate = slot.canadaDate || slot.date;
          return slotDate !== date;
        }));
        setMessage({ type: 'success', text: `Deleted all slots for ${formatDisplayDate(date)}` });
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to delete slots' });
      }
    } catch (error) {
      console.error('Error deleting slots:', error);
      setMessage({ type: 'error', text: 'Failed to delete slots' });
    }
  };

  // Group slots by date - FIXED
  const groupedSlots = allSlots.reduce((groups, slot) => {
    // Use canadaDate from API response
    const dateKey = slot.canadaDate || slot.date;
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(slot);
    return groups;
  }, {});

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Manage Available Slots</h2>

      {/* SIMPLE: Remove timezone complexity */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
        {/* <p className="text-sm text-blue-700">
          <strong>Note:</strong> All dates and times are stored and displayed exactly as entered.
        </p> */}
        <p className="text-xs text-blue-600 mt-1">
          Today is: {formatDisplayDate(todayDate)} ({todayDate})
        </p>
      </div>

      {/* Message Display */}
      {message.text && (
        <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add New Slots */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Slots</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date *
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={todayDate}
                className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Selected date: {date ? formatDisplayDate(date) : 'Not selected'} ({date})
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Time Slot *
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
                <button
                  onClick={addTime}
                  className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
                >
                  Add
                </button>
              </div>

              {/* Common Times */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Quick Add Common Times:</p>
                <div className="flex flex-wrap gap-2">
                  {commonTimes.map(commonTime => (
                    <button
                      key={commonTime}
                      onClick={() => addCommonTime(commonTime)}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                      {commonTime}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Times */}
            {times.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Selected Times ({times.length})</span>
                  <button
                    onClick={clearAllTimes}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  {times.sort().map(t => (
                    <div
                      key={t}
                      className="flex items-center gap-2 px-3 py-1 bg-white rounded border border-gray-300"
                    >
                      <span className="text-gray-700">{t}</span>
                      <button
                        onClick={() => removeTime(t)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={submitSlots}
              disabled={loading || !date || times.length === 0}
              className="w-full px-4 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? 'Adding Slots...' : `Add ${times.length} Slot${times.length !== 1 ? 's' : ''} `}
            </button>
          </div>
        </div>

        {/* View & Manage Slots for Specific Date */}
       
      </div>

      {/* All Created Slots Dashboard */}
      <div className="mt-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">All Created Slots</h3>
            <p className="text-sm text-gray-600">View and manage all available time slots</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="flex gap-2">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                min={todayDate}
                className="px-3 py-2 border border-gray-300 text-gray-900 rounded text-sm"
                placeholder="Start Date"
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                min={dateRange.start || todayDate}
                className="px-3 py-2 border border-gray-300 text-gray-900 rounded text-sm"
                placeholder="End Date"
              />
            </div>
            <button
              onClick={fetchSlotsByDateRange}
              disabled={allSlotsLoading || !dateRange.start || !dateRange.end}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50 text-sm"
            >
              {allSlotsLoading ? 'Loading...' : 'Filter'}
            </button>
            <button
              onClick={fetchAllSlots}
              disabled={allSlotsLoading}
              className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 disabled:opacity-50 text-sm"
            >
              Refresh All
            </button>
          </div>
        </div>

        {allSlotsLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
            <p className="mt-2 text-gray-600">Loading all slots...</p>
          </div>
        ) : Object.keys(groupedSlots).length > 0 ? (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  {Object.keys(groupedSlots).length} date(s) • {allSlots.length} total slots
                </span>
                <span className="text-sm text-gray-600">
                  {allSlots.filter(slot => slot.isAvailable).length} available • {allSlots.filter(slot => !slot.isAvailable).length} booked
                </span>
              </div>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {Object.entries(groupedSlots)
                .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
                .map(([date, slots]) => (
                  <div key={date} className="border-b border-gray-100 last:border-b-0">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium text-gray-900">{formatDisplayDate(date)}</span>
                          <span className="ml-3 text-sm text-gray-600">
                            {slots.length} slot{slots.length !== 1 ? 's' : ''} • 
                            <span className="ml-1">
                              {slots.filter(s => s.isAvailable).length} available, {slots.filter(s => !s.isAvailable).length} booked
                            </span>
                          </span>
                        </div>
                        <button
                          onClick={() => deleteAllSlotsForDate(date)}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          Delete All
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {slots
                          .sort((a, b) => a.time.localeCompare(b.time))
                          .map(slot => (
                            <div
                              key={slot._id}
                              className="flex items-center gap-2 px-3 py-2 bg-white rounded border border-gray-300 hover:border-gray-400"
                            >
                              <span className="font-medium text-gray-900">{slot.time}</span>
                              <span className={`px-2 py-1 text-xs rounded-full ${slot.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {slot.isAvailable ? 'Available' : 'Booked'}
                              </span>
                              {slot.bookedBy && (
                                <span className="text-xs text-gray-500">
                                  ({slot.bookedBy?.firstName || 'Booked'})
                                </span>
                              )}
                              <div className="flex gap-1">
                                <button
                                  onClick={() => toggleSlotAvailability(slot._id, slot.isAvailable)}
                                  className={`px-2 py-1 text-xs rounded ${slot.isAvailable ? 'bg-red-50 text-red-700 hover:bg-red-100' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}
                                >
                                  {slot.isAvailable ? 'Make Unavailable' : 'Make Available'}
                                </button>
                                <button
                                  onClick={() => deleteSlot(slot._id)}
                                  className="px-2 py-1 text-xs bg-red-50 text-red-700 rounded hover:bg-red-100"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 border border-gray-200 rounded-lg">
            No slots created yet. Add slots using the form above.
          </div>
        )}
      </div>

      {/* Information Panel */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h4 className="font-medium text-blue-900 mb-2">How it works:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          
          <li>• Add available time slots for specific dates</li>
          <li>• Patients can only book from available slots</li>
          <li>• Once a slot is booked, it becomes unavailable to others</li>
          <li>• You can manually mark slots as available/unavailable</li>
          <li>• Delete individual slots or all slots for a specific date</li>
          <li>• View all created slots in the dashboard above</li>
        </ul>
      </div>
    </div>
  );
}