'use client';
import { useState, useEffect } from 'react';
import { dashboardService } from '@/services/dashboardService';
import MonthlyTrendsChart from './MonthlyTrendsChart';
import MonthlyChart from './MonthlyChart';
import StatusProgress from './StatusProgress';

export default function ReportsTab() {
  const [reportsData, setReportsData] = useState(null);
  const [reportsOverview, setReportsOverview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const fetchMonthlyReports = async (month = selectedMonth, year = selectedYear) => {
    try {
      setLoading(true);
      const response = await dashboardService.getMonthlyReports(year, month);
      
      if (response.success) {
        setReportsData(response.report);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
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

  const handlePeriodChange = (newMonth, newYear) => {
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
    fetchMonthlyReports(newMonth, newYear);
  };

  useEffect(() => {
    fetchMonthlyReports();
    fetchReportsOverview();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Monthly Reports & Analytics</h2>
            <p className="text-gray-600 mt-1">Track waitlist registrations and status distribution</p>
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
              disabled={loading}
              className="bg-sky-600 text-white px-4 py-2 rounded text-sm hover:bg-sky-700 transition duration-300 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {loading ? (
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
                    <p className="text-sm text-blue-700 font-medium">Total Waitlist</p>
                    <p className="text-2xl font-bold text-blue-900">{reportsData.patients?.total || 0}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-700 font-medium">Active</p>
                    <p className="text-2xl font-bold text-green-900">{reportsData.patients?.byStatus?.Active || 0}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-purple-700 font-medium">Accepted</p>
                    <p className="text-2xl font-bold text-purple-900">{reportsData.patients?.byStatus?.Accepted || 0}</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-red-700 font-medium">Rejected</p>
                    <p className="text-2xl font-bold text-red-900">{reportsData.patients?.byStatus?.Rejected || 0}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <p className="text-sm text-indigo-700 font-medium">Booked</p>
                    <p className="text-2xl font-bold text-indigo-900">{reportsData.patients?.byStatus?.Booked || 0}</p>
                  </div>
                  <div className="bg-cyan-50 p-4 rounded-lg">
                    <p className="text-sm text-cyan-700 font-medium">New This Month</p>
                    <p className="text-2xl font-bold text-cyan-900">
                      {reportsData.patients?.newThisMonth || 0}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-md font-semibold text-gray-900 mb-3">Waitlist Status Distribution</h4>
                  <StatusProgress 
                    statusData={reportsData.patients?.byStatus || {}} 
                    total={reportsData.patients?.total || 0} 
                  />
                </div>
              </div>

              {reportsData?.trends && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends & Analytics</h3>
                  <MonthlyTrendsChart 
                    trendsData={reportsData.trends} 
                    year={reportsData.trends.year} 
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

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              {reportsData && (
                <>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-green-700">Activity Rate</span>
                    <span className="text-lg font-bold text-green-900">
                      {reportsData.summary?.activityRate || 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-blue-700">Acceptance Rate</span>
                    <span className="text-lg font-bold text-blue-900">
                      {reportsData.summary?.acceptanceRate || 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-sm font-medium text-red-700">Rejection Rate</span>
                    <span className="text-lg font-bold text-red-900">
                      {reportsData.summary?.rejectionRate || 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium text-purple-700">Monthly Growth</span>
                    <span className="text-lg font-bold text-purple-900">
                      +{reportsData.patients?.newThisMonth || 0}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Definitions</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div>
                <p className="font-medium text-gray-900">Total Waitlist</p>
                <p>All registered patients in the waitlist system</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Active Waitlist</p>
                <p>Patients currently waiting for appointments</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">New Patients</p>
                <p>Patients registered this month</p>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <p className="font-medium text-gray-900">Status Legend:</p>
                <p>• <strong>Active:</strong> New registrations waiting</p>
                <p>• <strong>Booked:</strong> Has upcoming appointment</p>
                <p>• <strong>Accepted:</strong> Approved for treatment</p>
                <p>• <strong>Rejected:</strong> Not approved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}