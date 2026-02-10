


// cleaned up commented out code


'use client';
import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
import AppointmentDetailModal from './AppointmentDetailModal';
import AppointmentStatusDropdown from './AppointmentStatusDropdown';

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
        // Refresh counts if status changed significantly (optional but good)
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
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'no_show': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Filtering is now done on the server
  const filteredAppointments = appointments;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Appointment Management</h2>
            <p className="text-sm text-gray-500 mt-1">
              Showing {filteredAppointments.length > 0 ? (pagination.page - 1) * pagination.limit + 1 : 0} - {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} appointments
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-3 sm:mt-0">
            <select
              value={pagination.limit}
              onChange={(e) => handleLimitChange(parseInt(e.target.value))}
              className="text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
              disabled={loading}
            >
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
              <option value="50">50 per page</option>
            </select>
            <button
              onClick={() => fetchAppointments(pagination.page, pagination.limit, searchQuery, searchStatus, searchDate, activeFilter)}
              disabled={loading}
              className="bg-sky-600 text-white px-4 py-2 rounded-md text-sm hover:bg-sky-700 transition duration-200 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Quick Filter Buttons */}
        <div className="mt-5 flex flex-wrap gap-2">
          {['upcoming', 'today', 'completed', 'cancelled', 'all'].map((filter) => {
            const label = filter.charAt(0).toUpperCase() + filter.slice(1).replace('_', ' ');
            const count = counts[filter] || 0;
            return (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${activeFilter === filter ? 'bg-sky-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>

        {/* Search Filters */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by name, email, phone..."
              className="w-full px-3 py-2 border border-gray-300  text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={searchStatus}
              onChange={handleStatusChange}
              className="w-full px-3 py-2 border border-gray-300 text-gray-400 rounded-md focus:outline-none focus:ring-2 text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="scheduled">Scheduled</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="no_show">No Show</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={searchDate}
              onChange={handleDateChange}
              className="w-full px-3 py-2 border border-gray-300 text-gray-400 rounded-md focus:outline-none focus:ring-2 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="p-6 overflow-x-auto">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-sky-500 border-t-transparent mx-auto"></div>
            <p className="mt-3 text-gray-500 text-sm">Loading appointments...</p>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm">No appointments found.</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-700">No</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Patient</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Date & Time</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Status</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment, index) => {
                const appointmentDate = appointment.canadaDate || appointment.appointmentDate;
                const isAppointmentToday = isToday(appointmentDate);
                const isAppointmentPast = isPast(appointmentDate);

                return (
                  <tr key={appointment._id} className={`${isAppointmentToday ? 'bg-sky-50' : ''} ${isAppointmentPast && appointment.status === 'scheduled' ? 'bg-red-50' : ''} hover:bg-gray-50 transition`}>
                    <td className="px-4 py-3 text-gray-500 cursor-pointer" onClick={() => openModal(appointment)}>
                      {(pagination.page - 1) * pagination.limit + index + 1}{isAppointmentToday && <span className="text-xs text-sky-600 ml-1">Today</span>}
                    </td>
                    <td className="px-4 py-3 cursor-pointer" onClick={() => openModal(appointment)}>
                      <div className="font-medium text-gray-800">{appointment.firstName} {appointment.lastName}</div>
                      <div className="text-gray-500">{appointment.email}</div>
                      <div className="text-gray-500">{appointment.cellPhone}</div>
                    </td>
                    <td className="px-4 py-3 cursor-pointer" onClick={() => openModal(appointment)}>
                      <div className="text-gray-400">{formatDateString(appointmentDate)}</div>
                      <div className="text-gray-500">{appointment.appointmentTime}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex items-center gap-2">
                      <AppointmentStatusDropdown appointment={appointment} onStatusChange={handleStatusUpdate} />
                      <button
                        onClick={() => openModal(appointment)}
                        className="text-sky-600 hover:text-sky-800 text-sm font-medium"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {/* Pagination Component */}
        {!loading && pagination.pages > 1 && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 pt-6 gap-4">
            {/* Pagination Info */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Page {pagination.page} of {pagination.pages}</span>
              <span className="mx-2">•</span>
              <span>{pagination.total} total appointments</span>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${pagination.page <= 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                  }`}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {(() => {
                  const pages = [];
                  const maxVisible = 5;
                  let startPage = Math.max(1, pagination.page - Math.floor(maxVisible / 2));
                  let endPage = Math.min(pagination.pages, startPage + maxVisible - 1);

                  // Adjust if we're near the end
                  if (endPage - startPage + 1 < maxVisible) {
                    startPage = Math.max(1, endPage - maxVisible + 1);
                  }

                  // First page
                  if (startPage > 1) {
                    pages.push(
                      <button
                        key={1}
                        onClick={() => handlePageChange(1)}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${pagination.page === 1
                          ? 'bg-sky-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                      >
                        1
                      </button>
                    );
                    if (startPage > 2) {
                      pages.push(
                        <span key="ellipsis1" className="px-2 text-gray-400">
                          ...
                        </span>
                      );
                    }
                  }

                  // Page numbers
                  for (let i = startPage; i <= endPage; i++) {
                    pages.push(
                      <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${pagination.page === i
                          ? 'bg-sky-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                      >
                        {i}
                      </button>
                    );
                  }

                  // Last page
                  if (endPage < pagination.pages) {
                    if (endPage < pagination.pages - 1) {
                      pages.push(
                        <span key="ellipsis2" className="px-2 text-gray-400">
                          ...
                        </span>
                      );
                    }
                    pages.push(
                      <button
                        key={pagination.pages}
                        onClick={() => handlePageChange(pagination.pages)}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${pagination.page === pagination.pages
                          ? 'bg-sky-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                      >
                        {pagination.pages}
                      </button>
                    );
                  }

                  return pages;
                })()}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page >= pagination.pages}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${pagination.page >= pagination.pages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                  }`}
              >
                Next
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Items Per Page */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Show:</span>
              <select
                value={pagination.limit}
                onChange={(e) => handleLimitChange(parseInt(e.target.value))}
                className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-sky-500"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <span className="text-sm text-gray-500">per page</span>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedAppointment && (
        <AppointmentDetailModal appointment={selectedAppointment} onClose={closeModal} onStatusChange={handleStatusUpdate} />
      )}
    </div>
  );
}