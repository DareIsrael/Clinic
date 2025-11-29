// 'use client';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/hooks/useAuth';
// import ProtectedRoute from '@/components/ProtectedRoute';
// import { dashboardService } from '@/services/dashboardService';
// import { appointmentService } from '@/services/appointmentService';

// export default function AdminDashboard() {
//   const [stats, setStats] = useState({});
//   const [recentAppointments, setRecentAppointments] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [error, setError] = useState('');
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isUserModalOpen, setIsUserModalOpen] = useState(false);
//   const { user, loading: authLoading, isAuthenticated } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!authLoading && isAuthenticated) {
//       fetchDashboardData();
//     }
//   }, [authLoading, isAuthenticated]);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       setError('');
//       const [statsResponse, appointmentsResponse, usersResponse] = await Promise.all([
//         dashboardService.getAdminStats(),
//         appointmentService.getAllAppointments({ limit: 10 }),
//         dashboardService.getUsers({ limit: 10 })
//       ]);
      
//       setStats(statsResponse.stats || {});
//       setRecentAppointments(appointmentsResponse.appointments || []);
//       setUsers(usersResponse.users || []);
//     } catch (error) {
//       console.error('Error fetching admin data:', error);
//       setError(error.response?.data?.message || 'Failed to load dashboard data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateAppointmentStatus = async (appointmentId, status) => {
//     try {
//       const response = await appointmentService.updateAppointmentStatus(appointmentId, status);
      
//       if (response.success) {
//         setRecentAppointments(prev => 
//           prev.map(apt => 
//             apt._id === appointmentId ? { ...apt, status } : apt
//           )
//         );
        
//         const statsResponse = await dashboardService.getAdminStats();
//         setStats(statsResponse.stats || {});
//       } else {
//         alert(response.message || 'Failed to update appointment');
//       }
//     } catch (error) {
//       console.error('Error updating appointment:', error);
//       alert(error.response?.data?.message || 'Error updating appointment status');
//     }
//   };

//   const deleteAppointment = async (appointmentId) => {
//     if (!confirm('Are you sure you want to delete this appointment? This action cannot be undone.')) return;

//     try {
//       const response = await appointmentService.cancelAppointment(appointmentId);
      
//       if (response.success) {
//         setRecentAppointments(prev => prev.filter(apt => apt._id !== appointmentId));
        
//         const statsResponse = await dashboardService.getAdminStats();
//         setStats(statsResponse.stats || {});
//       } else {
//         alert(response.message || 'Failed to delete appointment');
//       }
//     } catch (error) {
//       console.error('Error deleting appointment:', error);
//       alert(error.response?.data?.message || 'Error deleting appointment');
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'confirmed': return 'bg-green-100 text-green-800';
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'cancelled': return 'bg-red-100 text-red-800';
//       case 'completed': return 'bg-sky-100 text-sky-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const openUserModal = (user) => {
//     setSelectedUser(user);
//     setIsUserModalOpen(true);
//   };

//   const closeUserModal = () => {
//     setSelectedUser(null);
//     setIsUserModalOpen(false);
//   };

//   const calculatedStats = {
//     ...stats,
//     cancelledAppointments: stats.cancelledAppointments || 0,
//     upcomingAppointments: stats.upcomingAppointments || 0,
//     cancellationRate: stats.totalAppointments ? 
//       Math.round(((stats.cancelledAppointments || 0) / stats.totalAppointments) * 100) : 0,
//     newPatientsThisMonth: stats.newPatientsThisMonth || 0
//   };

//   if (authLoading || loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ProtectedRoute requireAdmin={true}>
//       <div className="min-h-screen bg-gray-50">
//         {/* Header */}
//         <div className="bg-white shadow">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center py-6">
//               <div>
//                 <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//                   Admin Dashboard
//                 </h1>
//                 <p className="text-gray-600 mt-1">Manage clinic operations and appointments</p>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <span className="text-sm text-gray-600 hidden sm:block">Welcome, {user?.firstName}</span>
//                 <div className="w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center text-white font-semibold">
//                   {user?.firstName?.charAt(0)}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Navigation Tabs */}
//         <div className="bg-white border-b">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <nav className="flex space-x-8 overflow-x-auto">
//               {['overview', 'appointments', 'users', 'reports'].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
//                     activeTab === tab
//                       ? 'border-sky-500 text-sky-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//                 >
//                   {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
//                 </button>
//               ))}
//             </nav>
//           </div>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//               {error}
//             </div>
//           </div>
//         )}

//         {/* Dashboard Content */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           {activeTab === 'overview' && (
//             <div className="space-y-6">
//               {/* Stats Cards */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//                 <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
//                   <div className="flex items-center">
//                     <div className="p-2 bg-sky-100 rounded-lg">
//                       <span className="text-sky-600 text-xl">📊</span>
//                     </div>
//                     <div className="ml-4">
//                       <p className="text-sm font-medium text-gray-600">Total Appointments</p>
//                       <p className="text-2xl font-bold text-gray-900">{calculatedStats.totalAppointments || 0}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
//                   <div className="flex items-center">
//                     <div className="p-2 bg-green-100 rounded-lg">
//                       <span className="text-green-600 text-xl">👥</span>
//                     </div>
//                     <div className="ml-4">
//                       <p className="text-sm font-medium text-gray-600">Total Patients</p>
//                       <p className="text-2xl font-bold text-gray-900">{calculatedStats.totalUsers || 0}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
//                   <div className="flex items-center">
//                     <div className="p-2 bg-yellow-100 rounded-lg">
//                       <span className="text-yellow-600 text-xl">⏳</span>
//                     </div>
//                     <div className="ml-4">
//                       <p className="text-sm font-medium text-gray-600">Pending</p>
//                       <p className="text-2xl font-bold text-gray-900">{calculatedStats.pendingAppointments || 0}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
//                   <div className="flex items-center">
//                     <div className="p-2 bg-purple-100 rounded-lg">
//                       <span className="text-purple-600 text-xl">💰</span>
//                     </div>
//                     <div className="ml-4">
//                       <p className="text-sm font-medium text-gray-600">Revenue</p>
//                       <p className="text-2xl font-bold text-gray-900">${calculatedStats.revenue || 0}</p>
//                     </div>
//                   </div>
//                 </div> */}
//               </div>

//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {/* Recent Appointments */}
//                 <div className="bg-white rounded-lg shadow-md">
//                   <div className="p-4 sm:p-6 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900">Recent Appointments</h2>
//                   </div>
//                   <div className="p-4 sm:p-6">
//                     <div className="space-y-4">
//                       {recentAppointments.slice(0, 5).map((appointment) => (
//                         <div key={appointment._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-300">
//                           <div className="flex-1">
//                             <p className="font-medium text-gray-900">
//                               {appointment.user?.firstName} {appointment.user?.lastName}
//                             </p>
//                             <p className="text-sm text-gray-600">{appointment.serviceType}</p>
//                             <p className="text-xs text-gray-500">
//                               {new Date(appointment.preferredDate).toLocaleDateString()} at {appointment.preferredTime}
//                             </p>
//                             <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${getStatusColor(appointment.status)}`}>
//                               {appointment.status}
//                             </span>
//                           </div>
//                           <div className="flex items-center space-x-2">
//                             <select
//                               value={appointment.status}
//                               onChange={(e) => updateAppointmentStatus(appointment._id, e.target.value)}
//                               className="text-xs border border-gray-300 text-gray-500 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-sky-500"
//                             >
//                               <option value="pending">Pending</option>
//                               <option value="confirmed">Confirmed</option>
//                               <option value="cancelled">Cancelled</option>
//                               <option value="completed">Completed</option>
//                             </select>
//                           </div>
//                         </div>
//                       ))}
//                       {recentAppointments.length === 0 && (
//                         <p className="text-center text-gray-500 py-4">No appointments found</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Quick Stats */}
//                 <div className="bg-white rounded-lg shadow-md">
//                   <div className="p-4 sm:p-6 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900">Quick Stats</h2>
//                   </div>
//                   <div className="p-4 sm:p-6">
//                     <div className="space-y-4">
//                       <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                         <span className="text-sm text-gray-600">Completed Appointments</span>
//                         <span className="font-semibold text-green-600">
//                           {calculatedStats.completedAppointments || 0}
//                         </span>
//                       </div>
//                       <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                         <span className="text-sm text-gray-600">Cancellation Rate</span>
//                         <span className="font-semibold text-orange-600">
//                           {calculatedStats.cancellationRate}%
//                         </span>
//                       </div>
//                       <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                         <span className="text-sm text-gray-600">Appointments Today</span>
//                         <span className="font-semibold text-sky-600">
//                           {recentAppointments.filter(apt => 
//                             new Date(apt.preferredDate).toDateString() === new Date().toDateString()
//                           ).length}
//                         </span>
//                       </div>
//                       <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                         <span className="text-sm text-gray-600">New Patients This Month</span>
//                         <span className="font-semibold text-purple-600">
//                           {calculatedStats.newPatientsThisMonth}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'appointments' && (
//             <div className="bg-white rounded-lg shadow-md">
//               <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
//                 <h2 className="text-lg font-semibold text-gray-900">All Appointments</h2>
//                 <button 
//                   onClick={fetchDashboardData}
//                   className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-sky-700 transition duration-300"
//                 >
//                   Refresh
//                 </button>
//               </div>
//               <div className="p-4 sm:p-6">
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Patient
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Service
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Date & Time
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Status
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {recentAppointments.map((appointment) => (
//                         <tr key={appointment._id} className="hover:bg-gray-50 transition duration-300">
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="text-sm font-medium text-gray-900">
//                               {appointment.user?.firstName} {appointment.user?.lastName}
//                             </div>
//                             <div className="text-sm text-gray-500">{appointment.user?.email}</div>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="text-sm text-gray-900">{appointment.serviceType}</div>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="text-sm text-gray-900">
//                               {new Date(appointment.preferredDate).toLocaleDateString()}
//                             </div>
//                             <div className="text-sm text-gray-500">{appointment.preferredTime}</div>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <select
//                               value={appointment.status}
//                               onChange={(e) => updateAppointmentStatus(appointment._id, e.target.value)}
//                               className="text-sm border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-1 text-gray-500 focus:ring-sky-500"
//                             >
//                               <option value="pending">Pending</option>
//                               <option value="confirmed">Confirmed</option>
//                               <option value="cancelled">Cancelled</option>
//                               <option value="completed">Completed</option>
//                             </select>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
//                             <button 
//                               onClick={() => deleteAppointment(appointment._id)}
//                               className="text-red-600 hover:text-red-900 px-3 py-1 border border-red-200 rounded hover:bg-red-50 transition duration-300"
//                             >
//                               Delete
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                       {recentAppointments.length === 0 && (
//                         <tr>
//                           <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
//                             No appointments found
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'users' && (
//             <div className="bg-white rounded-lg shadow-md">
//               <div className="p-4 sm:p-6 border-b border-gray-200">
//                 <h2 className="text-lg font-semibold text-gray-900">Patient Management</h2>
//               </div>
//               <div className="p-4 sm:p-6">
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Name
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Email
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Phone
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Last Visit
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Status
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {users.map((user) => (
//                         <tr 
//                           key={user._id} 
//                           className="hover:bg-gray-50 transition duration-300 cursor-pointer"
//                           onClick={() => openUserModal(user)}
//                         >
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="text-sm font-medium text-gray-900">
//                               {user.firstName} {user.lastName}
//                             </div>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="text-sm text-gray-900">{user.email}</div>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="text-sm text-gray-900">{user.cellPhone || 'N/A'}</div>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="text-sm text-gray-900">
//                               {user.lastVisit ? new Date(user.lastVisit).toLocaleDateString() : 'Never'}
//                             </div>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                               user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                             }`}>
//                               {user.status || 'active'}
//                             </span>
//                           </td>
//                         </tr>
//                       ))}
//                       {users.length === 0 && (
//                         <tr>
//                           <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
//                             No users found
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'reports' && (
//             <div className="bg-white rounded-lg shadow-md">
//               <div className="p-4 sm:p-6 border-b border-gray-200">
//                 <h2 className="text-lg font-semibold text-gray-900">Reports & Analytics</h2>
//               </div>
//               <div className="p-4 sm:p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                   <div className="border border-gray-200 rounded-lg p-6">
//                     <h3 className="font-semibold text-gray-900 mb-4">Appointments Overview</h3>
//                     <div className="space-y-4">
//                       <div className="flex justify-between items-center p-3 bg-sky-50 rounded-lg">
//                         <span className="text-sm font-medium text-sky-700">Total Appointments</span>
//                         <span className="text-lg font-bold text-sky-900">{calculatedStats.totalAppointments || 0}</span>
//                       </div>
//                       <div className="flex justify-between items-center p-3  bg-green-50 rounded-lg">
//                         <span className="text-sm font-medium text-green-700">Completed</span>
//                         <span className="text-lg font-bold text-green-900">{calculatedStats.completedAppointments || 0}</span>
//                       </div>
//                       <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
//                         <span className="text-sm font-medium text-yellow-700">Pending</span>
//                         <span className="text-lg font-bold text-yellow-900">{calculatedStats.pendingAppointments || 0}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="border border-gray-200 rounded-lg p-6">
//                     <h3 className="font-semibold text-gray-900 mb-4">Financial Summary</h3>
//                     <div className="space-y-4">
//                       <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
//                         <span className="text-sm font-medium text-red-700">Cancellation Rate</span>
//                         <span className="text-lg font-bold text-red-900">{calculatedStats.cancellationRate}%</span>
//                       </div>
//                       <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                         <span className="text-sm font-medium text-gray-700">Active Patients</span>
//                         <span className="text-lg font-bold text-gray-900">{calculatedStats.totalUsers || 0}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* User Detail Modal - Updated with lighter overlay */}
//         {isUserModalOpen && selectedUser && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//             {/* Lighter overlay - click to close */}
//             <div 
//               className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm transition-opacity duration-200"
//               onClick={closeUserModal}
//             ></div>
            
//             {/* Modal container */}
//             <div className="bg-white rounded-lg max-w-2xl w-full max-h-[85vh] overflow-y-auto relative shadow-xl border border-gray-200">
//               <div className="p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-xl font-bold text-gray-900">
//                     Patient Details
//                   </h2>
//                   <button
//                     onClick={closeUserModal}
//                     className="text-gray-400 hover:text-gray-600 transition duration-200 p-1 hover:bg-gray-100 rounded"
//                   >
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>

//               <div className="p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Personal Information */}
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
//                     <dl className="space-y-3">
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Full Name</dt>
//                         <dd className="text-sm text-gray-900">{selectedUser.firstName} {selectedUser.lastName}</dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Email</dt>
//                         <dd className="text-sm text-gray-900">{selectedUser.email}</dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Phone</dt>
//                         <dd className="text-sm text-gray-900">{selectedUser.cellPhone || 'N/A'}</dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Gender</dt>
//                         <dd className="text-sm text-gray-900">{selectedUser.gender || 'N/A'}</dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
//                         <dd className="text-sm text-gray-900">
//                           {selectedUser.dateOfBirth ? new Date(selectedUser.dateOfBirth).toLocaleDateString() : 'N/A'}
//                         </dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Age</dt>
//                         <dd className="text-sm text-gray-900">{selectedUser.age || 'N/A'}</dd>
//                       </div>
//                     </dl>
//                   </div>

//                   {/* Contact & Healthcare Information */}
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact & Healthcare</h3>
//                     <dl className="space-y-3">
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Address</dt>
//                         <dd className="text-sm text-gray-900">{selectedUser.address || 'N/A'}</dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Country</dt>
//                         <dd className="text-sm text-gray-900">{selectedUser.country || 'N/A'}</dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Postal Code</dt>
//                         <dd className="text-sm text-gray-900">{selectedUser.postalCode || 'N/A'}</dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Healthcare Number</dt>
//                         <dd className="text-sm text-gray-900">{selectedUser.healthcareNumber || 'N/A'}</dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Healthcare Province</dt>
//                         <dd className="text-sm text-gray-900">{selectedUser.healthcareProvince || 'N/A'}</dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Last Visit</dt>
//                         <dd className="text-sm text-gray-900">
//                           {selectedUser.lastVisit ? new Date(selectedUser.lastVisit).toLocaleDateString() : 'Never'}
//                         </dd>
//                       </div>
//                     </dl>
//                   </div>
//                 </div>

//                 {/* Account Information */}
//                 <div className="mt-6 pt-6 border-t border-gray-200">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
//                   <dl className="space-y-3">
//                     <div>
//                       <dt className="text-sm font-medium text-gray-500">Member Since</dt>
//                       <dd className="text-sm text-gray-900">
//                         {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : 'N/A'}
//                       </dd>
//                     </div>
//                     <div>
//                       <dt className="text-sm font-medium text-gray-500">Status</dt>
//                       <dd className="text-sm">
//                         <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                           selectedUser.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                         }`}>
//                           {selectedUser.status || 'active'}
//                         </span>
//                       </dd>
//                     </div>
//                   </dl>
//                 </div>

//                 <div className="mt-6 flex justify-end space-x-3">
//                   <button
//                     onClick={closeUserModal}
//                     className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200"
//                   >
//                     Close
//                   </button>
//                   {/* <button
//                     onClick={() => {
//                       // Add edit functionality here
//                       console.log('Edit user:', selectedUser);
//                     }}
//                     className="px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-lg hover:bg-sky-700 transition duration-200"
//                   >
//                     Edit Profile
//                   </button> */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </ProtectedRoute>
//   );
// }




// 'use client';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/hooks/useAuth';
// import ProtectedRoute from '@/components/ProtectedRoute';
// import { dashboardService } from '@/services/dashboardService';
// import { appointmentService } from '@/services/appointmentService';

// export default function AdminDashboard() {
//   const [stats, setStats] = useState({});
//   const [recentAppointments, setRecentAppointments] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [error, setError] = useState('');
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  
//   // Pagination states for users
//   const [usersPagination, setUsersPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     pages: 0
//   });
//   const [usersLoading, setUsersLoading] = useState(false);

//   const { user, loading: authLoading, isAuthenticated } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!authLoading && isAuthenticated) {
//       fetchDashboardData();
//     }
//   }, [authLoading, isAuthenticated]);

//   // Fetch users with pagination
//   const fetchUsers = async (page = 1, limit = 10) => {
//     try {
//       setUsersLoading(true);
//       const response = await dashboardService.getUsers({ page, limit });
      
//       if (response.success) {
//         setUsers(response.users || []);
//         setUsersPagination(response.pagination || {
//           page,
//           limit,
//           total: 0,
//           pages: 0
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       setError('Failed to load users');
//     } finally {
//       setUsersLoading(false);
//     }
//   };

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       setError('');
//       const [statsResponse, appointmentsResponse, usersResponse] = await Promise.all([
//         dashboardService.getAdminStats(),
//         appointmentService.getAllAppointments({ limit: 10 }),
//         dashboardService.getUsers({ limit: 10 })
//       ]);
      
//       setStats(statsResponse.stats || {});
//       setRecentAppointments(appointmentsResponse.appointments || []);
//       setUsers(usersResponse.users || []);
//       setUsersPagination(usersResponse.pagination || {
//         page: 1,
//         limit: 10,
//         total: 0,
//         pages: 0
//       });
//     } catch (error) {
//       console.error('Error fetching admin data:', error);
//       setError(error.response?.data?.message || 'Failed to load dashboard data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle page change for users
//   const handleUsersPageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= usersPagination.pages) {
//       fetchUsers(newPage, usersPagination.limit);
//     }
//   };

//   // Handle limit change for users
//   const handleUsersLimitChange = (newLimit) => {
//     fetchUsers(1, newLimit);
//   };

//   const updateAppointmentStatus = async (appointmentId, status) => {
//     try {
//       const response = await appointmentService.updateAppointmentStatus(appointmentId, status);
      
//       if (response.success) {
//         setRecentAppointments(prev => 
//           prev.map(apt => 
//             apt._id === appointmentId ? { ...apt, status } : apt
//           )
//         );
        
//         const statsResponse = await dashboardService.getAdminStats();
//         setStats(statsResponse.stats || {});
//       } else {
//         alert(response.message || 'Failed to update appointment');
//       }
//     } catch (error) {
//       console.error('Error updating appointment:', error);
//       alert(error.response?.data?.message || 'Error updating appointment status');
//     }
//   };

//   const deleteAppointment = async (appointmentId) => {
//     if (!confirm('Are you sure you want to delete this appointment? This action cannot be undone.')) return;

//     try {
//       const response = await appointmentService.cancelAppointment(appointmentId);
      
//       if (response.success) {
//         setRecentAppointments(prev => prev.filter(apt => apt._id !== appointmentId));
        
//         const statsResponse = await dashboardService.getAdminStats();
//         setStats(statsResponse.stats || {});
//       } else {
//         alert(response.message || 'Failed to delete appointment');
//       }
//     } catch (error) {
//       console.error('Error deleting appointment:', error);
//       alert(error.response?.data?.message || 'Error deleting appointment');
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'confirmed': return 'bg-green-100 text-green-800';
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'cancelled': return 'bg-red-100 text-red-800';
//       case 'completed': return 'bg-sky-100 text-sky-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const openUserModal = (user) => {
//     setSelectedUser(user);
//     setIsUserModalOpen(true);
//   };

//   const closeUserModal = () => {
//     setSelectedUser(null);
//     setIsUserModalOpen(false);
//   };

//   // Update the useEffect to fetch users when activeTab changes to 'users'
//   useEffect(() => {
//     if (activeTab === 'users' && users.length === 0) {
//       fetchUsers();
//     }
//   }, [activeTab]);

//   const calculatedStats = {
//     ...stats,
//     cancelledAppointments: stats.cancelledAppointments || 0,
//     upcomingAppointments: stats.upcomingAppointments || 0,
//     cancellationRate: stats.totalAppointments ? 
//       Math.round(((stats.cancelledAppointments || 0) / stats.totalAppointments) * 100) : 0,
//     newPatientsThisMonth: stats.newPatientsThisMonth || 0
//   };

//   if (authLoading || loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ProtectedRoute requireAdmin={true}>
//       <div className="min-h-screen bg-gray-50">
//         {/* Header */}
//         <div className="bg-white shadow">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center py-6">
//               <div>
//                 <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//                   Admin Dashboard
//                 </h1>
//                 <p className="text-gray-600 mt-1">Manage clinic operations and appointments</p>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <span className="text-sm text-gray-600 hidden sm:block">Welcome, {user?.firstName}</span>
//                 <div className="w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center text-white font-semibold">
//                   {user?.firstName?.charAt(0)}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Navigation Tabs */}
//         <div className="bg-white border-b">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <nav className="flex space-x-8 overflow-x-auto">
//               {['overview', 'appointments', 'users', 'reports'].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
//                     activeTab === tab
//                       ? 'border-sky-500 text-sky-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//                 >
//                   {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
//                 </button>
//               ))}
//             </nav>
//           </div>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//               {error}
//             </div>
//           </div>
//         )}

//         {/* Dashboard Content */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           {activeTab === 'overview' && (
//             <div className="space-y-6">
//               {/* Stats Cards */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//                 <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
//                   <div className="flex items-center">
//                     <div className="p-2 bg-sky-100 rounded-lg">
//                       <span className="text-sky-600 text-xl">📊</span>
//                     </div>
//                     <div className="ml-4">
//                       <p className="text-sm font-medium text-gray-600">Total Appointments</p>
//                       <p className="text-2xl font-bold text-gray-900">{calculatedStats.totalAppointments || 0}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
//                   <div className="flex items-center">
//                     <div className="p-2 bg-green-100 rounded-lg">
//                       <span className="text-green-600 text-xl">👥</span>
//                     </div>
//                     <div className="ml-4">
//                       <p className="text-sm font-medium text-gray-600">Total Patients</p>
//                       <p className="text-2xl font-bold text-gray-900">{calculatedStats.totalUsers || 0}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
//                   <div className="flex items-center">
//                     <div className="p-2 bg-yellow-100 rounded-lg">
//                       <span className="text-yellow-600 text-xl">⏳</span>
//                     </div>
//                     <div className="ml-4">
//                       <p className="text-sm font-medium text-gray-600">Pending</p>
//                       <p className="text-2xl font-bold text-gray-900">{calculatedStats.pendingAppointments || 0}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
//                   <div className="flex items-center">
//                     <div className="p-2 bg-purple-100 rounded-lg">
//                       <span className="text-purple-600 text-xl">💰</span>
//                     </div>
//                     <div className="ml-4">
//                       <p className="text-sm font-medium text-gray-600">Revenue</p>
//                       <p className="text-2xl font-bold text-gray-900">${calculatedStats.revenue || 0}</p>
//                     </div>
//                   </div>
//                 </div> */}
//               </div>

//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {/* Recent Appointments */}
//                 <div className="bg-white rounded-lg shadow-md">
//                   <div className="p-4 sm:p-6 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900">Recent Appointments</h2>
//                   </div>
//                   <div className="p-4 sm:p-6">
//                     <div className="space-y-4">
//                       {recentAppointments.slice(0, 5).map((appointment) => (
//                         <div key={appointment._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-300">
//                           <div className="flex-1">
//                             <p className="font-medium text-gray-900">
//                               {appointment.user?.firstName} {appointment.user?.lastName}
//                             </p>
//                             <p className="text-sm text-gray-600">{appointment.serviceType}</p>
//                             <p className="text-xs text-gray-500">
//                               {new Date(appointment.preferredDate).toLocaleDateString()} at {appointment.preferredTime}
//                             </p>
//                             <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${getStatusColor(appointment.status)}`}>
//                               {appointment.status}
//                             </span>
//                           </div>
//                           <div className="flex items-center space-x-2">
//                             <select
//                               value={appointment.status}
//                               onChange={(e) => updateAppointmentStatus(appointment._id, e.target.value)}
//                               className="text-xs border border-gray-300 text-gray-500 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-sky-500"
//                             >
//                               <option value="pending">Pending</option>
//                               <option value="confirmed">Confirmed</option>
//                               <option value="cancelled">Cancelled</option>
//                               <option value="completed">Completed</option>
//                             </select>
//                           </div>
//                         </div>
//                       ))}
//                       {recentAppointments.length === 0 && (
//                         <p className="text-center text-gray-500 py-4">No appointments found</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Quick Stats */}
//                 <div className="bg-white rounded-lg shadow-md">
//                   <div className="p-4 sm:p-6 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900">Quick Stats</h2>
//                   </div>
//                   <div className="p-4 sm:p-6">
//                     <div className="space-y-4">
//                       <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                         <span className="text-sm text-gray-600">Completed Appointments</span>
//                         <span className="font-semibold text-green-600">
//                           {calculatedStats.completedAppointments || 0}
//                         </span>
//                       </div>
//                       <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                         <span className="text-sm text-gray-600">Cancellation Rate</span>
//                         <span className="font-semibold text-orange-600">
//                           {calculatedStats.cancellationRate}%
//                         </span>
//                       </div>
//                       <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                         <span className="text-sm text-gray-600">Appointments Today</span>
//                         <span className="font-semibold text-sky-600">
//                           {recentAppointments.filter(apt => 
//                             new Date(apt.preferredDate).toDateString() === new Date().toDateString()
//                           ).length}
//                         </span>
//                       </div>
//                       <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                         <span className="text-sm text-gray-600">New Patients This Month</span>
//                         <span className="font-semibold text-purple-600">
//                           {calculatedStats.newPatientsThisMonth}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'appointments' && (
//             <div className="bg-white rounded-lg shadow-md">
//               <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
//                 <h2 className="text-lg font-semibold text-gray-900">All Appointments</h2>
//                 <button 
//                   onClick={fetchDashboardData}
//                   className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-sky-700 transition duration-300"
//                 >
//                   Refresh
//                 </button>
//               </div>
//               <div className="p-4 sm:p-6">
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Patient
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Service
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Date & Time
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Status
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {recentAppointments.map((appointment) => (
//                         <tr key={appointment._id} className="hover:bg-gray-50 transition duration-300">
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="text-sm font-medium text-gray-900">
//                               {appointment.user?.firstName} {appointment.user?.lastName}
//                             </div>
//                             <div className="text-sm text-gray-500">{appointment.user?.email}</div>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="text-sm text-gray-900">{appointment.serviceType}</div>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="text-sm text-gray-900">
//                               {new Date(appointment.preferredDate).toLocaleDateString()}
//                             </div>
//                             <div className="text-sm text-gray-500">{appointment.preferredTime}</div>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <select
//                               value={appointment.status}
//                               onChange={(e) => updateAppointmentStatus(appointment._id, e.target.value)}
//                               className="text-sm border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-1 text-gray-500 focus:ring-sky-500"
//                             >
//                               <option value="pending">Pending</option>
//                               <option value="confirmed">Confirmed</option>
//                               <option value="cancelled">Cancelled</option>
//                               <option value="completed">Completed</option>
//                             </select>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
//                             <button 
//                               onClick={() => deleteAppointment(appointment._id)}
//                               className="text-red-600 hover:text-red-900 px-3 py-1 border border-red-200 rounded hover:bg-red-50 transition duration-300"
//                             >
//                               Delete
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                       {recentAppointments.length === 0 && (
//                         <tr>
//                           <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
//                             No appointments found
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'users' && (
//             <div className="bg-white rounded-lg shadow-md">
//               <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
//                 <div>
//                   <h2 className="text-lg font-semibold text-gray-900">Patient Management</h2>
//                   <p className="text-sm text-gray-600 mt-1">
//                     Showing {users.length} of {usersPagination.total} patients
//                   </p>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   {/* Results per page selector */}
//                   <select
//                     value={usersPagination.limit}
//                     onChange={(e) => handleUsersLimitChange(parseInt(e.target.value))}
//                     className="text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
//                     disabled={usersLoading}
//                   >
//                     <option value="5">5 per page</option>
//                     <option value="10">10 per page</option>
//                     <option value="20">20 per page</option>
//                     <option value="50">50 per page</option>
//                   </select>
                  
//                   <button 
//                     onClick={() => fetchUsers(usersPagination.page, usersPagination.limit)}
//                     disabled={usersLoading}
//                     className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-sky-700 transition duration-300 disabled:opacity-50"
//                   >
//                     {usersLoading ? 'Loading...' : 'Refresh'}
//                   </button>
//                 </div>
//               </div>
              
//               <div className="p-4 sm:p-6">
//                 {usersLoading ? (
//                   <div className="text-center py-8">
//                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600 mx-auto"></div>
//                     <p className="mt-2 text-gray-600">Loading patients...</p>
//                   </div>
//                 ) : (
//                   <>
//                     <div className="overflow-x-auto">
//                       <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                           <tr>
//                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                               Name
//                             </th>
//                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                               Email
//                             </th>
//                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                               Phone
//                             </th>
//                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                               Last Visit
//                             </th>
//                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                               Status
//                             </th>
//                           </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                           {users.map((user) => (
//                             <tr 
//                               key={user._id} 
//                               className="hover:bg-gray-50 transition duration-300 cursor-pointer"
//                               onClick={() => openUserModal(user)}
//                             >
//                               <td className="px-4 py-4 whitespace-nowrap">
//                                 <div className="text-sm font-medium text-gray-900">
//                                   {user.firstName} {user.lastName}
//                                 </div>
//                               </td>
//                               <td className="px-4 py-4 whitespace-nowrap">
//                                 <div className="text-sm text-gray-900">{user.email}</div>
//                               </td>
//                               <td className="px-4 py-4 whitespace-nowrap">
//                                 <div className="text-sm text-gray-900">{user.cellPhone || 'N/A'}</div>
//                               </td>
//                               <td className="px-4 py-4 whitespace-nowrap">
//                                 <div className="text-sm text-gray-900">
//                                   {user.lastVisit ? new Date(user.lastVisit).toLocaleDateString() : 'Never'}
//                                 </div>
//                               </td>
//                               <td className="px-4 py-4 whitespace-nowrap">
//                                 <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                                   user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                                 }`}>
//                                   {user.status || 'active'}
//                                 </span>
//                               </td>
//                             </tr>
//                           ))}
//                           {users.length === 0 && (
//                             <tr>
//                               <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
//                                 No patients found
//                               </td>
//                             </tr>
//                           )}
//                         </tbody>
//                       </table>
//                     </div>

//                     {/* Pagination Controls */}
//                     {usersPagination.pages > 1 && (
//                       <div className="flex items-center justify-between mt-6 px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
//                         <div className="flex justify-between flex-1 sm:hidden">
//                           <button
//                             onClick={() => handleUsersPageChange(usersPagination.page - 1)}
//                             disabled={usersPagination.page === 1}
//                             className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                           >
//                             Previous
//                           </button>
//                           <button
//                             onClick={() => handleUsersPageChange(usersPagination.page + 1)}
//                             disabled={usersPagination.page === usersPagination.pages}
//                             className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                           >
//                             Next
//                           </button>
//                         </div>
//                         <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
//                           <div>
//                             <p className="text-sm text-gray-700">
//                               Showing <span className="font-medium">{(usersPagination.page - 1) * usersPagination.limit + 1}</span> to{' '}
//                               <span className="font-medium">
//                                 {Math.min(usersPagination.page * usersPagination.limit, usersPagination.total)}
//                               </span> of{' '}
//                               <span className="font-medium">{usersPagination.total}</span> results
//                             </p>
//                           </div>
//                           <div>
//                             <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
//                               <button
//                                 onClick={() => handleUsersPageChange(usersPagination.page - 1)}
//                                 disabled={usersPagination.page === 1}
//                                 className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
//                               >
//                                 <span className="sr-only">Previous</span>
//                                 <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                                   <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
//                                 </svg>
//                               </button>
                              
//                               {/* Page numbers */}
//                               {Array.from({ length: Math.min(5, usersPagination.pages) }, (_, i) => {
//                                 let pageNum;
//                                 if (usersPagination.pages <= 5) {
//                                   pageNum = i + 1;
//                                 } else if (usersPagination.page <= 3) {
//                                   pageNum = i + 1;
//                                 } else if (usersPagination.page >= usersPagination.pages - 2) {
//                                   pageNum = usersPagination.pages - 4 + i;
//                                 } else {
//                                   pageNum = usersPagination.page - 2 + i;
//                                 }

//                                 return (
//                                   <button
//                                     key={pageNum}
//                                     onClick={() => handleUsersPageChange(pageNum)}
//                                     className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
//                                       usersPagination.page === pageNum
//                                         ? 'z-10 bg-sky-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600'
//                                         : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
//                                     }`}
//                                   >
//                                     {pageNum}
//                                   </button>
//                                 );
//                               })}

//                               <button
//                                 onClick={() => handleUsersPageChange(usersPagination.page + 1)}
//                                 disabled={usersPagination.page === usersPagination.pages}
//                                 className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
//                               >
//                                 <span className="sr-only">Next</span>
//                                 <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                                   <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l4.5 4.25a.75.75 0 01-1.06.02z" clipRule="evenodd" />
//                                 </svg>
//                               </button>
//                             </nav>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             </div>
//           )}

//           {activeTab === 'reports' && (
//             <div className="bg-white rounded-lg shadow-md">
//               <div className="p-4 sm:p-6 border-b border-gray-200">
//                 <h2 className="text-lg font-semibold text-gray-900">Reports & Analytics</h2>
//               </div>
//               <div className="p-4 sm:p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                   <div className="border border-gray-200 rounded-lg p-6">
//                     <h3 className="font-semibold text-gray-900 mb-4">Appointments Overview</h3>
//                     <div className="space-y-4">
//                       <div className="flex justify-between items-center p-3 bg-sky-50 rounded-lg">
//                         <span className="text-sm font-medium text-sky-700">Total Appointments</span>
//                         <span className="text-lg font-bold text-sky-900">{calculatedStats.totalAppointments || 0}</span>
//                       </div>
//                       <div className="flex justify-between items-center p-3  bg-green-50 rounded-lg">
//                         <span className="text-sm font-medium text-green-700">Completed</span>
//                         <span className="text-lg font-bold text-green-900">{calculatedStats.completedAppointments || 0}</span>
//                       </div>
//                       <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
//                         <span className="text-sm font-medium text-yellow-700">Pending</span>
//                         <span className="text-lg font-bold text-yellow-900">{calculatedStats.pendingAppointments || 0}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="border border-gray-200 rounded-lg p-6">
//                     <h3 className="font-semibold text-gray-900 mb-4">Financial Summary</h3>
//                     <div className="space-y-4">
//                       <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
//                         <span className="text-sm font-medium text-red-700">Cancellation Rate</span>
//                         <span className="text-lg font-bold text-red-900">{calculatedStats.cancellationRate}%</span>
//                       </div>
//                       <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                         <span className="text-sm font-medium text-gray-700">Active Patients</span>
//                         <span className="text-lg font-bold text-gray-900">{calculatedStats.totalUsers || 0}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* User Detail Modal */}
//         {isUserModalOpen && selectedUser && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//             <div 
//               className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm transition-opacity duration-200"
//               onClick={closeUserModal}
//             ></div>
            
//             <div className="bg-white rounded-lg max-w-2xl w-full max-h-[85vh] overflow-y-auto relative shadow-xl border border-gray-200">
//               <div className="p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-xl font-bold text-gray-900">
//                     Patient Details
//                   </h2>
//                   <button
//                     onClick={closeUserModal}
//                     className="text-gray-400 hover:text-gray-600 transition duration-200 p-1 hover:bg-gray-100 rounded"
//                   >
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>

//               <div className="p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
//                     <dl className="space-y-3">
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Full Name</dt>
//                         <dd className="text-sm text-gray-900">{selectedUser.firstName} {selectedUser.lastName}</dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Email</dt>
//                         <dd className="text-sm text-gray-900">{selectedUser.email}</dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Phone</dt>
//                         <dd className="text-sm text-gray-900">{selectedUser.cellPhone || 'N/A'}</dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Gender</dt>
//                         <dd className="text-sm text-gray-900">{selectedUser.gender || 'N/A'}</dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
//                         <dd className="text-sm text-gray-900">
//                           {selectedUser.dateOfBirth ? new Date(selectedUser.dateOfBirth).toLocaleDateString() : 'N/A'}
//                         </dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Age</dt>
//                         <dd className="text-sm text-gray-900">{selectedUser.age || 'N/A'}</dd>
//                       </div>
//                     </dl>
//                   </div>

//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact & Healthcare</h3>
//                     <dl className="space-y-3">
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Address</dt>
//                         <dd className="text-sm text-gray-900">{selectedUser.address || 'N/A'}</dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Country</dt>
//                         <dd className="text-sm text-gray-900">{selectedUser.country || 'N/A'}</dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Postal Code</dt>
//                         <dd className="text-sm text-gray-900">{selectedUser.postalCode || 'N/A'}</dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Healthcare Number</dt>
//                         <dd className="text-sm text-gray-900">{selectedUser.healthcareNumber || 'N/A'}</dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Healthcare Province</dt>
//                         <dd className="text-sm text-gray-900">{selectedUser.healthcareProvince || 'N/A'}</dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Last Visit</dt>
//                         <dd className="text-sm text-gray-900">
//                           {selectedUser.lastVisit ? new Date(selectedUser.lastVisit).toLocaleDateString() : 'Never'}
//                         </dd>
//                       </div>
//                     </dl>
//                   </div>
//                 </div>

//                 <div className="mt-6 pt-6 border-t border-gray-200">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
//                   <dl className="space-y-3">
//                     <div>
//                       <dt className="text-sm font-medium text-gray-500">Member Since</dt>
//                       <dd className="text-sm text-gray-900">
//                         {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : 'N/A'}
//                       </dd>
//                     </div>
//                     <div>
//                       <dt className="text-sm font-medium text-gray-500">Status</dt>
//                       <dd className="text-sm">
//                         <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                           selectedUser.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                         }`}>
//                           {selectedUser.status || 'active'}
//                         </span>
//                       </dd>
//                     </div>
//                   </dl>
//                 </div>

//                 <div className="mt-6 flex justify-end space-x-3">
//                   <button
//                     onClick={closeUserModal}
//                     className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </ProtectedRoute>
//   );
// }




// 'use client';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/hooks/useAuth';
// import ProtectedRoute from '@/components/ProtectedRoute';
// import { dashboardService } from '@/services/dashboardService';
// import { appointmentService } from '@/services/appointmentService';

// // UserStatusDropdown Component
// const UserStatusDropdown = ({ user, onStatusChange }) => {
//   const [isUpdating, setIsUpdating] = useState(false);

//   const handleStatusChange = async (newStatus) => {
//     if (newStatus === user.status) return;
    
//     setIsUpdating(true);
//     try {
//       await onStatusChange(user._id, newStatus);
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Active': return 'bg-green-100 text-green-800 border-green-200';
//       case 'Booked': return 'bg-blue-100 text-blue-800 border-blue-200';
//       case 'Accepted': return 'bg-purple-100 text-purple-800 border-purple-200';
//       case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   return (
//     <div className="relative">
//       <select
//         value={user.status || 'Active'}
//         onChange={(e) => handleStatusChange(e.target.value)}
//         disabled={isUpdating}
//         className={`text-xs font-semibold rounded-full px-3 py-1 border focus:ring-2 focus:ring-sky-500 cursor-pointer transition-colors ${
//           getStatusColor(user.status || 'Active')
//         } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
//       >
//         <option value="Active">Active</option>
//         <option value="Booked">Booked</option>
//         <option value="Accepted">Accepted</option>
//         <option value="Rejected">Rejected</option>
//       </select>
//       {isUpdating && (
//         <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-full">
//           <div className="w-3 h-3 border border-sky-600 border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default function AdminDashboard() {
//   const [stats, setStats] = useState({});
//   const [recentAppointments, setRecentAppointments] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [error, setError] = useState('');
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  
//   // Pagination states for users
//   const [usersPagination, setUsersPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     pages: 0
//   });
//   const [usersLoading, setUsersLoading] = useState(false);

//   const { user, loading: authLoading, isAuthenticated } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!authLoading && isAuthenticated) {
//       fetchDashboardData();
//     }
//   }, [authLoading, isAuthenticated]);

//   // Fetch users with pagination
//   const fetchUsers = async (page = 1, limit = 10) => {
//     try {
//       setUsersLoading(true);
//       const response = await dashboardService.getUsers({ page, limit });
      
//       if (response.success) {
//         setUsers(response.users || []);
//         setUsersPagination(response.pagination || {
//           page,
//           limit,
//           total: 0,
//           pages: 0
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       setError('Failed to load users');
//     } finally {
//       setUsersLoading(false);
//     }
//   };

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       setError('');
//       const [statsResponse, appointmentsResponse, usersResponse] = await Promise.all([
//         dashboardService.getAdminStats(),
//         appointmentService.getAllAppointments({ limit: 10 }),
//         dashboardService.getUsers({ limit: 10 })
//       ]);
      
//       setStats(statsResponse.stats || {});
//       setRecentAppointments(appointmentsResponse.appointments || []);
//       setUsers(usersResponse.users || []);
//       setUsersPagination(usersResponse.pagination || {
//         page: 1,
//         limit: 10,
//         total: 0,
//         pages: 0
//       });
//     } catch (error) {
//       console.error('Error fetching admin data:', error);
//       setError(error.response?.data?.message || 'Failed to load dashboard data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle page change for users
//   const handleUsersPageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= usersPagination.pages) {
//       fetchUsers(newPage, usersPagination.limit);
//     }
//   };

//   // Handle limit change for users
//   const handleUsersLimitChange = (newLimit) => {
//     fetchUsers(1, newLimit);
//   };

//   // Handle user status change
//   const handleUserStatusChange = async (userId, newStatus) => {
//     try {
//       const response = await dashboardService.updateUserStatus(userId, newStatus);
      
//       if (response.success) {
//         // Update the user in the local state
//         setUsers(prevUsers => 
//           prevUsers.map(user => 
//             user._id === userId ? { ...user, status: newStatus } : user
//           )
//         );
        
//         // If the modal is open for this user, update it too
//         if (selectedUser && selectedUser._id === userId) {
//           setSelectedUser(prev => ({ ...prev, status: newStatus }));
//         }
        
//         // Show success message (optional)
//         console.log('User status updated successfully');
//       } else {
//         alert(response.message || 'Failed to update user status');
//       }
//     } catch (error) {
//       console.error('Error updating user status:', error);
//       alert(error.response?.data?.message || 'Error updating user status');
//     }
//   };

//   const updateAppointmentStatus = async (appointmentId, status) => {
//     try {
//       const response = await appointmentService.updateAppointmentStatus(appointmentId, status);
      
//       if (response.success) {
//         setRecentAppointments(prev => 
//           prev.map(apt => 
//             apt._id === appointmentId ? { ...apt, status } : apt
//           )
//         );
        
//         const statsResponse = await dashboardService.getAdminStats();
//         setStats(statsResponse.stats || {});
//       } else {
//         alert(response.message || 'Failed to update appointment');
//       }
//     } catch (error) {
//       console.error('Error updating appointment:', error);
//       alert(error.response?.data?.message || 'Error updating appointment status');
//     }
//   };

//   const deleteAppointment = async (appointmentId) => {
//     if (!confirm('Are you sure you want to delete this appointment? This action cannot be undone.')) return;

//     try {
//       const response = await appointmentService.cancelAppointment(appointmentId);
      
//       if (response.success) {
//         setRecentAppointments(prev => prev.filter(apt => apt._id !== appointmentId));
        
//         const statsResponse = await dashboardService.getAdminStats();
//         setStats(statsResponse.stats || {});
//       } else {
//         alert(response.message || 'Failed to delete appointment');
//       }
//     } catch (error) {
//       console.error('Error deleting appointment:', error);
//       alert(error.response?.data?.message || 'Error deleting appointment');
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'confirmed': return 'bg-green-100 text-green-800';
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'cancelled': return 'bg-red-100 text-red-800';
//       case 'completed': return 'bg-sky-100 text-sky-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const openUserModal = (user) => {
//     setSelectedUser(user);
//     setIsUserModalOpen(true);
//   };

//   const closeUserModal = () => {
//     setSelectedUser(null);
//     setIsUserModalOpen(false);
//   };

//   // Update the useEffect to fetch users when activeTab changes to 'users'
//   useEffect(() => {
//     if (activeTab === 'users' && users.length === 0) {
//       fetchUsers();
//     }
//   }, [activeTab]);

//   const calculatedStats = {
//     ...stats,
//     cancelledAppointments: stats.cancelledAppointments || 0,
//     upcomingAppointments: stats.upcomingAppointments || 0,
//     cancellationRate: stats.totalAppointments ? 
//       Math.round(((stats.cancelledAppointments || 0) / stats.totalAppointments) * 100) : 0,
//     newPatientsThisMonth: stats.newPatientsThisMonth || 0
//   };

//   if (authLoading || loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ProtectedRoute requireAdmin={true}>
//       <div className="min-h-screen bg-gray-50">
//         {/* Header */}
//         <div className="bg-white shadow">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center py-6">
//               <div>
//                 <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//                   Admin Dashboard
//                 </h1>
//                 <p className="text-gray-600 mt-1">Manage clinic operations and appointments</p>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <span className="text-sm text-gray-600 hidden sm:block">Welcome, {user?.firstName}</span>
//                 <div className="w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center text-white font-semibold">
//                   {user?.firstName?.charAt(0)}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Navigation Tabs */}
//         <div className="bg-white border-b">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <nav className="flex space-x-8 overflow-x-auto">
//               {['overview', 'appointments', 'users', 'reports'].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
//                     activeTab === tab
//                       ? 'border-sky-500 text-sky-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//                 >
//                   {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
//                 </button>
//               ))}
//             </nav>
//           </div>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//               {error}
//             </div>
//           </div>
//         )}

//         {/* Dashboard Content */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           {activeTab === 'overview' && (
//             <div className="space-y-6">
//               {/* Stats Cards */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//                 <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
//                   <div className="flex items-center">
//                     <div className="p-2 bg-sky-100 rounded-lg">
//                       <span className="text-sky-600 text-xl">📊</span>
//                     </div>
//                     <div className="ml-4">
//                       <p className="text-sm font-medium text-gray-600">Total Appointments</p>
//                       <p className="text-2xl font-bold text-gray-900">{calculatedStats.totalAppointments || 0}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
//                   <div className="flex items-center">
//                     <div className="p-2 bg-green-100 rounded-lg">
//                       <span className="text-green-600 text-xl">👥</span>
//                     </div>
//                     <div className="ml-4">
//                       <p className="text-sm font-medium text-gray-600">Total Patients</p>
//                       <p className="text-2xl font-bold text-gray-900">{calculatedStats.totalUsers || 0}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
//                   <div className="flex items-center">
//                     <div className="p-2 bg-yellow-100 rounded-lg">
//                       <span className="text-yellow-600 text-xl">⏳</span>
//                     </div>
//                     <div className="ml-4">
//                       <p className="text-sm font-medium text-gray-600">Pending</p>
//                       <p className="text-2xl font-bold text-gray-900">{calculatedStats.pendingAppointments || 0}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
//                   <div className="flex items-center">
//                     <div className="p-2 bg-purple-100 rounded-lg">
//                       <span className="text-purple-600 text-xl">💰</span>
//                     </div>
//                     <div className="ml-4">
//                       <p className="text-sm font-medium text-gray-600">Revenue</p>
//                       <p className="text-2xl font-bold text-gray-900">${calculatedStats.revenue || 0}</p>
//                     </div>
//                   </div>
//                 </div> */}
//               </div>

//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {/* Recent Appointments */}
//                 <div className="bg-white rounded-lg shadow-md">
//                   <div className="p-4 sm:p-6 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900">Recent Appointments</h2>
//                   </div>
//                   <div className="p-4 sm:p-6">
//                     <div className="space-y-4">
//                       {recentAppointments.slice(0, 5).map((appointment) => (
//                         <div key={appointment._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-300">
//                           <div className="flex-1">
//                             <p className="font-medium text-gray-900">
//                               {appointment.user?.firstName} {appointment.user?.lastName}
//                             </p>
//                             <p className="text-sm text-gray-600">{appointment.serviceType}</p>
//                             <p className="text-xs text-gray-500">
//                               {new Date(appointment.preferredDate).toLocaleDateString()} at {appointment.preferredTime}
//                             </p>
//                             <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${getStatusColor(appointment.status)}`}>
//                               {appointment.status}
//                             </span>
//                           </div>
//                           <div className="flex items-center space-x-2">
//                             <select
//                               value={appointment.status}
//                               onChange={(e) => updateAppointmentStatus(appointment._id, e.target.value)}
//                               className="text-xs border border-gray-300 text-gray-500 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-sky-500"
//                             >
//                               <option value="pending">Pending</option>
//                               <option value="confirmed">Confirmed</option>
//                               <option value="cancelled">Cancelled</option>
//                               <option value="completed">Completed</option>
//                             </select>
//                           </div>
//                         </div>
//                       ))}
//                       {recentAppointments.length === 0 && (
//                         <p className="text-center text-gray-500 py-4">No appointments found</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Quick Stats */}
//                 <div className="bg-white rounded-lg shadow-md">
//                   <div className="p-4 sm:p-6 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900">Quick Stats</h2>
//                   </div>
//                   <div className="p-4 sm:p-6">
//                     <div className="space-y-4">
//                       <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                         <span className="text-sm text-gray-600">Completed Appointments</span>
//                         <span className="font-semibold text-green-600">
//                           {calculatedStats.completedAppointments || 0}
//                         </span>
//                       </div>
//                       <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                         <span className="text-sm text-gray-600">Cancellation Rate</span>
//                         <span className="font-semibold text-orange-600">
//                           {calculatedStats.cancellationRate}%
//                         </span>
//                       </div>
//                       <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                         <span className="text-sm text-gray-600">Appointments Today</span>
//                         <span className="font-semibold text-sky-600">
//                           {recentAppointments.filter(apt => 
//                             new Date(apt.preferredDate).toDateString() === new Date().toDateString()
//                           ).length}
//                         </span>
//                       </div>
//                       <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                         <span className="text-sm text-gray-600">New Patients This Month</span>
//                         <span className="font-semibold text-purple-600">
//                           {calculatedStats.newPatientsThisMonth}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'appointments' && (
//             <div className="bg-white rounded-lg shadow-md">
//               <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
//                 <h2 className="text-lg font-semibold text-gray-900">All Appointments</h2>
//                 <button 
//                   onClick={fetchDashboardData}
//                   className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-sky-700 transition duration-300"
//                 >
//                   Refresh
//                 </button>
//               </div>
//               <div className="p-4 sm:p-6">
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Patient
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Service
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Date & Time
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Status
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {recentAppointments.map((appointment) => (
//                         <tr key={appointment._id} className="hover:bg-gray-50 transition duration-300">
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="text-sm font-medium text-gray-900">
//                               {appointment.user?.firstName} {appointment.user?.lastName}
//                             </div>
//                             <div className="text-sm text-gray-500">{appointment.user?.email}</div>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="text-sm text-gray-900">{appointment.serviceType}</div>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="text-sm text-gray-900">
//                               {new Date(appointment.preferredDate).toLocaleDateString()}
//                             </div>
//                             <div className="text-sm text-gray-500">{appointment.preferredTime}</div>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <select
//                               value={appointment.status}
//                               onChange={(e) => updateAppointmentStatus(appointment._id, e.target.value)}
//                               className="text-sm border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-1 text-gray-500 focus:ring-sky-500"
//                             >
//                               <option value="pending">Pending</option>
//                               <option value="confirmed">Confirmed</option>
//                               <option value="cancelled">Cancelled</option>
//                               <option value="completed">Completed</option>
//                             </select>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
//                             <button 
//                               onClick={() => deleteAppointment(appointment._id)}
//                               className="text-red-600 hover:text-red-900 px-3 py-1 border border-red-200 rounded hover:bg-red-50 transition duration-300"
//                             >
//                               Delete
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                       {recentAppointments.length === 0 && (
//                         <tr>
//                           <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
//                             No appointments found
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'users' && (
//             <div className="bg-white rounded-lg shadow-md">
//               <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
//                 <div>
//                   <h2 className="text-lg font-semibold text-gray-900">Patient Management</h2>
//                   <p className="text-sm text-gray-600 mt-1">
//                     Showing {users.length} of {usersPagination.total} patients
//                   </p>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   {/* Results per page selector */}
//                   <select
//                     value={usersPagination.limit}
//                     onChange={(e) => handleUsersLimitChange(parseInt(e.target.value))}
//                     className="text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
//                     disabled={usersLoading}
//                   >
//                     <option value="5">5 per page</option>
//                     <option value="10">10 per page</option>
//                     <option value="20">20 per page</option>
//                     <option value="50">50 per page</option>
//                   </select>
                  
//                   <button 
//                     onClick={() => fetchUsers(usersPagination.page, usersPagination.limit)}
//                     disabled={usersLoading}
//                     className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-sky-700 transition duration-300 disabled:opacity-50"
//                   >
//                     {usersLoading ? 'Loading...' : 'Refresh'}
//                   </button>
//                 </div>
//               </div>
              
//               <div className="p-4 sm:p-6">
//                 {usersLoading ? (
//                   <div className="text-center py-8">
//                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600 mx-auto"></div>
//                     <p className="mt-2 text-gray-600">Loading patients...</p>
//                   </div>
//                 ) : (
//                   <>
//                     <div className="overflow-x-auto">
//                       <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                           <tr>
//                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                               Name
//                             </th>
//                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                               Email
//                             </th>
//                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                               Phone
//                             </th>
//                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                               Last Visit
//                             </th>
//                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                               Status
//                             </th>
//                           </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                           {users.map((user) => (
//                             <tr 
//                               key={user._id} 
//                               className="hover:bg-gray-50 transition duration-300"
//                             >
//                               <td 
//                                 className="px-4 py-4 whitespace-nowrap cursor-pointer"
//                                 onClick={() => openUserModal(user)}
//                               >
//                                 <div className="text-sm font-medium text-gray-900">
//                                   {user.firstName} {user.lastName}
//                                 </div>
//                               </td>
//                               <td 
//                                 className="px-4 py-4 whitespace-nowrap cursor-pointer"
//                                 onClick={() => openUserModal(user)}
//                               >
//                                 <div className="text-sm text-gray-900">{user.email}</div>
//                               </td>
//                               <td 
//                                 className="px-4 py-4 whitespace-nowrap cursor-pointer"
//                                 onClick={() => openUserModal(user)}
//                               >
//                                 <div className="text-sm text-gray-900">{user.cellPhone || 'N/A'}</div>
//                               </td>
//                               <td 
//                                 className="px-4 py-4 whitespace-nowrap cursor-pointer"
//                                 onClick={() => openUserModal(user)}
//                               >
//                                 <div className="text-sm text-gray-900">
//                                   {user.lastVisit ? new Date(user.lastVisit).toLocaleDateString() : 'Never'}
//                                 </div>
//                               </td>
//                               <td className="px-4 py-4 whitespace-nowrap">
//                                 <UserStatusDropdown 
//                                   user={user} 
//                                   onStatusChange={handleUserStatusChange}
//                                 />
//                               </td>
//                             </tr>
//                           ))}
//                           {users.length === 0 && (
//                             <tr>
//                               <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
//                                 No patients found
//                               </td>
//                             </tr>
//                           )}
//                         </tbody>
//                       </table>
//                     </div>

//                     {/* Pagination Controls */}
//                     {usersPagination.pages > 1 && (
//                       <div className="flex items-center justify-between mt-6 px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
//                         <div className="flex justify-between flex-1 sm:hidden">
//                           <button
//                             onClick={() => handleUsersPageChange(usersPagination.page - 1)}
//                             disabled={usersPagination.page === 1}
//                             className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                           >
//                             Previous
//                           </button>
//                           <button
//                             onClick={() => handleUsersPageChange(usersPagination.page + 1)}
//                             disabled={usersPagination.page === usersPagination.pages}
//                             className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                           >
//                             Next
//                           </button>
//                         </div>
//                         <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
//                           <div>
//                             <p className="text-sm text-gray-700">
//                               Showing <span className="font-medium">{(usersPagination.page - 1) * usersPagination.limit + 1}</span> to{' '}
//                               <span className="font-medium">
//                                 {Math.min(usersPagination.page * usersPagination.limit, usersPagination.total)}
//                               </span> of{' '}
//                               <span className="font-medium">{usersPagination.total}</span> results
//                             </p>
//                           </div>
//                           <div>
//                             <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
//                               <button
//                                 onClick={() => handleUsersPageChange(usersPagination.page - 1)}
//                                 disabled={usersPagination.page === 1}
//                                 className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
//                               >
//                                 <span className="sr-only">Previous</span>
//                                 <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                                   <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
//                                 </svg>
//                               </button>
                              
//                               {/* Page numbers */}
//                               {Array.from({ length: Math.min(5, usersPagination.pages) }, (_, i) => {
//                                 let pageNum;
//                                 if (usersPagination.pages <= 5) {
//                                   pageNum = i + 1;
//                                 } else if (usersPagination.page <= 3) {
//                                   pageNum = i + 1;
//                                 } else if (usersPagination.page >= usersPagination.pages - 2) {
//                                   pageNum = usersPagination.pages - 4 + i;
//                                 } else {
//                                   pageNum = usersPagination.page - 2 + i;
//                                 }

//                                 return (
//                                   <button
//                                     key={pageNum}
//                                     onClick={() => handleUsersPageChange(pageNum)}
//                                     className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
//                                       usersPagination.page === pageNum
//                                         ? 'z-10 bg-sky-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600'
//                                         : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
//                                     }`}
//                                   >
//                                     {pageNum}
//                                   </button>
//                                 );
//                               })}

//                               <button
//                                 onClick={() => handleUsersPageChange(usersPagination.page + 1)}
//                                 disabled={usersPagination.page === usersPagination.pages}
//                                 className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
//                               >
//                                 <span className="sr-only">Next</span>
//                                 <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                                   <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l4.5 4.25a.75.75 0 01-1.06.02z" clipRule="evenodd" />
//                                 </svg>
//                               </button>
//                             </nav>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             </div>
//           )}

//           {activeTab === 'reports' && (
//             <div className="bg-white rounded-lg shadow-md">
//               <div className="p-4 sm:p-6 border-b border-gray-200">
//                 <h2 className="text-lg font-semibold text-gray-900">Reports & Analytics</h2>
//               </div>
//               <div className="p-4 sm:p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                   <div className="border border-gray-200 rounded-lg p-6">
//                     <h3 className="font-semibold text-gray-900 mb-4">Appointments Overview</h3>
//                     <div className="space-y-4">
//                       <div className="flex justify-between items-center p-3 bg-sky-50 rounded-lg">
//                         <span className="text-sm font-medium text-sky-700">Total Appointments</span>
//                         <span className="text-lg font-bold text-sky-900">{calculatedStats.totalAppointments || 0}</span>
//                       </div>
//                       <div className="flex justify-between items-center p-3  bg-green-50 rounded-lg">
//                         <span className="text-sm font-medium text-green-700">Completed</span>
//                         <span className="text-lg font-bold text-green-900">{calculatedStats.completedAppointments || 0}</span>
//                       </div>
//                       <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
//                         <span className="text-sm font-medium text-yellow-700">Pending</span>
//                         <span className="text-lg font-bold text-yellow-900">{calculatedStats.pendingAppointments || 0}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="border border-gray-200 rounded-lg p-6">
//                     <h3 className="font-semibold text-gray-900 mb-4">Financial Summary</h3>
//                     <div className="space-y-4">
//                       <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
//                         <span className="text-sm font-medium text-red-700">Cancellation Rate</span>
//                         <span className="text-lg font-bold text-red-900">{calculatedStats.cancellationRate}%</span>
//                       </div>
//                       <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                         <span className="text-sm font-medium text-gray-700">Active Patients</span>
//                         <span className="text-lg font-bold text-gray-900">{calculatedStats.totalUsers || 0}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* User Detail Modal */}
//         {isUserModalOpen && selectedUser && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//             <div 
//               className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm transition-opacity duration-200"
//               onClick={closeUserModal}
//             ></div>
            
//             <div className="bg-white rounded-lg max-w-2xl w-full max-h-[85vh] overflow-y-auto relative shadow-xl border border-gray-200">
//               <div className="p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-xl font-bold text-gray-900">
//                     Patient Details
//                   </h2>
//                   <button
//                     onClick={closeUserModal}
//                     className="text-gray-400 hover:text-gray-600 transition duration-200 p-1 hover:bg-gray-100 rounded"
//                   >
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>

//               <div className="p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
//                     <dl className="space-y-3">
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Full Name</dt>
//                         <dd className="text-sm text-gray-900">{selectedUser.firstName} {selectedUser.lastName}</dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Email</dt>
//                         <dd className="text-sm text-gray-900">{selectedUser.email}</dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Phone</dt>
//                         <dd className="text-sm text-gray-900">{selectedUser.cellPhone || 'N/A'}</dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Gender</dt>
//                         <dd className="text-sm text-gray-900">{selectedUser.gender || 'N/A'}</dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
//                         <dd className="text-sm text-gray-900">
//                           {selectedUser.dateOfBirth ? new Date(selectedUser.dateOfBirth).toLocaleDateString() : 'N/A'}
//                         </dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Age</dt>
//                         <dd className="text-sm text-gray-900">{selectedUser.age || 'N/A'}</dd>
//                       </div>
//                     </dl>
//                   </div>

//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact & Healthcare</h3>
//                     <dl className="space-y-3">
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Address</dt>
//                         <dd className="text-sm text-gray-900">{selectedUser.address || 'N/A'}</dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Country</dt>
//                         <dd className="text-sm text-gray-900">{selectedUser.country || 'N/A'}</dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Postal Code</dt>
//                         <dd className="text-sm text-gray-900">{selectedUser.postalCode || 'N/A'}</dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Healthcare Number</dt>
//                         <dd className="text-sm text-gray-900">{selectedUser.healthcareNumber || 'N/A'}</dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Healthcare Province</dt>
//                         <dd className="text-sm text-gray-900">{selectedUser.healthcareProvince || 'N/A'}</dd>
//                       </div>
//                       <div>
//                         <dt className="text-sm font-medium text-gray-500">Last Visit</dt>
//                         <dd className="text-sm text-gray-900">
//                           {selectedUser.lastVisit ? new Date(selectedUser.lastVisit).toLocaleDateString() : 'Never'}
//                         </dd>
//                       </div>
//                     </dl>
//                   </div>
//                 </div>

//                 <div className="mt-6 pt-6 border-t border-gray-200">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
//                   <dl className="space-y-3">
//                     <div>
//                       <dt className="text-sm font-medium text-gray-500">Member Since</dt>
//                       <dd className="text-sm text-gray-900">
//                         {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : 'N/A'}
//                       </dd>
//                     </div>
//                     <div>
//                       <dt className="text-sm font-medium text-gray-500">Status</dt>
//                       <dd className="text-sm mt-1">
//                         <UserStatusDropdown 
//                           user={selectedUser} 
//                           onStatusChange={handleUserStatusChange}
//                         />
//                       </dd>
//                     </div>
//                   </dl>
//                 </div>

//                 <div className="mt-6 flex justify-end space-x-3">
//                   <button
//                     onClick={closeUserModal}
//                     className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </ProtectedRoute>
//   );
// }





'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/ProtectedRoute';
import { dashboardService } from '@/services/dashboardService';
import { appointmentService } from '@/services/appointmentService';

// UserStatusDropdown Component
const UserStatusDropdown = ({ user, onStatusChange }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus) => {
    if (newStatus === user.status) return;
    
    setIsUpdating(true);
    try {
      await onStatusChange(user._id, newStatus);
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
        value={user.status || 'Active'}
        onChange={(e) => handleStatusChange(e.target.value)}
        disabled={isUpdating}
        className={`text-xs font-semibold rounded-full px-3 py-1 border focus:ring-2 focus:ring-sky-500 cursor-pointer transition-colors ${
          getStatusColor(user.status || 'Active')
        } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <option value="Active">Active</option>
        <option value="Booked">Booked</option>
        <option value="Accepted">Accepted</option>
        <option value="Rejected">Rejected</option>
      </select>
      {isUpdating && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-full">
          <div className="w-3 h-3 border border-sky-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

// MonthlyChart Component for reports
const MonthlyChart = ({ data, year, title }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const maxValue = Math.max(...data, 1); // Avoid division by zero

  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium text-gray-700 mb-3">{title} - {year}</h4>
      <div className="flex items-end justify-between space-x-1 h-32">
        {data.map((value, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="text-xs text-gray-500 mb-1">{value}</div>
            <div
              className="bg-sky-500 w-full rounded-t transition-all duration-300 hover:bg-sky-600"
              style={{ height: `${(value / maxValue) * 80}%` }}
              title={`${months[index]}: ${value}`}
            ></div>
            <div className="text-xs text-gray-500 mt-1">{months[index]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// StatusProgress Component for visual status distribution
const StatusProgress = ({ statusData, total }) => {
  const statusColors = {
    Active: 'bg-green-500',
    Booked: 'bg-blue-500',
    Accepted: 'bg-purple-500',
    Rejected: 'bg-red-500'
  };

  return (
    <div className="space-y-2">
      {Object.entries(statusData).map(([status, count]) => {
        const percentage = total > 0 ? (count / total) * 100 : 0;
        return (
          <div key={status} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${statusColors[status]}`}></div>
              <span className="text-sm font-medium text-gray-700">{status}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-900">{count}</span>
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${statusColors[status]} transition-all duration-300`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 w-8">{Math.round(percentage)}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [activeTab, setActiveTab] = useState('overview');
  const [activeTab, setActiveTab] = useState('users');
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  
  // Pagination states for users
  const [usersPagination, setUsersPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [usersLoading, setUsersLoading] = useState(false);

  // Reports states
  const [reportsData, setReportsData] = useState(null);
  const [reportsOverview, setReportsOverview] = useState(null);
  const [reportsLoading, setReportsLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      fetchDashboardData();
    }
  }, [authLoading, isAuthenticated]);

  // Fetch users with pagination
  const fetchUsers = async (page = 1, limit = 10) => {
    try {
      setUsersLoading(true);
      const response = await dashboardService.getUsers({ page, limit });
      
      if (response.success) {
        setUsers(response.users || []);
        setUsersPagination(response.pagination || {
          page,
          limit,
          total: 0,
          pages: 0
        });
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users');
    } finally {
      setUsersLoading(false);
    }
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      const [statsResponse, appointmentsResponse, usersResponse] = await Promise.all([
        dashboardService.getAdminStats(),
        appointmentService.getAllAppointments({ limit: 10 }),
        dashboardService.getUsers({ limit: 10 })
      ]);
      
      setStats(statsResponse.stats || {});
      setRecentAppointments(appointmentsResponse.appointments || []);
      setUsers(usersResponse.users || []);
      setUsersPagination(usersResponse.pagination || {
        page: 1,
        limit: 10,
        total: 0,
        pages: 0
      });
    } catch (error) {
      console.error('Error fetching admin data:', error);
      setError(error.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch monthly reports
  const fetchMonthlyReports = async (month = selectedMonth, year = selectedYear) => {
    try {
      setReportsLoading(true);
      const response = await dashboardService.getMonthlyReports(year, month);
      
      if (response.success) {
        setReportsData(response.report);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      setError('Failed to load reports');
    } finally {
      setReportsLoading(false);
    }
  };

  const fetchReportsOverview = async () => {
    try {
      const response = await dashboardService.getReportsOverview();
      
      if (response.success) {
        setReportsOverview(response.overview);
      }
    } catch (error) {
      console.error('Error fetching reports overview:', error);
    }
  };

  // Handle page change for users
  const handleUsersPageChange = (newPage) => {
    if (newPage >= 1 && newPage <= usersPagination.pages) {
      fetchUsers(newPage, usersPagination.limit);
    }
  };

  // Handle limit change for users
  const handleUsersLimitChange = (newLimit) => {
    fetchUsers(1, newLimit);
  };

  // Handle period change for reports
  const handlePeriodChange = (newMonth, newYear) => {
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
    fetchMonthlyReports(newMonth, newYear);
  };

  // Handle user status change
  const handleUserStatusChange = async (userId, newStatus) => {
    try {
      const response = await dashboardService.updateUserStatus(userId, newStatus);
      
      if (response.success) {
        // Update the user in the local state
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user._id === userId ? { ...user, status: newStatus } : user
          )
        );
        
        // If the modal is open for this user, update it too
        if (selectedUser && selectedUser._id === userId) {
          setSelectedUser(prev => ({ ...prev, status: newStatus }));
        }
        
        // Show success message (optional)
        console.log('User status updated successfully');
      } else {
        alert(response.message || 'Failed to update user status');
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      alert(error.response?.data?.message || 'Error updating user status');
    }
  };

  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      const response = await appointmentService.updateAppointmentStatus(appointmentId, status);
      
      if (response.success) {
        setRecentAppointments(prev => 
          prev.map(apt => 
            apt._id === appointmentId ? { ...apt, status } : apt
          )
        );
        
        const statsResponse = await dashboardService.getAdminStats();
        setStats(statsResponse.stats || {});
      } else {
        alert(response.message || 'Failed to update appointment');
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
      alert(error.response?.data?.message || 'Error updating appointment status');
    }
  };

  const deleteAppointment = async (appointmentId) => {
    if (!confirm('Are you sure you want to delete this appointment? This action cannot be undone.')) return;

    try {
      const response = await appointmentService.cancelAppointment(appointmentId);
      
      if (response.success) {
        setRecentAppointments(prev => prev.filter(apt => apt._id !== appointmentId));
        
        const statsResponse = await dashboardService.getAdminStats();
        setStats(statsResponse.stats || {});
      } else {
        alert(response.message || 'Failed to delete appointment');
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
      alert(error.response?.data?.message || 'Error deleting appointment');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-sky-100 text-sky-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openUserModal = (user) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const closeUserModal = () => {
    setSelectedUser(null);
    setIsUserModalOpen(false);
  };

  // Update the useEffect to fetch data when activeTab changes
  useEffect(() => {
    if (activeTab === 'users' && users.length === 0) {
      fetchUsers();
    }
    if (activeTab === 'reports') {
      if (!reportsData) {
        fetchMonthlyReports();
      }
      if (!reportsOverview) {
        fetchReportsOverview();
      }
    }
  }, [activeTab]);

  const calculatedStats = {
    ...stats,
    cancelledAppointments: stats.cancelledAppointments || 0,
    upcomingAppointments: stats.upcomingAppointments || 0,
    cancellationRate: stats.totalAppointments ? 
      Math.round(((stats.cancelledAppointments || 0) / stats.totalAppointments) * 100) : 0,
    newPatientsThisMonth: stats.newPatientsThisMonth || 0
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600 mt-1">Manage clinic operations and appointments</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 hidden sm:block">Welcome, {user?.firstName}</span>
                <div className="w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.firstName?.charAt(0)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8 overflow-x-auto">
              {/* {['overview', 'appointments', 'users', 'reports'].map((tab) => ( */}
                {['users', 'reports'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-sky-500 text-sky-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          </div>
        )}

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <div className="p-2 bg-sky-100 rounded-lg">
                      <span className="text-sky-600 text-xl">📊</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Appointments</p>
                      <p className="text-2xl font-bold text-gray-900">{calculatedStats.totalAppointments || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <span className="text-green-600 text-xl">👥</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Patients</p>
                      <p className="text-2xl font-bold text-gray-900">{calculatedStats.totalUsers || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <span className="text-yellow-600 text-xl">⏳</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Pending</p>
                      <p className="text-2xl font-bold text-gray-900">{calculatedStats.pendingAppointments || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <span className="text-purple-600 text-xl">✅</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Completed</p>
                      <p className="text-2xl font-bold text-gray-900">{calculatedStats.completedAppointments || 0}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Appointments */}
                <div className="bg-white rounded-lg shadow-md">
                  <div className="p-4 sm:p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Appointments</h2>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="space-y-4">
                      {recentAppointments.slice(0, 5).map((appointment) => (
                        <div key={appointment._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-300">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">
                              {appointment.user?.firstName} {appointment.user?.lastName}
                            </p>
                            <p className="text-sm text-gray-600">{appointment.serviceType}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(appointment.preferredDate).toLocaleDateString()} at {appointment.preferredTime}
                            </p>
                            <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <select
                              value={appointment.status}
                              onChange={(e) => updateAppointmentStatus(appointment._id, e.target.value)}
                              className="text-xs border border-gray-300 text-gray-500 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-sky-500"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="cancelled">Cancelled</option>
                              <option value="completed">Completed</option>
                            </select>
                          </div>
                        </div>
                      ))}
                      {recentAppointments.length === 0 && (
                        <p className="text-center text-gray-500 py-4">No appointments found</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white rounded-lg shadow-md">
                  <div className="p-4 sm:p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Quick Stats</h2>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Completed Appointments</span>
                        <span className="font-semibold text-green-600">
                          {calculatedStats.completedAppointments || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Cancellation Rate</span>
                        <span className="font-semibold text-orange-600">
                          {calculatedStats.cancellationRate}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Appointments Today</span>
                        <span className="font-semibold text-sky-600">
                          {recentAppointments.filter(apt => 
                            new Date(apt.preferredDate).toDateString() === new Date().toDateString()
                          ).length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">New Patients This Month</span>
                        <span className="font-semibold text-purple-600">
                          {calculatedStats.newPatientsThisMonth}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">All Appointments</h2>
                <button 
                  onClick={fetchDashboardData}
                  className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-sky-700 transition duration-300"
                >
                  Refresh
                </button>
              </div>
              <div className="p-4 sm:p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Patient
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Service
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentAppointments.map((appointment) => (
                        <tr key={appointment._id} className="hover:bg-gray-50 transition duration-300">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {appointment.user?.firstName} {appointment.user?.lastName}
                            </div>
                            <div className="text-sm text-gray-500">{appointment.user?.email}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{appointment.serviceType}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(appointment.preferredDate).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-gray-500">{appointment.preferredTime}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <select
                              value={appointment.status}
                              onChange={(e) => updateAppointmentStatus(appointment._id, e.target.value)}
                              className="text-sm border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-1 text-gray-500 focus:ring-sky-500"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="cancelled">Cancelled</option>
                              <option value="completed">Completed</option>
                            </select>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                            <button 
                              onClick={() => deleteAppointment(appointment._id)}
                              className="text-red-600 hover:text-red-900 px-3 py-1 border border-red-200 rounded hover:bg-red-50 transition duration-300"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                      {recentAppointments.length === 0 && (
                        <tr>
                          <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                            No appointments found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Patient Management</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Showing {users.length} of {usersPagination.total} patients
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  {/* Results per page selector */}
                  <select
                    value={usersPagination.limit}
                    onChange={(e) => handleUsersLimitChange(parseInt(e.target.value))}
                    className="text-sm text-gray-600 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    disabled={usersLoading}
                  >
                    <option value="5">5 per page</option>
                    <option value="10">10 per page</option>
                    <option value="20">20 per page</option>
                    <option value="50">50 per page</option>
                  </select>
                  
                  <button 
                    onClick={() => fetchUsers(usersPagination.page, usersPagination.limit)}
                    disabled={usersLoading}
                    className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-sky-700 transition duration-300 disabled:opacity-50"
                  >
                    {usersLoading ? 'Loading...' : 'Refresh'}
                  </button>
                </div>
              </div>
              
              <div className="p-4 sm:p-6">
                {usersLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading patients...</p>
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Email
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Phone
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Last Visit
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {users.map((user) => (
                            <tr 
                              key={user._id} 
                              className="hover:bg-gray-50 transition duration-300"
                            >
                              <td 
                                className="px-4 py-4 whitespace-nowrap cursor-pointer"
                                onClick={() => openUserModal(user)}
                              >
                                <div className="text-sm font-medium text-gray-900">
                                  {user.firstName} {user.lastName}
                                </div>
                              </td>
                              <td 
                                className="px-4 py-4 whitespace-nowrap cursor-pointer"
                                onClick={() => openUserModal(user)}
                              >
                                <div className="text-sm text-gray-900">{user.email}</div>
                              </td>
                              <td 
                                className="px-4 py-4 whitespace-nowrap cursor-pointer"
                                onClick={() => openUserModal(user)}
                              >
                                <div className="text-sm text-gray-900">{user.cellPhone || 'N/A'}</div>
                              </td>
                              <td 
                                className="px-4 py-4 whitespace-nowrap cursor-pointer"
                                onClick={() => openUserModal(user)}
                              >
                                <div className="text-sm text-gray-900">
                                  {user.lastVisit ? new Date(user.lastVisit).toLocaleDateString() : 'Never'}
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <UserStatusDropdown 
                                  user={user} 
                                  onStatusChange={handleUserStatusChange}
                                />
                              </td>
                            </tr>
                          ))}
                          {users.length === 0 && (
                            <tr>
                              <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                                No patients found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination Controls */}
                    {usersPagination.pages > 1 && (
                      <div className="flex items-center justify-between mt-6 px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
                        <div className="flex justify-between flex-1 sm:hidden">
                          <button
                            onClick={() => handleUsersPageChange(usersPagination.page - 1)}
                            disabled={usersPagination.page === 1}
                            className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Previous
                          </button>
                          <button
                            onClick={() => handleUsersPageChange(usersPagination.page + 1)}
                            disabled={usersPagination.page === usersPagination.pages}
                            className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Next
                          </button>
                        </div>
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                          <div>
                            <p className="text-sm text-gray-700">
                              Showing <span className="font-medium">{(usersPagination.page - 1) * usersPagination.limit + 1}</span> to{' '}
                              <span className="font-medium">
                                {Math.min(usersPagination.page * usersPagination.limit, usersPagination.total)}
                              </span> of{' '}
                              <span className="font-medium">{usersPagination.total}</span> results
                            </p>
                          </div>
                          <div>
                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                              <button
                                onClick={() => handleUsersPageChange(usersPagination.page - 1)}
                                disabled={usersPagination.page === 1}
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <span className="sr-only">Previous</span>
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                                </svg>
                              </button>
                              
                              {/* Page numbers */}
                              {Array.from({ length: Math.min(5, usersPagination.pages) }, (_, i) => {
                                let pageNum;
                                if (usersPagination.pages <= 5) {
                                  pageNum = i + 1;
                                } else if (usersPagination.page <= 3) {
                                  pageNum = i + 1;
                                } else if (usersPagination.page >= usersPagination.pages - 2) {
                                  pageNum = usersPagination.pages - 4 + i;
                                } else {
                                  pageNum = usersPagination.page - 2 + i;
                                }

                                return (
                                  <button
                                    key={pageNum}
                                    onClick={() => handleUsersPageChange(pageNum)}
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                      usersPagination.page === pageNum
                                        ? 'z-10 bg-sky-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600'
                                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                    }`}
                                  >
                                    {pageNum}
                                  </button>
                                );
                              })}

                              <button
                                onClick={() => handleUsersPageChange(usersPagination.page + 1)}
                                disabled={usersPagination.page === usersPagination.pages}
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <span className="sr-only">Next</span>
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l4.5 4.25a.75.75 0 01-1.06.02z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </nav>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
  <div className="space-y-6">
    {/* Reports Header with Date Selector */}
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Monthly Reports & Analytics</h2>
          <p className="text-gray-600 mt-1">Track patient registrations and status distribution</p>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedMonth}
            onChange={(e) => handlePeriodChange(parseInt(e.target.value), selectedYear)}
            className="border text-gray-600 border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <select
            value={selectedYear}
            onChange={(e) => handlePeriodChange(selectedMonth, parseInt(e.target.value))}
            className="border text-gray-600 border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</option>
            <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
          </select>
          <button
            onClick={() => fetchMonthlyReports()}
            disabled={reportsLoading}
            className="bg-sky-600 text-white px-4 py-2 rounded text-sm hover:bg-sky-700 transition duration-300 disabled:opacity-50"
          >
            {reportsLoading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Current Month Overview */}
      <div className="lg:col-span-2 space-y-6">
        {/* Monthly Summary */}
        {reportsLoading ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading report data...</p>
          </div>
        ) : reportsData ? (
          <>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {reportsData.period.monthName} {reportsData.period.year} Summary
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-700 font-medium">New Patients</p>
                  <p className="text-2xl font-bold text-blue-900">{reportsData.newPatients}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-700 font-medium">Active</p>
                  <p className="text-2xl font-bold text-green-900">{reportsData.usersByStatus.Active}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-700 font-medium">Accepted</p>
                  <p className="text-2xl font-bold text-purple-900">{reportsData.usersByStatus.Accepted}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-red-700 font-medium">Rejected</p>
                  <p className="text-2xl font-bold text-red-900">{reportsData.usersByStatus.Rejected}</p>
                </div>
              </div>

              {/* Additional Status Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <p className="text-sm text-indigo-700 font-medium">Booked</p>
                  <p className="text-2xl font-bold text-indigo-900">{reportsData.usersByStatus.Booked}</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-sm text-orange-700 font-medium">Total Appointments</p>
                  <p className="text-2xl font-bold text-orange-900">
                    {reportsData.appointments?.total || 0}
                  </p>
                </div>
                <div className="bg-cyan-50 p-4 rounded-lg">
                  <p className="text-sm text-cyan-700 font-medium">Completion Rate</p>
                  <p className="text-2xl font-bold text-cyan-900">
                    {reportsData.appointments?.total > 0 ? 
                      Math.round(((reportsData.appointments.byStatus?.completed || 0) / reportsData.appointments.total) * 100) : 0
                    }%
                  </p>
                </div>
              </div>

              {/* Status Distribution */}
              <div className="mt-6">
                <h4 className="text-md font-semibold text-gray-900 mb-3">Patient Status Distribution</h4>
                <StatusProgress 
                  statusData={reportsData.usersByStatus} 
                  total={reportsData.newPatients} 
                />
              </div>
            </div>

            {/* Monthly Trends */}
            {reportsOverview && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Registration Trends</h3>
                <MonthlyChart 
                  data={reportsOverview.monthlyRegistrations} 
                  year={reportsOverview.currentYear}
                  title="Patient Registrations"
                />
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500">No report data available</p>
          </div>
        )}
      </div>

      {/* Reports Sidebar */}
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            {reportsData && (
              <>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium text-green-700">Acceptance Rate</span>
                  <span className="text-lg font-bold text-green-900">
                    {reportsData.summary?.acceptanceRate || 0}%
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="text-sm font-medium text-red-700">Rejection Rate</span>
                  <span className="text-lg font-bold text-red-900">
                    {reportsData.summary?.rejectionRate || 0}%
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-blue-700">Active Rate</span>
                  <span className="text-lg font-bold text-blue-900">
                    {reportsData.newPatients > 0 ? 
                      Math.round(((reportsData.usersByStatus.Active || 0) / reportsData.newPatients) * 100) : 0
                    }%
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm font-medium text-purple-700">Booking Rate</span>
                  <span className="text-lg font-bold text-purple-900">
                    {reportsData.newPatients > 0 ? 
                      Math.round(((reportsData.usersByStatus.Booked || 0) / reportsData.newPatients) * 100) : 0
                    }%
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Current Month Overview */}
        {/* {reportsOverview && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Month Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">New Patients</span>
                <span className="font-semibold text-gray-900">
                  {reportsOverview.currentMonth?.patients || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Accepted</span>
                <span className="font-semibold text-gray-900">
                  {reportsOverview.currentMonth?.accepted || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Appointments</span>
                <span className="font-semibold text-gray-900">
                  {reportsOverview.currentMonth?.appointments || 0}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="text-sm text-gray-600">Acceptance Rate</span>
                <span className="font-semibold text-green-600">
                  {reportsOverview.currentMonth?.acceptanceRate || 0}%
                </span>
              </div>
            </div>
          </div>
        )} */}

        {/* Export Options */}
        {/* <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Reports</h3>
          <div className="space-y-3">
            <button className="w-full bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition duration-300">
              Download PDF Report
            </button>
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition duration-300">
              Export to Excel
            </button>
            <button className="w-full bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-700 transition duration-300">
              Print Summary
            </button>
          </div>
        </div> */}

        {/* Help Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Guide</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• <strong>Active:</strong> New patients awaiting action</p>
            <p>• <strong>Booked:</strong> Patients with appointments</p>
            <p>• <strong>Accepted:</strong> Approved patients</p>
            <p>• <strong>Rejected:</strong> Declined patients</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
        </div>

        {/* User Detail Modal */}
        {isUserModalOpen && selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm transition-opacity duration-200"
              onClick={closeUserModal}
            ></div>
            
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[85vh] overflow-y-auto relative shadow-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">
                    Patient Details
                  </h2>
                  <button
                    onClick={closeUserModal}
                    className="text-gray-400 hover:text-gray-600 transition duration-200 p-1 hover:bg-gray-100 rounded"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                    <dl className="space-y-3">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                        <dd className="text-sm text-gray-900">{selectedUser.firstName} {selectedUser.lastName}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                        <dd className="text-sm text-gray-900">{selectedUser.email}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Phone</dt>
                        <dd className="text-sm text-gray-900">{selectedUser.cellPhone || 'N/A'}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Gender</dt>
                        <dd className="text-sm text-gray-900">{selectedUser.gender || 'N/A'}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                        <dd className="text-sm text-gray-900">
                          {selectedUser.dateOfBirth ? new Date(selectedUser.dateOfBirth).toLocaleDateString() : 'N/A'}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Age</dt>
                        <dd className="text-sm text-gray-900">{selectedUser.age || 'N/A'}</dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact & Healthcare</h3>
                    <dl className="space-y-3">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Address</dt>
                        <dd className="text-sm text-gray-900">{selectedUser.address || 'N/A'}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Country</dt>
                        <dd className="text-sm text-gray-900">{selectedUser.country || 'N/A'}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Postal Code</dt>
                        <dd className="text-sm text-gray-900">{selectedUser.postalCode || 'N/A'}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Healthcare Number</dt>
                        <dd className="text-sm text-gray-900">{selectedUser.healthcareNumber || 'N/A'}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Healthcare Province</dt>
                        <dd className="text-sm text-gray-900">{selectedUser.healthcareProvince || 'N/A'}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Last Visit</dt>
                        <dd className="text-sm text-gray-900">
                          {selectedUser.lastVisit ? new Date(selectedUser.lastVisit).toLocaleDateString() : 'Never'}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Member Since</dt>
                      <dd className="text-sm text-gray-900">
                        {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : 'N/A'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Status</dt>
                      <dd className="text-sm mt-1">
                        <UserStatusDropdown 
                          user={selectedUser} 
                          onStatusChange={handleUserStatusChange}
                        />
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={closeUserModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}