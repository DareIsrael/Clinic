'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { dashboardService } from '@/services/dashboardService';
import { appointmentService } from '@/services/appointmentService';

export default function ClientDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, appointmentsResponse] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getRecentAppointments(10)
      ]);
      
      if (statsResponse.success) {
        setStats(statsResponse.stats);
      }

      if (appointmentsResponse.success) {
        setAppointments(appointmentsResponse.appointments);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      if (error.response?.status === 401) {
        router.push('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return;

    try {
      const response = await appointmentService.cancelAppointment(appointmentId);
      
      if (response.success) {
        setAppointments(appointments.filter(apt => apt._id !== appointmentId));
        // Refresh stats
        const statsResponse = await dashboardService.getStats();
        if (statsResponse.success) {
          setStats(statsResponse.stats);
        }
      } else {
        alert(response.message || 'Failed to cancel appointment');
      }
    } catch (error) {
      console.error('Error canceling appointment:', error);
      alert(error.response?.data?.message || 'Error canceling appointment');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const upcomingAppointments = appointments
    .filter(apt => new Date(apt.preferredDate) >= new Date() && apt.status !== 'cancelled')
    .slice(0, 3);

  const recentAppointments = appointments.slice(0, 5);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Welcome back, {user?.firstName}!
                </h1>
                <p className="text-gray-600 mt-1">Manage your appointments and health profile</p>
              </div>
              <Link
                href="appointments-Booking"
                className="bg-sky-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-sky-700 transition duration-300 text-sm sm:text-base"
              >
                Book New Appointment
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8 overflow-x-auto">
              {['overview', 'appointments', 'profile'].map((tab) => (
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

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <div className="p-2 bg-sky-100 rounded-lg">
                      <span className="text-sky-600 text-xl">📅</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Appointments</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalAppointments || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <span className="text-green-600 text-xl">✅</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Completed</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.completedAppointments || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <span className="text-yellow-600 text-xl">⏳</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Upcoming</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.upcomingAppointments || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <span className="text-red-600 text-xl">❌</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Cancelled</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.cancelledAppointments || 0}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Appointments */}
                <div className="bg-white rounded-lg shadow-md">
                  <div className="p-4 sm:p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
                  </div>
                  <div className="p-4 sm:p-6">
                    {upcomingAppointments.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingAppointments.map((appointment) => (
                          <div key={appointment._id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{appointment.serviceType}</p>
                              <p className="text-sm text-gray-600">
                                {new Date(appointment.preferredDate).toLocaleDateString()} at {appointment.preferredTime}
                              </p>
                              <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {appointment.status}
                              </span>
                            </div>
                            {appointment.status === 'pending' && (
                              <button
                                onClick={() => cancelAppointment(appointment._id)}
                                className="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1 border border-red-200 rounded hover:bg-red-50 transition duration-300"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-4">📅</div>
                        <p className="text-gray-500 mb-2">No upcoming appointments</p>
                        <Link
                          href="appointments-Booking"
                          className="inline-block text-sky-600 hover:text-sky-700 font-medium"
                        >
                          Book your first appointment
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-md">
                  <div className="p-4 sm:p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <Link
                        href="appointments-Booking"
                        className="p-4 border border-gray-200 rounded-lg text-center hover:bg-gray-50 transition duration-300 hover:shadow-md"
                      >
                        <div className="text-3xl mb-3">📅</div>
                        <p className="text-sm font-medium text-gray-900">Book Appointment</p>
                        <p className="text-xs text-gray-500 mt-1">Schedule a visit</p>
                      </Link>
                      <button
                        onClick={() => setActiveTab('appointments')}
                        className="p-4 border border-gray-200 rounded-lg text-center hover:bg-gray-50 transition duration-300 hover:shadow-md"
                      >
                        <div className="text-3xl mb-3">📋</div>
                        <p className="text-sm font-medium text-gray-900">View All</p>
                        <p className="text-xs text-gray-500 mt-1">All appointments</p>
                      </button>
                      <Link
                        href="/services"
                        className="p-4 border border-gray-200 rounded-lg text-center hover:bg-gray-50 transition duration-300 hover:shadow-md"
                      >
                        <div className="text-3xl mb-3">🏥</div>
                        <p className="text-sm font-medium text-gray-900">Services</p>
                        <p className="text-xs text-gray-500 mt-1">Our offerings</p>
                      </Link>
                      <button
                        onClick={() => setActiveTab('profile')}
                        className="p-4 border border-gray-200 rounded-lg text-center hover:bg-gray-50 transition duration-300 hover:shadow-md"
                      >
                        <div className="text-3xl mb-3">👤</div>
                        <p className="text-sm font-medium text-gray-900">Profile</p>
                        <p className="text-xs text-gray-500 mt-1">Your information</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">All Appointments</h2>
              </div>
              <div className="p-4 sm:p-6">
                {appointments.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
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
                        {appointments.map((appointment) => (
                          <tr key={appointment._id} className="hover:bg-gray-50 transition duration-300">
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{appointment.serviceType}</div>
                              {appointment.message && (
                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                  {appointment.message}
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {new Date(appointment.preferredDate).toLocaleDateString()}
                              </div>
                              <div className="text-sm text-gray-500">{appointment.preferredTime}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                'bg-sky-100 text-sky-800'
                              }`}>
                                {appointment.status}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                              {appointment.status === 'pending' && (
                                <button
                                  onClick={() => cancelAppointment(appointment._id)}
                                  className="text-red-600 hover:text-red-900 px-3 py-1 border border-red-200 rounded hover:bg-red-50 transition duration-300"
                                >
                                  Cancel
                                </button>
                              )}
                              {appointment.status === 'confirmed' && (
                                <span className="text-green-600 px-3 py-1">Confirmed</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📅</div>
                    <p className="text-gray-500 text-lg mb-2">No appointments found</p>
                    <p className="text-gray-400 mb-6">You haven't booked any appointments yet.</p>
                    <Link
                      href="appointments-Booking"
                      className="inline-block bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 transition duration-300"
                    >
                      Book Your First Appointment
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
              </div>
              <div className="p-4 sm:p-6">
                {user && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                      <dl className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                          <dd className="text-lg text-gray-900">{user.firstName} {user.lastName}</dd>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <dt className="text-sm font-medium text-gray-500">Email</dt>
                          <dd className="text-lg text-gray-900">{user.email}</dd>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <dt className="text-sm font-medium text-gray-500">Phone</dt>
                          <dd className="text-lg text-gray-900">{user.cellPhone}</dd>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                          <dd className="text-lg text-gray-900">
                            {new Date(user.dateOfBirth).toLocaleDateString()}
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Healthcare Information</h3>
                      <dl className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <dt className="text-sm font-medium text-gray-500">Healthcare Number</dt>
                          <dd className="text-lg text-gray-900">{user.healthcareNumber}</dd>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <dt className="text-sm font-medium text-gray-500">Province</dt>
                          <dd className="text-lg text-gray-900">{user.healthcareProvince}</dd>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <dt className="text-sm font-medium text-gray-500">Address</dt>
                          <dd className="text-lg text-gray-900">{user.address}</dd>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <dt className="text-sm font-medium text-gray-500">Country</dt>
                          <dd className="text-lg text-gray-900">{user.country}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                )}
                <div className="mt-8 flex space-x-4">
                  <button className="bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 transition duration-300">
                    Edit Profile
                  </button>
                  <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition duration-300">
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}