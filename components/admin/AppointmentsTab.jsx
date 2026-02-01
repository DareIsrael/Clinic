// 'use client';
// import { useState, useEffect, useCallback } from 'react';
// import debounce from 'lodash/debounce';
// import AppointmentDetailModal from './AppointmentDetailModal';
// import AppointmentStatusDropdown from './AppointmentStatusDropdown';

// export default function AppointmentsTab() {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
  
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     pages: 0
//   });
  
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchStatus, setSearchStatus] = useState('all');
//   const [searchDate, setSearchDate] = useState('');
//   const [activeFilter, setActiveFilter] = useState('upcoming');

//   // Helper function to format date string for display
//   const formatDateString = (dateString) => {
//     if (!dateString) return '';
    
//     // If it's already a formatted date, return it
//     if (dateString.includes(', ')) return dateString;
    
//     // If it's a YYYY-MM-DD string, format it
//     if (typeof dateString === 'string' && dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
//       const [year, month, day] = dateString.split('-');
//       const dateObj = new Date(year, month - 1, day);
      
//       return dateObj.toLocaleDateString('en-US', {
//         weekday: 'short',
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric'
//       });
//     }
    
//     return dateString;
//   };

//   // Helper function to check if a date string is today
//   const isToday = (dateString) => {
//   if (!dateString) return false;

//   const today = new Date();
//   const yyyy = today.getFullYear();
//   const mm = String(today.getMonth() + 1).padStart(2, '0'); // month 01-12
//   const dd = String(today.getDate()).padStart(2, '0');       // day 01-31

//   const todayString = `${yyyy}-${mm}-${dd}`; // e.g. "2026-02-01"

//   return dateString === todayString;
// };


//   // Helper function to check if a date string is in the past
//   const isPast = (dateString) => {
//   if (!dateString) return false;

//   const today = new Date();
//   const appointmentDate = new Date(dateString);

//   // compare only date part
//   return appointmentDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
// };

// const isFuture = (dateString) => {
//   if (!dateString) return false;

//   const today = new Date();
//   const appointmentDate = new Date(dateString);

//   return appointmentDate > new Date(today.getFullYear(), today.getMonth(), today.getDate());
// };


//   const fetchAppointments = async (page = 1, limit = 10, search = '', status = 'all', date = '', filter = 'upcoming') => {
//     try {
//       setLoading(true);
      
//       const params = new URLSearchParams();
//       params.append('page', page);
//       params.append('limit', limit);
//       params.append('filter', filter);
      
//       if (search) params.append('search', search);
//       if (status !== 'all') params.append('status', status);
//       if (date) params.append('date', date);
      
//       const response = await fetch(`/api/appointments/admin?${params.toString()}`);
//       const data = await response.json();
      
//       if (data.success) {
//         // Make sure appointments have the proper date fields
//         const processedAppointments = data.appointments?.map(appointment => ({
//           ...appointment,
//           // Ensure we have canadaDate for display
//           displayDate: appointment.displayDate || formatDateString(appointment.appointmentDate),
//           canadaDate: appointment.canadaDate || appointment.appointmentDate
//         })) || [];
        
//         setAppointments(processedAppointments);
//         setPagination(data.pagination || {
//           page,
//           limit,
//           total: 0,
//           pages: 0
//         });
//       } else {
//         setError(data.message || 'Failed to load appointments');
//       }
//     } catch (error) {
//       console.error('Error fetching appointments:', error);
//       setError('Failed to load appointments');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const debouncedSearch = useCallback(
//     debounce((searchValue, statusValue, dateValue, filterValue) => {
//       fetchAppointments(1, pagination.limit, searchValue, statusValue, dateValue, filterValue);
//     }, 300),
//     [pagination.limit]
//   );

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchQuery(value);
//     debouncedSearch(value, searchStatus, searchDate, activeFilter);
//   };

//   const handleStatusChange = (e) => {
//     const value = e.target.value;
//     setSearchStatus(value);
//     fetchAppointments(1, pagination.limit, searchQuery, value, searchDate, activeFilter);
//   };

//   const handleDateChange = (e) => {
//     const value = e.target.value;
//     setSearchDate(value);
//     fetchAppointments(1, pagination.limit, searchQuery, searchStatus, value, activeFilter);
//   };

//   const handleFilterChange = (filter) => {
//     setActiveFilter(filter);
//     setSearchStatus('all');
//     setSearchDate('');
//     fetchAppointments(1, pagination.limit, searchQuery, 'all', '', filter);
//   };

//   const handleClearSearch = () => {
//     setSearchQuery('');
//     setSearchStatus('all');
//     setSearchDate('');
//     setActiveFilter('upcoming');
//     fetchAppointments(1, pagination.limit, '', 'all', '', 'upcoming');
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= pagination.pages) {
//       fetchAppointments(newPage, pagination.limit, searchQuery, searchStatus, searchDate, activeFilter);
//     }
//   };

//   const handleLimitChange = (newLimit) => {
//     fetchAppointments(1, newLimit, searchQuery, searchStatus, searchDate, activeFilter);
//   };

//   const handleStatusUpdate = async (appointmentId, newStatus) => {
//     try {
//       const response = await fetch('/api/appointments', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ 
//           appointmentId, 
//           status: newStatus 
//         }),
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         // Update local state
//         setAppointments(prev => 
//           prev.map(appointment => 
//             appointment._id === appointmentId 
//               ? { ...appointment, status: newStatus } 
//               : appointment
//           )
//         );
        
//         // Update modal if open
//         if (selectedAppointment && selectedAppointment._id === appointmentId) {
//           setSelectedAppointment(prev => ({ ...prev, status: newStatus }));
//         }
        
//         // Refresh data
//         fetchAppointments(pagination.page, pagination.limit, searchQuery, searchStatus, searchDate, activeFilter);
        
//         alert(`Appointment status updated to ${newStatus}.`);
//       } else {
//         alert(data.message || 'Failed to update appointment status');
//       }
//     } catch (error) {
//       console.error('Error updating appointment status:', error);
//       alert('Error updating appointment status');
//     }
//   };

//   const openModal = (appointment) => {
//     setSelectedAppointment(appointment);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setSelectedAppointment(null);
//     setIsModalOpen(false);
//   };

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'scheduled': return 'bg-blue-100 text-blue-800';
//       case 'confirmed': return 'bg-green-100 text-green-800';
//       case 'completed': return 'bg-purple-100 text-purple-800';
//       case 'cancelled': return 'bg-red-100 text-red-800';
//       case 'no_show': return 'bg-yellow-100 text-yellow-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   // Calculate statistics using string dates
//   const today = new Date();
//   const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

//   const todaysAppointments = appointments.filter(app => 
//     isToday(app.canadaDate || app.appointmentDate)
//   );

//   const upcomingAppointments = appointments.filter(app => 
//     app.status !== 'cancelled' && app.status !== 'completed' && 
//     (isFuture(app.canadaDate || app.appointmentDate) || isToday(app.canadaDate || app.appointmentDate))
//   );

//   const completedAppointments = appointments.filter(app => app.status === 'completed');

//   return (
//     <div className="bg-white rounded-lg shadow-md">
//       <div className="p-4 sm:p-6 border-b border-gray-200">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div>
//             <h2 className="text-lg font-semibold text-gray-900">Appointment Management</h2>
//             <p className="text-sm text-gray-600 mt-1">
//               Showing {appointments.length} of {pagination.total} appointments
//             </p>
//           </div>
//           <div className="flex items-center space-x-4">
//             <select
//               value={pagination.limit}
//               onChange={(e) => handleLimitChange(parseInt(e.target.value))}
//               className="text-sm text-gray-600 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
//               disabled={loading}
//             >
//               <option value="5">5 per page</option>
//               <option value="10">10 per page</option>
//               <option value="20">20 per page</option>
//               <option value="50">50 per page</option>
//             </select>
            
//             <button 
//               onClick={() => fetchAppointments(pagination.page, pagination.limit, searchQuery, searchStatus, searchDate, activeFilter)}
//               disabled={loading}
//               className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-sky-700 transition duration-300 disabled:opacity-50"
//             >
//               {loading ? 'Loading...' : 'Refresh'}
//             </button>
//           </div>
//         </div>

//         {/* Quick Filter Buttons */}
//         <div className="mt-6 flex flex-wrap gap-2">
//           <button
//             onClick={() => handleFilterChange('upcoming')}
//             className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
//               activeFilter === 'upcoming'
//                 ? 'bg-sky-600 text-white'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             Upcoming ({upcomingAppointments.length})
//           </button>
//           <button
//             onClick={() => handleFilterChange('today')}
//             className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
//               activeFilter === 'today'
//                 ? 'bg-sky-600 text-white'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             Today ({todaysAppointments.length})
//           </button>
//           <button
//             onClick={() => handleFilterChange('completed')}
//             className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
//               activeFilter === 'completed'
//                 ? 'bg-sky-600 text-white'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             Completed ({completedAppointments.length})
//           </button>
//           <button
//             onClick={() => handleFilterChange('cancelled')}
//             className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
//               activeFilter === 'cancelled'
//                 ? 'bg-sky-600 text-white'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             Cancelled
//           </button>
//           <button
//             onClick={() => handleFilterChange('all')}
//             className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
//               activeFilter === 'all'
//                 ? 'bg-sky-600 text-white'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             All Appointments
//           </button>
//         </div>

//         {/* Search and Filter */}
//         <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
//               Search Appointments
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </div>
//               <input
//                 type="text"
//                 id="search"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 placeholder="Search by name, email, or phone..."
//                 className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-gray-700 focus:ring-2 focus:ring-sky-500"
//               />
//             </div>
//           </div>
          
//           <div>
//             <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">
//               Filter by Status
//             </label>
//             <select
//               id="statusFilter"
//               value={searchStatus}
//               onChange={handleStatusChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-700 focus:ring-sky-500"
//             >
//               <option value="all">All Statuses</option>
//               <option value="scheduled">Scheduled</option>
//               <option value="confirmed">Confirmed</option>
//               <option value="completed">Completed</option>
//               <option value="cancelled">Cancelled</option>
//               <option value="no_show">No Show</option>
//             </select>
//           </div>

//           <div>
//             <label htmlFor="dateFilter" className="block text-sm font-medium text-gray-700 mb-1">
//               Filter by Date
//             </label>
//             <input
//               type="date"
//               id="dateFilter"
//               value={searchDate}
//               onChange={handleDateChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-700 focus:ring-sky-500"
//             />
//           </div>
//         </div>

//         {/* Search Results Info */}
//         {(searchQuery || searchStatus !== 'all' || searchDate) && (
//           <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
//             <div>
//               Searching: 
//               {searchQuery && ` Name/Email: "${searchQuery}"`}
//               {searchStatus !== 'all' && ` Status: ${searchStatus}`}
//               {searchDate && ` Date: ${searchDate}`}
//             </div>
//             <button
//               onClick={handleClearSearch}
//               className="text-sky-600 hover:text-sky-800 text-sm font-medium"
//             >
//               Clear filters
//             </button>
//           </div>
//         )}
//       </div>
      
//       <div className="p-4 sm:p-6">
//         {loading ? (
//           <div className="text-center py-8">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600 mx-auto"></div>
//             <p className="mt-2 text-gray-600">Loading appointments...</p>
//           </div>
//         ) : (
//           <>
//             {/* Today's Appointments Summary */}
//             {activeFilter === 'upcoming' && todaysAppointments.length > 0 && (
//               <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0">
//                     <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <div className="ml-3">
//                     <h3 className="text-sm font-medium text-yellow-800">
//                       Today's Appointments: {todaysAppointments.length}
//                     </h3>
//                     <div className="mt-2 text-sm text-yellow-700">
//                       <p>You have {todaysAppointments.length} appointment{todaysAppointments.length !== 1 ? 's' : ''} scheduled for today.</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       No
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Patient
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Date & Time
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {appointments.map((appointment, index) => {
//                     const appointmentDate = appointment.canadaDate || appointment.appointmentDate;
//                     const isAppointmentToday = isToday(appointmentDate);
//                     const isAppointmentPast = isPast(appointmentDate);
                    
//                     return (
//                       <tr 
//                         key={appointment._id} 
//                         className={`hover:bg-gray-50 transition duration-300 ${
//                           isAppointmentToday ? 'bg-sky-50' : ''
//                         } ${isAppointmentPast && appointment.status === 'scheduled' ? 'bg-red-50' : ''}`}
//                       >
//                         <td 
//                           className="px-4 py-4 whitespace-nowrap cursor-pointer"
//                           onClick={() => openModal(appointment)}
//                         >
//                           <div className="text-sm font-medium text-gray-900">
//                             {(pagination.page - 1) * pagination.limit + index + 1}
//                           </div>
//                           {isAppointmentToday && (
//                             <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full">
//                               Today
//                             </span>
//                           )}
//                         </td>
//                         <td 
//                           className="px-4 py-4 whitespace-nowrap cursor-pointer"
//                           onClick={() => openModal(appointment)}
//                         >
//                           <div className="text-sm font-medium text-gray-900">
//                             {appointment.firstName} {appointment.lastName}
//                           </div>
//                           <div className="text-sm text-gray-500">{appointment.email}</div>
//                           <div className="text-xs text-gray-400">{appointment.cellPhone}</div>
//                         </td>
//                         <td 
//                           className="px-4 py-4 whitespace-nowrap cursor-pointer"
//                           onClick={() => openModal(appointment)}
//                         >
//                           <div className="text-sm font-medium text-gray-900">
//                             {appointment.displayDate || formatDateString(appointmentDate)}
//                           </div>
//                           <div className="text-sm text-gray-600">
//                             {appointment.appointmentTime}
//                             {isAppointmentPast && appointment.status === 'scheduled' && (
//                               <span className="ml-2 text-xs text-red-600 font-medium">
//                                 (Missed)
//                               </span>
//                             )}
//                           </div>
//                         </td>
//                         <td className="px-4 py-4 whitespace-nowrap">
//                           <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
//                             {appointment.status}
//                           </span>
//                         </td>
//                         <td className="px-4 py-4 whitespace-nowrap">
//                           <div className="flex space-x-2">
//                             <AppointmentStatusDropdown 
//                               appointment={appointment} 
//                               onStatusChange={handleStatusUpdate}
//                             />
//                             <button
//                               onClick={() => openModal(appointment)}
//                               className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
//                               title="View Details"
//                             >
//                               View
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                   {appointments.length === 0 && (
//                     <tr>
//                       <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
//                         {searchQuery || searchStatus !== 'all' || searchDate
//                           ? 'No appointments found matching your search criteria.'
//                           : activeFilter === 'today' 
//                             ? 'No appointments scheduled for today.'
//                             : activeFilter === 'upcoming'
//                             ? 'No upcoming appointments.'
//                             : 'No appointments found.'}
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             {pagination.pages > 1 && (
//               <div className="flex items-center justify-between mt-6 px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
//                 <div className="flex justify-between flex-1 sm:hidden">
//                   <button
//                     onClick={() => handlePageChange(pagination.page - 1)}
//                     disabled={pagination.page === 1}
//                     className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     Previous
//                   </button>
//                   <button
//                     onClick={() => handlePageChange(pagination.page + 1)}
//                     disabled={pagination.page === pagination.pages}
//                     className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     Next
//                   </button>
//                 </div>
//                 <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
//                   <div>
//                     <p className="text-sm text-gray-700">
//                       Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to{' '}
//                       <span className="font-medium">
//                         {Math.min(pagination.page * pagination.limit, pagination.total)}
//                       </span> of{' '}
//                       <span className="font-medium">{pagination.total}</span> results
//                     </p>
//                   </div>
//                   <div>
//                     <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
//                       <button
//                         onClick={() => handlePageChange(pagination.page - 1)}
//                         disabled={pagination.page === 1}
//                         className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         <span className="sr-only">Previous</span>
//                         <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                           <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
//                         </svg>
//                       </button>
                      
//                       {/* Page numbers */}
//                       {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
//                         let pageNum;
//                         if (pagination.pages <= 5) {
//                           pageNum = i + 1;
//                         } else if (pagination.page <= 3) {
//                           pageNum = i + 1;
//                         } else if (pagination.page >= pagination.pages - 2) {
//                           pageNum = pagination.pages - 4 + i;
//                         } else {
//                           pageNum = pagination.page - 2 + i;
//                         }

//                         return (
//                           <button
//                             key={pageNum}
//                             onClick={() => handlePageChange(pageNum)}
//                             className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
//                               pagination.page === pageNum
//                                 ? 'z-10 bg-sky-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600'
//                                 : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
//                             }`}
//                           >
//                             {pageNum}
//                           </button>
//                         );
//                       })}

//                       <button
//                         onClick={() => handlePageChange(pagination.page + 1)}
//                         disabled={pagination.page === pagination.pages}
//                         className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         <span className="sr-only">Next</span>
//                         <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                           <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l4.5 4.25a.75.75 0 01-1.06.02z" clipRule="evenodd" />
//                         </svg>
//                       </button>
//                     </nav>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Detail Modal */}
//       {isModalOpen && selectedAppointment && (
//         <AppointmentDetailModal
//           appointment={selectedAppointment}
//           onClose={closeModal}
//           onStatusChange={handleStatusUpdate}
//         />
//       )}
//     </div>
//   );
// }



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

  const [searchQuery, setSearchQuery] = useState('');
  const [searchStatus, setSearchStatus] = useState('all');
  const [searchDate, setSearchDate] = useState('');
  const [activeFilter, setActiveFilter] = useState('upcoming');

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
    setActiveFilter(filter);
    setSearchStatus('all');
    setSearchDate('');
    fetchAppointments(1, pagination.limit, searchQuery, 'all', '', filter);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchStatus('all');
    setSearchDate('');
    setActiveFilter('upcoming');
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

  const todaysAppointments = appointments.filter(app => isToday(app.canadaDate || app.appointmentDate));
  const upcomingAppointments = appointments.filter(app =>
    app.status !== 'cancelled' && app.status !== 'completed' &&
    (isFuture(app.canadaDate || app.appointmentDate) || isToday(app.canadaDate || app.appointmentDate))
  );
  const completedAppointments = appointments.filter(app => app.status === 'completed');
  const cancelledAppointments = appointments.filter(app => app.status === 'cancelled');

  let filteredAppointments = appointments;
  if (activeFilter === 'today') filteredAppointments = todaysAppointments;
  else if (activeFilter === 'upcoming') filteredAppointments = upcomingAppointments;
  else if (activeFilter === 'completed') filteredAppointments = completedAppointments;
  else if (activeFilter === 'cancelled') filteredAppointments = cancelledAppointments;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Appointment Management</h2>
            <p className="text-sm text-gray-500 mt-1">
              Showing {filteredAppointments.length} of {pagination.total} appointments
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
            const count = filter === 'upcoming' ? upcomingAppointments.length
              : filter === 'today' ? todaysAppointments.length
              : filter === 'completed' ? completedAppointments.length
              : filter === 'cancelled' ? cancelledAppointments.length
              : appointments.length;
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
      </div>

      {/* Modal */}
      {isModalOpen && selectedAppointment && (
        <AppointmentDetailModal appointment={selectedAppointment} onClose={closeModal} onStatusChange={handleStatusUpdate} />
      )}
    </div>
  );
}
