'use client';
import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
import AppointmentDetailModal from './AppointmentDetailModal';
import AppointmentStatusDropdown from './AppointmentStatusDropdown';
import { useAuth } from '@/hooks/useAuth';
import { exportAppointmentsToExcel } from '@/utils/excelExport';
import { Search, Calendar, RefreshCw, X, ChevronLeft, ChevronRight, User, Download } from 'lucide-react';

export default function AppointmentsTab({ theme }) {
  const isDark = theme === 'dark';
  const { user } = useAuth();
  const isDoctor = user?.role === 'doctor';
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
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
    if (!dateString) return 'N/A';
    try {
      if (dateString.includes('T')) {
        const [datePart] = dateString.split('T');
        const [year, month, day] = datePart.split('-');
        return `${month}/${day}/${year}`;
      }
      if (dateString.includes('-')) {
        const [year, month, day] = dateString.split('-');
        return `${month}/${day}/${year}`;
      }
      return dateString;
    } catch (e) {
      return dateString;
    }
  };

  const isToday = (dateString) => {
    if (!dateString) return false;
    try {
      const today = new Date();
      const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      return dateString.startsWith(todayStr);
    } catch (e) {
      return false;
    }
  };

  const isPast = (dateString) => {
    if (!dateString) return false;
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const apptDate = new Date(dateString);
      apptDate.setHours(0, 0, 0, 0);
      return apptDate < today;
    } catch (e) {
      return false;
    }
  };

  const fetchAppointments = async (
    page = 1, 
    limit = 10, 
    search = searchQuery, 
    status = searchStatus, 
    date = searchDate,
    filter = activeFilter
  ) => {
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
        const processedAppointments = (data.appointments || []).map(app => ({
          ...app,
          displayDate: app.displayDate || formatDateString(app.appointmentDate),
          canadaDate: app.canadaDate || app.appointmentDate
        }));

        setAppointments(processedAppointments);
        setPagination(data.pagination || { page, limit, total: 0, pages: 0 });
        if (data.counts) {
          setCounts(data.counts);
        }
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setError('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce((search, status, date, filter) => {
      fetchAppointments(1, pagination.limit, search, status, date, filter);
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
    fetchAppointments(1, pagination.limit, searchQuery, searchStatus, searchDate, filter);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchStatus('all');
    setSearchDate('');
    fetchAppointments(1, pagination.limit, '', 'all', '', activeFilter);
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
      const response = await fetch(`/api/appointments/admin/${appointmentId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();
      if (data.success) {
        setAppointments(prev => prev.map(app => 
          app._id === appointmentId ? { ...app, status: newStatus } : app
        ));
        if (selectedAppointment && selectedAppointment._id === appointmentId) {
          setSelectedAppointment(prev => ({ ...prev, status: newStatus }));
        }
        fetchAppointments(pagination.page, pagination.limit, searchQuery, searchStatus, searchDate, activeFilter);
      } else {
        alert(data.message || 'Failed to update appointment status');
      }
    } catch (error) {
      console.error(error);
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

  const handleDownloadAll = async () => {
    try {
      setIsExporting(true);
      const params = new URLSearchParams();
      params.append('page', 1);
      params.append('limit', 10000);
      params.append('filter', activeFilter);
      if (searchQuery) params.append('search', searchQuery);
      if (searchStatus !== 'all') params.append('status', searchStatus);
      if (searchDate) params.append('date', searchDate);

      const response = await fetch(`/api/appointments/admin?${params.toString()}`);
      const data = await response.json();
      if (data.success && data.appointments && data.appointments.length > 0) {
        const processed = data.appointments.map(app => ({
          ...app,
          displayDate: app.displayDate || formatDateString(app.appointmentDate),
          canadaDate: app.canadaDate || app.appointmentDate
        }));
        exportAppointmentsToExcel(processed, 'St_Mary_Rideau_Appointments_All.xlsx');
      } else {
        alert('No appointments available to export.');
      }
    } catch (err) {
      console.error('Export error:', err);
      alert('Failed to export appointments.');
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className={`text-base font-extrabold ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>
            Appointment Management
          </h2>
          <p className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-[#64748B]'}`}>
            Showing {appointments.length > 0 ? (pagination.page - 1) * pagination.limit + 1 : 0} - {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} entries
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {isDoctor && (
            <button
              onClick={handleDownloadAll}
              disabled={loading || isExporting || appointments.length === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition disabled:opacity-50 cursor-pointer"
              title="Download All Appointments as Excel"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting ? 'Exporting...' : 'Download All'}</span>
            </button>
          )}

          <select
            value={pagination.limit}
            onChange={(e) => handleLimitChange(parseInt(e.target.value))}
            className={`px-3 py-1.5 border rounded-xl text-xs focus:outline-none cursor-pointer ${
              isDark ? 'bg-[#1E293B] border-[#334155] text-slate-200' : 'bg-white border-[#E2E8F0] text-[#334155]'
            }`}
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
            className={`p-1.5 border rounded-xl transition disabled:opacity-50 ${
              isDark ? 'border-[#334155] hover:bg-[#334155] text-slate-300' : 'border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#64748B]'
            }`}
            title="Refresh list"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className={`flex flex-wrap gap-1.5 p-1.5 rounded-xl border ${
        isDark ? 'bg-[#1E293B] border-[#334155]' : 'bg-[#F8FAFC] border-[#E2E8F0]/80'
      }`}>
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
                  : isDark ? 'text-slate-400 hover:text-white hover:bg-[#334155]' : 'text-[#64748B] hover:text-[#334155] hover:bg-white/60'
              }`}
            >
              {label} ({count})
            </button>
          );
        })}
      </div>

      {/* SEARCH FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by name, email, phone..."
            className={`w-full pl-9 pr-8 py-2 border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] transition-all ${
              isDark ? 'bg-[#1E293B] border-[#334155] text-slate-200 placeholder-slate-500' : 'bg-white border-[#E2E8F0] text-[#334155] placeholder-[#94A3B8]'
            }`}
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
          className={`w-full px-3 py-2 border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] cursor-pointer ${
            isDark ? 'bg-[#1E293B] border-[#334155] text-slate-200' : 'bg-white border-[#E2E8F0] text-[#334155]'
          }`}
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
          className={`w-full px-3 py-2 border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] ${
            isDark ? 'bg-[#1E293B] border-[#334155] text-slate-200' : 'bg-white border-[#E2E8F0] text-[#334155]'
          }`}
        />
      </div>

      {/* Table List View */}
      <div className={`overflow-x-auto border rounded-xl ${isDark ? 'border-[#334155]' : 'border-[#E2E8F0]'}`}>
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#0EA5E9] border-t-transparent mx-auto"></div>
            <p className="mt-3 text-xs text-[#94A3B8]">Loading appointments…</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className={`text-center py-16 text-xs ${isDark ? 'text-slate-500' : 'text-[#94A3B8]'}`}>No appointments matching query found.</div>
        ) : (
          <table className={`min-w-full divide-y text-xs ${isDark ? 'divide-[#334155]' : 'divide-[#E2E8F0]'}`}>
            <thead className={isDark ? 'bg-[#1E293B]' : 'bg-[#F8FAFC]'}>
              <tr>
                <th className={`px-4 py-3 text-left font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-[#475569]'}`}>No</th>
                <th className={`px-4 py-3 text-left font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-[#475569]'}`}>Patient Details</th>
                <th className={`px-4 py-3 text-left font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-[#475569]'}`}>Date & Time</th>
                <th className={`px-4 py-3 text-left font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-[#475569]'}`}>Status Badge</th>
                <th className={`px-4 py-3 text-left font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-[#475569]'}`}>Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'bg-[#0F172A] divide-[#334155]' : 'bg-white divide-[#F1F5F9]'}`}>
              {appointments.map((appointment, index) => {
                const appointmentDate = appointment.canadaDate || appointment.appointmentDate;
                const isAppointmentToday = isToday(appointmentDate);
                const isAppointmentPast = isPast(appointmentDate);

                return (
                  <tr 
                    key={appointment._id} 
                    className={`transition-colors ${
                      isDark 
                        ? (isAppointmentToday ? 'bg-sky-950/40' : isAppointmentPast && appointment.status === 'scheduled' ? 'bg-rose-950/40' : 'hover:bg-[#1E293B]/60')
                        : (isAppointmentToday ? 'bg-[#EFF6FF]/60' : isAppointmentPast && appointment.status === 'scheduled' ? 'bg-[#FEF2F2]/60' : 'hover:bg-[#F8FAFC]/50')
                    }`}
                  >
                    <td className={`px-4 py-4 font-bold cursor-pointer ${isDark ? 'text-slate-400' : 'text-[#64748B]'}`} onClick={() => openModal(appointment)}>
                      {(pagination.page - 1) * pagination.limit + index + 1}
                      {isAppointmentToday && (
                        <span className="block text-[8px] font-black text-sky-400 uppercase mt-0.5">Today</span>
                      )}
                    </td>
                    
                    <td className="px-4 py-4 cursor-pointer" onClick={() => openModal(appointment)}>
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                          isDark ? 'bg-sky-950 border-sky-800 text-sky-400' : 'bg-[#EFF6FF] border-[#BFDBFE]/20 text-[#1E3A8A]'
                        }`}>
                          {appointment.firstName?.charAt(0) || 'P'}
                        </div>
                        <div className="min-w-0">
                          <div className={`font-bold ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>{appointment.firstName} {appointment.lastName}</div>
                          <div className={`text-[10px] font-medium ${isDark ? 'text-slate-400' : 'text-[#64748B]'}`}>{appointment.email}</div>
                          <div className={`text-[10px] font-medium ${isDark ? 'text-slate-400' : 'text-[#64748B]'}`}>{appointment.cellPhone}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 cursor-pointer" onClick={() => openModal(appointment)}>
                      <div className={`font-bold ${isDark ? 'text-slate-200' : 'text-[#334155]'}`}>{formatDateString(appointmentDate)}</div>
                      <div className={`text-[10px] font-semibold mt-0.5 ${isDark ? 'text-slate-400' : 'text-[#64748B]'}`}>{appointment.appointmentTime}</div>
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
                          className={`px-2.5 py-1 border text-[10px] font-bold rounded-lg transition ${
                            isDark ? 'bg-[#1E293B] border-[#334155] text-slate-200 hover:bg-[#334155]' : 'bg-white border-[#E2E8F0] text-[#334155] hover:bg-[#F8FAFC]'
                          }`}
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
        <div className={`flex flex-col sm:flex-row items-center justify-between pt-4 border-t gap-4 text-xs font-medium ${
          isDark ? 'border-[#334155] text-slate-400' : 'border-[#F1F5F9] text-[#64748B]'
        }`}>
          <div>
            Page <span className={`font-bold ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>{pagination.page}</span> of <span className={`font-bold ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>{pagination.pages}</span> · <span className={`font-bold ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>{pagination.total}</span> total entries
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className={`p-1.5 border rounded-lg transition disabled:opacity-50 ${
                isDark ? 'border-[#334155] text-slate-300 hover:bg-[#334155]' : 'border-[#E2E8F0] hover:bg-[#F8FAFC]'
              }`}
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
                    isCurrent 
                      ? 'bg-sky-600 text-white shadow-xs' 
                      : isDark ? 'border border-[#334155] text-slate-300 hover:bg-[#334155]' : 'border border-[#E2E8F0] hover:bg-[#F8FAFC]'
                  }`}
                >
                  {p}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.pages}
              className={`p-1.5 border rounded-lg transition disabled:opacity-50 ${
                isDark ? 'border-[#334155] text-slate-300 hover:bg-[#334155]' : 'border-[#E2E8F0] hover:bg-[#F8FAFC]'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Detail Modal Component */}
      {isModalOpen && selectedAppointment && (
        <AppointmentDetailModal appointment={selectedAppointment} onClose={closeModal} onStatusChange={handleStatusUpdate} theme={theme} />
      )}
    </div>
  );
}