// 'use client';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/contexts/AuthContext';
// import ProtectedRoute from '@/components/ProtectedRoute';
// import { dashboardService } from '@/services/dashboardService';
// import { appointmentService } from '@/services/appointmentService';


// export default function AdminDashboard() {
//   const [stats, setStats] = useState({});
//   const [recentAppointments, setRecentAppointments] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('overview');
//   const { user } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const [statsResponse, appointmentsResponse] = await Promise.all([
//         dashboardService.getStats(),
//         dashboardService.getRecentAppointments(10)
//       ]);
      
//       if (statsResponse.success) {
//         setStats(statsResponse.stats);
//       }

//       if (appointmentsResponse.success) {
//         setRecentAppointments(appointmentsResponse.appointments);
//       }

//       // For demo - in real app, you'd fetch users from an API
//       setUsers([
//         {
//           _id: '1',
//           firstName: 'John',
//           lastName: 'Doe',
//           email: 'john@example.com',
//           appointments: 5,
//           lastVisit: new Date('2024-01-15')
//         },
//         {
//           _id: '2',
//           firstName: 'Jane',
//           lastName: 'Smith',
//           email: 'jane@example.com',
//           appointments: 3,
//           lastVisit: new Date('2024-01-10')
//         }
//       ]);
//     } catch (error) {
//       console.error('Error fetching admin data:', error);
//       if (error.response?.status === 401) {
//         router.push('/login');
//       }
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
//       } else {
//         alert(response.message || 'Failed to update appointment');
//       }
//     } catch (error) {
//       console.error('Error updating appointment:', error);
//       alert(error.response?.data?.message || 'Error updating appointment');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
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
//                 <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
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
//                       ? 'border-blue-500 text-blue-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//                 >
//                   {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
//                 </button>
//               ))}
//             </nav>
//           </div>
//         </div>

//         {/* Dashboard Content */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           {activeTab === 'overview' && (
//             <div className="space-y-6">
//               {/* Stats Cards */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//                 <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
//                   <div className="flex items-center">
//                     <div className="p-2 bg-blue-100 rounded-lg">
//                       <span className="text-blue-600 text-xl">📊</span>
//                     </div>
//                     <div className="ml-4">
//                       <p className="text-sm font-medium text-gray-600">Total Appointments</p>
//                       <p className="text-2xl font-bold text-gray-900">{stats.totalAppointments || 0}</p>
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
//                       <p className="text-2xl font-bold text-gray-900">{stats.totalUsers || 0}</p>
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
//                       <p className="text-2xl font-bold text-gray-900">{stats.pendingAppointments || 0}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
//                   <div className="flex items-center">
//                     <div className="p-2 bg-purple-100 rounded-lg">
//                       <span className="text-purple-600 text-xl">💰</span>
//                     </div>
//                     <div className="ml-4">
//                       <p className="text-sm font-medium text-gray-600">Revenue</p>
//                       <p className="text-2xl font-bold text-gray-900">${stats.revenue || 0}</p>
//                     </div>
//                   </div>
//                 </div>
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
//                           </div>
//                           <div className="flex items-center space-x-2">
//                             <select
//                               value={appointment.status}
//                               onChange={(e) => updateAppointmentStatus(appointment._id, e.target.value)}
//                               className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                             >
//                               <option value="pending">Pending</option>
//                               <option value="confirmed">Confirmed</option>
//                               <option value="cancelled">Cancelled</option>
//                               <option value="completed">Completed</option>
//                             </select>
//                           </div>
//                         </div>
//                       ))}
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
//                         <span className="text-sm text-gray-600">Appointments Today</span>
//                         <span className="font-semibold text-blue-600">
//                           {recentAppointments.filter(apt => 
//                             new Date(apt.preferredDate).toDateString() === new Date().toDateString()
//                           ).length}
//                         </span>
//                       </div>
//                       <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                         <span className="text-sm text-gray-600">Completed This Week</span>
//                         <span className="font-semibold text-green-600">
//                           {recentAppointments.filter(apt => 
//                             apt.status === 'completed' &&
//                             new Date(apt.preferredDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
//                           ).length}
//                         </span>
//                       </div>
//                       <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                         <span className="text-sm text-gray-600">New Patients This Month</span>
//                         <span className="font-semibold text-purple-600">12</span>
//                       </div>
//                       <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                         <span className="text-sm text-gray-600">Cancellation Rate</span>
//                         <span className="font-semibold text-red-600">
//                           {stats.totalAppointments ? 
//                             Math.round((stats.cancelledAppointments / stats.totalAppointments) * 100) : 0
//                           }%
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
//                 <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition duration-300">
//                   Export Report
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
//                               className="text-sm border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                             >
//                               <option value="pending">Pending</option>
//                               <option value="confirmed">Confirmed</option>
//                               <option value="cancelled">Cancelled</option>
//                               <option value="completed">Completed</option>
//                             </select>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
//                             <button className="text-blue-600 hover:text-blue-900 mr-3">
//                               View
//                             </button>
//                             <button className="text-red-600 hover:text-red-900">
//                               Delete
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
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
//                           Appointments
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Last Visit
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {users.map((user) => (
//                         <tr key={user._id} className="hover:bg-gray-50 transition duration-300">
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="text-sm font-medium text-gray-900">
//                               {user.firstName} {user.lastName}
//                             </div>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="text-sm text-gray-900">{user.email}</div>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="text-sm text-gray-900">{user.appointments}</div>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="text-sm text-gray-900">
//                               {new Date(user.lastVisit).toLocaleDateString()}
//                             </div>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
//                             <button className="text-blue-600 hover:text-blue-900 mr-3">
//                               View
//                             </button>
//                             <button className="text-green-600 hover:text-green-900 mr-3">
//                               Message
//                             </button>
//                             <button className="text-red-600 hover:text-red-900">
//                               Block
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
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
//                     <h3 className="font-semibold text-gray-900 mb-4">Monthly Appointments</h3>
//                     <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
//                       <div className="text-center text-gray-500">
//                         <div className="text-4xl mb-2">📈</div>
//                         <p>Appointments Chart</p>
//                         <p className="text-sm">(Would display here)</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="border border-gray-200 rounded-lg p-6">
//                     <h3 className="font-semibold text-gray-900 mb-4">Service Popularity</h3>
//                     <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
//                       <div className="text-center text-gray-500">
//                         <div className="text-4xl mb-2">🥇</div>
//                         <p>Services Chart</p>
//                         <p className="text-sm">(Would display here)</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="bg-gray-50 p-6 rounded-lg">
//                   <h3 className="font-semibold text-gray-900 mb-4">Generate Reports</h3>
//                   <div className="flex flex-wrap gap-4">
//                     <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm hover:bg-blue-700 transition duration-300 flex items-center">
//                       <span className="mr-2">📥</span>
//                       Export Appointments
//                     </button>
//                     <button className="bg-green-600 text-white px-6 py-3 rounded-lg text-sm hover:bg-green-700 transition duration-300 flex items-center">
//                       <span className="mr-2">💰</span>
//                       Revenue Report
//                     </button>
//                     <button className="bg-purple-600 text-white px-6 py-3 rounded-lg text-sm hover:bg-purple-700 transition duration-300 flex items-center">
//                       <span className="mr-2">👥</span>
//                       Patient Analytics
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }






'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { dashboardService } from '@/services/dashboardService';
import { appointmentService } from '@/services/appointmentService';

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [error, setError] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      const [statsResponse, appointmentsResponse, usersResponse] = await Promise.all([
        dashboardService.getAdminStats(),
        appointmentService.getAllAppointments({ limit: 10 }),
        dashboardService.getUsers({ limit: 10 })
      ]);
      
      // Fix: Your backend returns { success: true, stats: { ... } } for stats
      setStats(statsResponse.stats || {});
      
      // Fix: Your backend returns { success: true, appointments: [...], pagination: {...} } for appointments
      setRecentAppointments(appointmentsResponse.appointments || []);
      
      // Fix: Your backend returns { success: true, data: [...] } for users
      setUsers(usersResponse.data || []);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      setError(error.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      const response = await appointmentService.updateAppointmentStatus(appointmentId, status);
      
      if (response.success) {
        // Update local state
        setRecentAppointments(prev => 
          prev.map(apt => 
            apt._id === appointmentId ? { ...apt, status } : apt
          )
        );
        
        // Refresh stats to get updated counts
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
        
        // Refresh stats
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
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate additional stats for the UI
  const calculatedStats = {
    ...stats,
    cancelledAppointments: stats.cancelledAppointments || 0,
    upcomingAppointments: stats.upcomingAppointments || 0,
    cancellationRate: stats.totalAppointments ? 
      Math.round(((stats.cancelledAppointments || 0) / stats.totalAppointments) * 100) : 0,
    newPatientsThisMonth: stats.newPatientsThisMonth || 0
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
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
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
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
              {['overview', 'appointments', 'users', 'reports'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
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
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <span className="text-blue-600 text-xl">📊</span>
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
                      <span className="text-purple-600 text-xl">💰</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">${calculatedStats.revenue || 0}</p>
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
                              className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                        <span className="font-semibold text-blue-600">
                          {recentAppointments.filter(apt => 
                            new Date(apt.preferredDate).toDateString() === new Date().toDateString()
                          ).length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Avg. Revenue/Visit</span>
                        <span className="font-semibold text-purple-600">
                          ${calculatedStats.completedAppointments ? 
                            Math.round(calculatedStats.revenue / calculatedStats.completedAppointments) : 0
                          }
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
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition duration-300"
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
                              className="text-sm border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Patient Management</h2>
              </div>
              <div className="p-4 sm:p-6">
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
                        <tr key={user._id} className="hover:bg-gray-50 transition duration-300">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{user.email}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{user.cellPhone || 'N/A'}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {user.lastVisit ? new Date(user.lastVisit).toLocaleDateString() : 'Never'}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {user.status || 'active'}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {users.length === 0 && (
                        <tr>
                          <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                            No users found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Reports & Analytics</h2>
              </div>
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Appointments Overview</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-sm font-medium text-blue-700">Total Appointments</span>
                        <span className="text-lg font-bold text-blue-900">{calculatedStats.totalAppointments || 0}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium text-green-700">Completed</span>
                        <span className="text-lg font-bold text-green-900">{calculatedStats.completedAppointments || 0}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                        <span className="text-sm font-medium text-yellow-700">Pending</span>
                        <span className="text-lg font-bold text-yellow-900">{calculatedStats.pendingAppointments || 0}</span>
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Financial Summary</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="text-sm font-medium text-purple-700">Total Revenue</span>
                        <span className="text-lg font-bold text-purple-900">${calculatedStats.revenue || 0}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <span className="text-sm font-medium text-red-700">Cancellation Rate</span>
                        <span className="text-lg font-bold text-red-900">{calculatedStats.cancellationRate}%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Active Patients</span>
                        <span className="text-lg font-bold text-gray-900">{calculatedStats.totalUsers || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-4">Export Reports</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center">
                      <span className="mr-2">📥</span>
                      Export Appointments
                    </button>
                    <button className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition duration-300 flex items-center justify-center">
                      <span className="mr-2">💰</span>
                      Revenue Report
                    </button>
                    <button className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition duration-300 flex items-center justify-center">
                      <span className="mr-2">👥</span>
                      Patient Analytics
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}