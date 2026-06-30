'use client';
import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
import AppointmentDetailModal from './AppointmentDetailModal';
import AppointmentStatusDropdown from './AppointmentStatusDropdown';
import { Search, Calendar, RefreshCw, X, ChevronLeft, ChevronRight, User } from 'lucide-react';

export default function AppointmentsTab() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  const [counts, setCounts] = useState({
    upcoming: 0,
    today: 0,
    completed: 0,
    cancelled: 0,
    all: 0
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchStatus, setSearchStatus] = useState('all');
  const [searchDate, setSearchDate] = useState('');
  const [activeFilter, setSearchFilter] = useState('upcoming');

  const formatDateString = (dateString) => {
    if (!dateString) return '';
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isToday = (dateString) => {
    if (!dateString) return false;
    const today = new Date();
    const appointmentDate = new Date(dateString);
    return (
      appointmentDate.getFullYear() === today.getFullYear() &&
      appointmentDate.getMonth() === today.getMonth() &&
      appointmentDate.getDate() === today.getDate()
    );
  };

  const isPast = (dateString) => {
    if (!dateString) return false;
    const today = new Date();
    const appointmentDate = new Date(dateString);
    return appointmentDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const isFuture = (dateString) => {
    if (!dateString) return false;
    const today = new Date();
    const appointmentDate = new Date(dateString);
    return appointmentDate > new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const fetchAppointments = async (page = 1, limit = 10, search = '', status = 'all', date = '', filter = 'upcoming') => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('page', page);
      params.append('limit', limit);
      params.append('filter', filter);
      if (search) params.append('search', search);
      if (status !== 'all') params.append('status', status);
      if (date) params.append('date', date);

      const response = await fetch(`/api/appointments/admin?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        const processedAppointments = data.appointments?.map(app => ({
          ...app,
          displayDate: app.displayDate || formatDateString(app.appointmentDate),
          canadaDate: app.canadaDate || app.appointmentDate
        })) || [];
        setAppointments(processedAppointments);
        setPagination(data.pagination || { page, limit, total: 0, pages: 0 });
        if (data.counts) {
          setCounts(data.counts);
        }
      } else {
        setError(data.message || 'Failed to load appointments');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce((searchValue, statusValue, dateValue, filterValue) => {
      fetchAppointments(1, pagination.limit, searchValue, statusValue, dateValue, filterValue);
    }, 300),
    [pagination.limit]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value, searchStatus, searchDate, activeFilter);
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setSearchStatus(value);
    fetchAppointments(1, pagination.limit, searchQuery, value, searchDate, activeFilter);
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setSearchDate(value);
    fetchAppointments(1, pagination.limit, searchQuery, searchStatus, value, activeFilter);
  };

  const handleFilterChange = (filter) => {
    setSearchFilter(filter);
    setSearchStatus('all');
    setSearchDate('');
    fetchAppointments(1, pagination.limit, searchQuery, 'all', '', filter);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchStatus('all');
    setSearchDate('');
    setSearchFilter('upcoming');
    fetchAppointments(1, pagination.limit, '', 'all', '', 'upcoming');
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      fetchAppointments(newPage, pagination.limit, searchQuery, searchStatus, searchDate, activeFilter);
    }
  };

  const handleLimitChange = (newLimit) => {
    fetchAppointments(1, newLimit, searchQuery, searchStatus, searchDate, activeFilter);
  };

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      const response = await fetch('/api/appointments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appointmentId, status: newStatus }),
      });
      const data = await response.json();
      if (data.success) {
        setAppointments(prev =>
          prev.map(app => app._id === appointmentId ? { ...app, status: newStatus } : app)
        );
        if (selectedAppointment && selectedAppointment._id === appointmentId) {
          setSelectedAppointment(prev => ({ ...prev, status: newStatus }));
        }
        fetchAppointments(pagination.page, pagination.limit, searchQuery, searchStatus, searchDate, activeFilter);
        alert(`Appointment status updated to ${newStatus}.`);
      } else {
        alert(data.message || 'Failed to update appointment status');
      }
    } catch (error) {
      console.error(error);
      alert('Error updating appointment status');
    }
  };

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedAppointment(null);
    setIsModalOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-[#EFF6FF] text-[#1E40AF]';
      case 'confirmed': return 'bg-[#ECFDF5] text-[#065F46]';
      case 'completed': return 'bg-[#F5F3FF] text-[#5B21B6]';
      case 'cancelled': return 'bg-[#FEF2F2] text-[#991B1B]';
      case 'no_show': return 'bg-[#FFFBEB] text-[#92400E]';
      default: return 'bg-[#F8FAFC] text-[#64748B]';
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden space-y-6 p-6">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#F1F5F9]">
        <div>
          <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">Appointment Management</h2>
          <p className="text-xs text-[#64748B] mt-0.5 font-semibold">
            Showing {appointments.length > 0 ? (pagination.page - 1) * pagination.limit + 1 : 0} - {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} entries
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <select
            value={pagination.limit}
            onChange={(e) => handleLimitChange(parseInt(e.target.value))}
            className="px-3 py-1.5 border border-[#E2E8F0] rounded-xl text-xs text-[#334155] focus:outline-none bg-white cursor-pointer"
            disabled={loading}
          >
            <option value="5">5 rows</option>
            <option value="10">10 rows</option>
            <option value="20">20 rows</option>
            <option value="50">50 rows</option>
          </select>
          
          <button
            onClick={() => fetchAppointments(pagination.page, pagination.limit, searchQuery, searchStatus, searchDate, activeFilter)}
            disabled={loading}
            className="p-1.5 border border-[#E2E8F0] hover:bg-[#F8FAFC] rounded-xl transition disabled:opacity-50"
            title="Refresh list"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#64748B]" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 bg-[#F8FAFC] p-1.5 rounded-xl border border-[#E2E8F0]/80">
        {['upcoming', 'today', 'completed', 'cancelled', 'all'].map((filter) => {
          const label = filter.charAt(0).toUpperCase() + filter.slice(1).replace('_', ' ');
          const count = counts[filter] || 0;
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                isActive 
                  ? 'bg-sky-600 text-white shadow-xs' 
                  : 'text-[#64748B] hover:text-[#334155] hover:bg-white/60'
              }`}
            >
              {label} ({count})
            </button>
          );
        })}
      </div>

      {/* 🔍 PREMIUM ENHANCED SEARCH FILTERS 🔍 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by name, email, phone..."
            className="w-full pl-9 pr-8 py-2 bg-white border border-[#E2E8F0] rounded-xl text-xs text-[#334155] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] transition-all"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <select
          value={searchStatus}
          onChange={handleStatusChange}
          className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl text-xs text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] cursor-pointer"
        >
          <option value="all">All Statuses</option>
          <option value="scheduled">Scheduled</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="no_show">No Show</option>
        </select>

        <input
          type="date"
          value={searchDate}
          onChange={handleDateChange}
          className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl text-xs text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9]"
        />
      </div>

      {/* Table List View */}
      <div className="overflow-x-auto border border-[#E2E8F0] rounded-xl">
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#0EA5E9] border-t-transparent mx-auto"></div>
            <p className="mt-3 text-xs text-[#94A3B8]">Loading appointments…</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-16 text-xs text-[#94A3B8]">No appointments matching query found.</div>
        ) : (
          <table className="min-w-full divide-y divide-[#E2E8F0] text-xs">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="px-4 py-3 text-left font-bold text-[#475569] uppercase tracking-wider">No</th>
                <th className="px-4 py-3 text-left font-bold text-[#475569] uppercase tracking-wider">Patient Details</th>
                <th className="px-4 py-3 text-left font-bold text-[#475569] uppercase tracking-wider">Date & Time</th>
                <th className="px-4 py-3 text-left font-bold text-[#475569] uppercase tracking-wider">Status Badge</th>
                <th className="px-4 py-3 text-left font-bold text-[#475569] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#F1F5F9]">
              {appointments.map((appointment, index) => {
                const appointmentDate = appointment.canadaDate || appointment.appointmentDate;
                const isAppointmentToday = isToday(appointmentDate);
                const isAppointmentPast = isPast(appointmentDate);

                return (
                  <tr 
                    key={appointment._id} 
                    className={`hover:bg-[#F8FAFC]/50 transition-colors ${
                      isAppointmentToday ? 'bg-[#EFF6FF]/60' : ''
                    } ${isAppointmentPast && appointment.status === 'scheduled' ? 'bg-[#FEF2F2]/60' : ''}`}
                  >
                    <td className="px-4 py-4 text-[#64748B] font-bold cursor-pointer" onClick={() => openModal(appointment)}>
                      {(pagination.page - 1) * pagination.limit + index + 1}
                      {isAppointmentToday && (
                        <span className="block text-[8px] font-black text-blue-600 uppercase mt-0.5">Today</span>
                      )}
                    </td>
                    
                    <td className="px-4 py-4 cursor-pointer" onClick={() => openModal(appointment)}>
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#EFF6FF] border border-[#BFDBFE]/20 flex items-center justify-center text-xs font-bold text-[#1E3A8A] flex-shrink-0">
                          {appointment.firstName?.charAt(0) || 'P'}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-[#0F172A]">{appointment.firstName} {appointment.lastName}</div>
                          <div className="text-[10px] text-[#64748B] font-medium">{appointment.email}</div>
                          <div className="text-[10px] text-[#64748B] font-medium">{appointment.cellPhone}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 cursor-pointer" onClick={() => openModal(appointment)}>
                      <div className="font-bold text-[#334155]">{formatDateString(appointmentDate)}</div>
                      <div className="text-[10px] text-[#64748B] font-semibold mt-0.5">{appointment.appointmentTime}</div>
                    </td>

                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-bold ${getStatusColor(appointment.status)}`}>
                        {appointment.status.toUpperCase()}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <AppointmentStatusDropdown appointment={appointment} onStatusChange={handleStatusUpdate} />
                        <button
                          onClick={() => openModal(appointment)}
                          className="px-2.5 py-1 bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[10px] font-bold text-[#334155] rounded-lg transition"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Controls */}
      {!loading && pagination.pages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-[#F1F5F9] gap-4 text-xs text-[#64748B] font-medium">
          <div>
            Page <span className="text-[#0F172A] font-bold">{pagination.page}</span> of <span className="text-[#0F172A] font-bold">{pagination.pages}</span> · <span className="text-[#0F172A] font-bold">{pagination.total}</span> total entries
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="p-1.5 border border-[#E2E8F0] hover:bg-[#F8FAFC] rounded-lg transition disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: pagination.pages }, (_, idx) => {
              const p = idx + 1;
              const isCurrent = pagination.page === p;
              return (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold transition ${
                    isCurrent ? 'bg-sky-600 text-white shadow-xs' : 'border border-[#E2E8F0] hover:bg-[#F8FAFC]'
                  }`}
                >
                  {p}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.pages}
              className="p-1.5 border border-[#E2E8F0] hover:bg-[#F8FAFC] rounded-lg transition disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Detail Modal Component */}
      {isModalOpen && selectedAppointment && (
        <AppointmentDetailModal appointment={selectedAppointment} onClose={closeModal} onStatusChange={handleStatusUpdate} />
      )}
    </div>
  );
}