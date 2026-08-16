'use client';
import { useState, useEffect } from 'react';
import { Clock, Calendar, Plus, Trash2, CheckCircle2, XCircle, Filter, RefreshCw, Info } from 'lucide-react';

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

  const todayDate = getTodayDate();

  useEffect(() => {
    fetchAllSlots();
  }, []);

  const fetchAllSlots = async () => {
    try {
      setAllSlotsLoading(true);
      const today = getTodayDate();
      const futureDate = getFutureDate(30);
      
      setDateRange({
        start: today,
        end: futureDate
      });
      
      const response = await fetch(`/api/slots/admin?startDate=${today}&endDate=${futureDate}`);
      const data = await response.json();
      
      if (data.success) {
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

  const fetchSlotsByDateRange = async () => {
    if (!dateRange.start || !dateRange.end) {
      setMessage({ type: 'error', text: 'Please select both start and end dates' });
      return;
    }

    try {
      setAllSlotsLoading(true);
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
        setAvailableSlots(prev =>
          prev.map(slot =>
            slot._id === slotId
              ? { ...slot, isAvailable: !currentAvailability }
              : slot
          )
        );
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
      const response = await fetch(`/api/slots/admin?date=${date}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
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

  const groupedSlots = allSlots.reduce((groups, slot) => {
    const dateKey = slot.canadaDate || slot.date;
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(slot);
    return groups;
  }, {});

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-sky-50 rounded-xl flex items-center justify-center">
            <Clock className="w-5 h-5 text-sky-600" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">Schedule Slot Management</h2>
            <p className="text-xs text-[#64748B] mt-0.5 font-semibold">Today: {formatDisplayDate(todayDate)}</p>
          </div>
        </div>
      </div>

      {/* Message alerts */}
      {message.text && (
        <div className={`p-3.5 rounded-xl text-xs font-bold border ${
          message.type === 'success' 
            ? 'bg-emerald-50 text-emerald-800 border-emerald-100' 
            : 'bg-rose-50 text-rose-800 border-rose-100'
        }`}>
          {message.text}
        </div>
      )}

      {/* Forms layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left add section */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 space-y-4">
            <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Create Available Slots</h3>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#475569] mb-1.5 uppercase">Select Date *</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={todayDate}
                  className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl text-xs text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#475569] mb-1.5 uppercase">Add Custom Time *</label>
                <div className="flex gap-2">
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="flex-1 px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl text-xs text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20"
                  />
                  <button
                    onClick={addTime}
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </div>

              {/* Common presets */}
              <div>
                <p className="text-[10px] font-bold text-[#64748B] mb-2 uppercase tracking-wide">Quick Preset Hours</p>
                <div className="flex flex-wrap gap-1.5">
                  {commonTimes.map(commonTime => (
                    <button
                      key={commonTime}
                      onClick={() => addCommonTime(commonTime)}
                      className="px-2 py-1 text-[10px] font-bold bg-white border border-[#E2E8F0] text-[#334155] rounded-lg hover:bg-sky-50 hover:border-sky-300 transition"
                    >
                      {commonTime}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected presets feedback list */}
              {times.length > 0 && (
                <div className="pt-3 border-t border-[#E2E8F0] space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-[#334155]">Selected Times ({times.length})</span>
                    <button onClick={clearAllTimes} className="text-rose-600 hover:underline">Clear All</button>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 p-2 bg-white border border-[#E2E8F0] rounded-xl">
                    {times.sort().map(t => (
                      <div key={t} className="flex items-center gap-1.5 px-2 py-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[10px] font-semibold text-[#334155]">
                        <span>{t}</span>
                        <button onClick={() => removeTime(t)} className="text-rose-500 hover:text-rose-700 font-bold">×</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={submitSlots}
                disabled={loading || !date || times.length === 0}
                className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-sm"
              >
                {loading ? 'Submitting...' : `Create ${times.length} Slots`}
              </button>
            </div>
          </div>
        </div>

        {/* Right list dashboard section */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-[#F1F5F9]">
            <div>
              <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">All Created Slots</h3>
              <p className="text-[10px] text-[#64748B] font-semibold mt-0.5">Filter slots by specific date boundaries</p>
            </div>
          </div>

          {/* Date range filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-[#F8FAFC] p-3 border border-[#E2E8F0] rounded-xl">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              min={todayDate}
              className="px-2.5 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#334155] focus:outline-none"
            />
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              min={dateRange.start || todayDate}
              className="px-2.5 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#334155] focus:outline-none"
            />
            <div className="flex gap-1.5">
              <button
                onClick={fetchSlotsByDateRange}
                disabled={allSlotsLoading || !dateRange.start || !dateRange.end}
                className="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg text-xs transition disabled:opacity-50 py-1.5"
              >
                Filter
              </button>
              <button
                onClick={fetchAllSlots}
                disabled={allSlotsLoading}
                className="p-1.5 bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#64748B] rounded-lg transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Slots list */}
          {allSlotsLoading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#0EA5E9] border-t-transparent mx-auto"></div>
              <p className="mt-3 text-xs text-[#94A3B8]">Loading slots...</p>
            </div>
          ) : Object.keys(groupedSlots).length > 0 ? (
            <div className="border border-[#E2E8F0] rounded-xl overflow-hidden max-h-[380px] overflow-y-auto divide-y divide-[#E2E8F0]">
              {Object.entries(groupedSlots)
                .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
                .map(([date, slots]) => (
                  <div key={date} className="bg-white">
                    <div className="bg-[#F8FAFC] px-4 py-2.5 flex justify-between items-center border-b border-[#E2E8F0]">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-sky-600" />
                        <span className="font-bold text-xs text-[#0F172A]">{formatDisplayDate(date)}</span>
                        <span className="text-[10px] font-semibold text-[#64748B] ml-1">
                          ({slots.length} slots · {slots.filter(s => s.isAvailable).length} open)
                        </span>
                      </div>
                      <button
                        onClick={() => deleteAllSlotsForDate(date)}
                        className="text-[10px] font-bold text-rose-600 hover:underline flex items-center gap-0.5"
                      >
                        <Trash2 className="w-3 h-3" /> Delete Day
                      </button>
                    </div>

                    <div className="p-3.5 space-y-2">
                      {slots
                        .sort((a, b) => a.time.localeCompare(b.time))
                        .map(slot => (
                          <div
                            key={slot._id}
                            className="flex items-center justify-between p-2 bg-[#F8FAFC]/50 hover:bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg transition"
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-xs text-[#334155]">{slot.time}</span>
                              <span className={`px-2 py-0.5 text-[9px] font-bold rounded-lg ${
                                slot.isAvailable ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                              }`}>
                                {slot.isAvailable ? 'Open' : 'Booked'}
                              </span>
                              {slot.bookedBy && (
                                <span className="text-[10px] text-gray-500 font-semibold">
                                  by {slot.bookedBy?.firstName}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => toggleSlotAvailability(slot._id, slot.isAvailable)}
                                className={`px-2 py-1 text-[10px] font-bold rounded-lg transition ${
                                  slot.isAvailable 
                                    ? 'bg-rose-50 text-rose-700 hover:bg-rose-100/80' 
                                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100/80'
                                }`}
                              >
                                {slot.isAvailable ? 'Block' : 'Unblock'}
                              </button>
                              <button
                                onClick={() => deleteSlot(slot._id)}
                                className="p-1 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-12 text-xs text-[#94A3B8] border border-[#E2E8F0] rounded-xl">
              No slots configured. Create slots using the left panel.
            </div>
          )}
        </div>

      </div>

      {/* Guide box */}
      <div className="bg-[#EFF6FF] border border-[#BFDBFE]/20 rounded-xl p-4 flex gap-3 text-xs text-[#1E40AF]">
        <Info className="w-4 h-4 text-[#1D4ED8] flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-[#1E3A8A]">Administrator Guide:</p>
          <p className="font-medium text-[#1E40AF]">
            Adding slots allows public patients to book them instantly. You can block slot availability manually at any time to reserve them for priority walkthrough patients.
          </p>
        </div>
      </div>
    </div>
  );
}