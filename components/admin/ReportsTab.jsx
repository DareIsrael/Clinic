'use client';
import { useState, useEffect } from 'react';
import { dashboardService } from '@/services/dashboardService';
import MonthlyTrendsChart from './MonthlyTrendsChart';
import MonthlyChart from './MonthlyChart';
import StatusProgress from './StatusProgress';
import { BarChart3, RefreshCw, Layers, Calendar, Star, Info } from 'lucide-react';

export default function ReportsTab({ theme }) {
  const isDark = theme === 'dark';
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

  useEffect(() => {
    fetchMonthlyReports();
    fetchReportsOverview();
  }, []);

  const handleMonthChange = (e) => {
    const month = parseInt(e.target.value);
    setSelectedMonth(month);
    fetchMonthlyReports(month, selectedYear);
  };

  const handleYearChange = (e) => {
    const year = parseInt(e.target.value);
    setSelectedYear(year);
    fetchMonthlyReports(selectedMonth, year);
  };

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  return (
    <div className="space-y-6">
      
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className={`text-base font-extrabold ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>
            System Reports & Analytics
          </h2>
          <p className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-[#64748B]'}`}>
            Monitor patient intake trends and clinic operations
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className={`px-3 py-1.5 border rounded-xl text-xs focus:outline-none cursor-pointer ${
              isDark ? 'bg-[#1E293B] border-[#334155] text-slate-200' : 'bg-white border-[#E2E8F0] text-[#334155]'
            }`}
            disabled={loading}
          >
            {months.map(m => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={handleYearChange}
            className={`px-3 py-1.5 border rounded-xl text-xs focus:outline-none cursor-pointer ${
              isDark ? 'bg-[#1E293B] border-[#334155] text-slate-200' : 'bg-white border-[#E2E8F0] text-[#334155]'
            }`}
            disabled={loading}
          >
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <button
            onClick={() => fetchMonthlyReports(selectedMonth, selectedYear)}
            disabled={loading}
            className={`p-1.5 border rounded-xl transition disabled:opacity-50 ${
              isDark ? 'border-[#334155] hover:bg-[#334155] text-slate-300' : 'border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#64748B]'
            }`}
            title="Refresh reports"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Stats column */}
        <div className="lg:col-span-2 space-y-6">
          {loading ? (
            <div className={`rounded-2xl border p-6 text-center py-16 ${
              isDark ? 'bg-[#1E293B] border-[#334155]' : 'bg-white border-[#E2E8F0]'
            }`}>
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#0EA5E9] border-t-transparent mx-auto"></div>
              <p className="mt-3 text-xs text-[#94A3B8]">Loading report data…</p>
            </div>
          ) : reportsData ? (
            <>
              <div className={`rounded-2xl border shadow-sm p-6 space-y-6 ${
                isDark ? 'bg-[#1E293B] border-[#334155]' : 'bg-white border-[#E2E8F0]'
              }`}>
                <h3 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>
                  {reportsData.period.monthName} {reportsData.period.year} Summary
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                  <div className="bg-[#EFF6FF] border border-[#BFDBFE]/20 p-4 rounded-xl">
                    <p className="text-[10px] font-bold text-[#1E3A8A] uppercase tracking-wide">Total Waitlist</p>
                    <p className="text-xl font-black text-[#1E3A8A] mt-1">{reportsData.patients?.total || 0}</p>
                  </div>
                  <div className="bg-[#ECFDF5] border border-[#A7F3D0]/20 p-4 rounded-xl">
                    <p className="text-[10px] font-bold text-[#065F46] uppercase tracking-wide">Active</p>
                    <p className="text-xl font-black text-[#065F46] mt-1">{reportsData.patients?.byStatus?.Active || 0}</p>
                  </div>
                  <div className="bg-[#F5F3FF] border border-[#C084FC]/10 p-4 rounded-xl">
                    <p className="text-[10px] font-bold text-[#5B21B6] uppercase tracking-wide">Accepted</p>
                    <p className="text-xl font-black text-[#5B21B6] mt-1">{reportsData.patients?.byStatus?.Accepted || 0}</p>
                  </div>
                  <div className="bg-[#FEF2F2] border border-[#FCA5A5]/20 p-4 rounded-xl">
                    <p className="text-[10px] font-bold text-[#991B1B] uppercase tracking-wide">Rejected</p>
                    <p className="text-xl font-black text-[#991B1B] mt-1">{reportsData.patients?.byStatus?.Rejected || 0}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5">
                  <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#0F172A] border-[#334155]' : 'bg-[#EEF2F6] border-[#E2E8F0]'}`}>
                    <p className={`text-[10px] font-bold uppercase tracking-wide ${isDark ? 'text-slate-300' : 'text-[#334155]'}`}>Booked</p>
                    <p className={`text-xl font-black mt-1 ${isDark ? 'text-white' : 'text-[#334155]'}`}>{reportsData.patients?.byStatus?.Booked || 0}</p>
                  </div>
                  <div className="bg-[#ECFEFF] border border-[#A5F3FC]/20 p-4 rounded-xl">
                    <p className="text-[10px] font-bold text-[#0891B2] uppercase tracking-wide">New registrations</p>
                    <p className="text-xl font-black text-[#0891B2] mt-1">
                      {reportsData.patients?.newThisMonth || 0}
                    </p>
                  </div>
                </div>

                <div className={`space-y-3 pt-4 border-t ${isDark ? 'border-[#334155]' : 'border-[#F1F5F9]'}`}>
                  <h4 className={`text-xs font-bold uppercase tracking-wide ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>Waitlist Status Distribution</h4>
                  <StatusProgress 
                    statusData={reportsData.patients?.byStatus || {}} 
                    total={reportsData.patients?.total || 0} 
                  />
                </div>
              </div>

              {reportsData?.trends && (
                <div className={`rounded-2xl border shadow-sm p-6 ${
                  isDark ? 'bg-[#1E293B] border-[#334155]' : 'bg-white border-[#E2E8F0]'
                }`}>
                  <h3 className={`text-xs font-bold uppercase tracking-wider mb-4 ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>Registration Trends & Growth</h3>
                  <MonthlyTrendsChart 
                    trendsData={reportsData.trends} 
                    year={reportsData.trends.year} 
                  />
                </div>
              )}
            </>
          ) : (
            <div className={`rounded-2xl border shadow-sm p-6 text-center py-12 text-xs ${
              isDark ? 'bg-[#1E293B] border-[#334155] text-slate-500' : 'bg-white border-[#E2E8F0] text-[#94A3B8]'
            }`}>
              No report metrics found.
            </div>
          )}
        </div>

        {/* Right Definitions and Performance column */}
        <div className="space-y-6">
          <div className={`rounded-2xl border shadow-sm p-6 space-y-4 ${
            isDark ? 'bg-[#1E293B] border-[#334155]' : 'bg-white border-[#E2E8F0]'
          }`}>
            <div className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide pb-2 border-b ${
              isDark ? 'border-[#334155] text-white' : 'border-[#F1F5F9] text-[#0F172A]'
            }`}>
              <Star className="w-3.5 h-3.5 text-amber-500" />
              <span>Performance Metrics</span>
            </div>
            
            <div className="space-y-2 text-xs">
              {reportsData && (
                <>
                  <div className="flex justify-between items-center p-3 bg-[#ECFDF5] border border-[#A7F3D0]/20 rounded-xl font-bold">
                    <span className="text-[#065F46]">Activity Rate</span>
                    <span className="text-[#065F46]">
                      {reportsData.summary?.activityRate || 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[#EFF6FF] border border-[#BFDBFE]/20 rounded-xl font-bold">
                    <span className="text-[#1E40AF]">Acceptance Rate</span>
                    <span className="text-[#1E40AF]">
                      {reportsData.summary?.acceptanceRate || 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[#FEF2F2] border border-[#FCA5A5]/20 rounded-xl font-bold">
                    <span className="text-[#991B1B]">Rejection Rate</span>
                    <span className="text-[#991B1B]">
                      {reportsData.summary?.rejectionRate || 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[#F5F3FF] border border-[#C084FC]/10 rounded-xl font-bold">
                    <span className="text-[#5B21B6]">Monthly Growth</span>
                    <span className="text-[#5B21B6]">
                      +{reportsData.patients?.newThisMonth || 0}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className={`rounded-2xl border shadow-sm p-6 space-y-4 ${
            isDark ? 'bg-[#1E293B] border-[#334155]' : 'bg-white border-[#E2E8F0]'
          }`}>
            <div className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide pb-2 border-b ${
              isDark ? 'border-[#334155] text-white' : 'border-[#F1F5F9] text-[#0F172A]'
            }`}>
              <Info className="w-3.5 h-3.5 text-blue-600" />
              <span>Report Definitions</span>
            </div>
            
            <div className={`space-y-3 text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-[#64748B]'}`}>
              <div>
                <p className={`font-bold ${isDark ? 'text-slate-200' : 'text-[#334155]'}`}>Total Waitlist</p>
                <p className="mt-0.5">All registered patients in the waitlist database.</p>
              </div>
              <div>
                <p className={`font-bold ${isDark ? 'text-slate-200' : 'text-[#334155]'}`}>Active Waitlist</p>
                <p className="mt-0.5">Patients currently waiting for booking availability.</p>
              </div>
              <div>
                <p className={`font-bold ${isDark ? 'text-slate-200' : 'text-[#334155]'}`}>New Patients</p>
                <p className="mt-0.5">Patients registered within the selected calendar month.</p>
              </div>
              <div className={`pt-3 border-t text-[10px] space-y-1.5 font-semibold ${isDark ? 'border-[#334155]' : 'border-[#F1F5F9]'}`}>
                <p className={`text-xs font-bold uppercase tracking-wide ${isDark ? 'text-slate-200' : 'text-[#334155]'}`}>Status Legend:</p>
                <p>• <strong className={isDark ? 'text-white' : 'text-[#0F172A]'}>Active:</strong> New registrations waiting</p>
                <p>• <strong className={isDark ? 'text-white' : 'text-[#0F172A]'}>Booked:</strong> Appointed slot confirmed</p>
                <p>• <strong className={isDark ? 'text-white' : 'text-[#0F172A]'}>Accepted:</strong> Intake validated by admin</p>
                <p>• <strong className={isDark ? 'text-white' : 'text-[#0F172A]'}>Rejected:</strong> Denied entry or closed</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}