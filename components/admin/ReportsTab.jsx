'use client';
import { useState, useEffect } from 'react';
import { dashboardService } from '@/services/dashboardService';
import MonthlyTrendsChart from './MonthlyTrendsChart';
import MonthlyChart from './MonthlyChart';
import StatusProgress from './StatusProgress';
import { BarChart3, RefreshCw, Layers, Calendar, Star, Info } from 'lucide-react';

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
      
      {/* Header bar */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-[16px] font-bold text-[#0F172A]">Reports & Analytics</h2>
            <p className="text-xs text-[#64748B] mt-0.5">Track patient registrations and status distribution</p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedMonth}
            onChange={(e) => handlePeriodChange(parseInt(e.target.value), selectedYear)}
            className="px-3 py-1.5 border border-[#E2E8F0] rounded-xl text-xs text-[#334155] focus:outline-none bg-white cursor-pointer"
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
            className="px-3 py-1.5 border border-[#E2E8F0] rounded-xl text-xs text-[#334155] focus:outline-none bg-white cursor-pointer"
          >
            <option value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</option>
            <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
          </select>

          <button
            onClick={() => fetchMonthlyReports()}
            disabled={loading}
            className="p-1.5 border border-[#E2E8F0] hover:bg-[#F8FAFC] rounded-xl transition disabled:opacity-50"
            title="Refresh reports"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#64748B]" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Stats column */}
        <div className="lg:col-span-2 space-y-6">
          {loading ? (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 text-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#0EA5E9] border-t-transparent mx-auto"></div>
              <p className="mt-3 text-xs text-[#94A3B8]">Loading report data…</p>
            </div>
          ) : reportsData ? (
            <>
              <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 space-y-6">
                <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
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
                  <div className="bg-[#EEF2F6] border border-[#E2E8F0] p-4 rounded-xl">
                    <p className="text-[10px] font-bold text-[#334155] uppercase tracking-wide">Booked</p>
                    <p className="text-xl font-black text-[#334155] mt-1">{reportsData.patients?.byStatus?.Booked || 0}</p>
                  </div>
                  <div className="bg-[#ECFEFF] border border-[#A5F3FC]/20 p-4 rounded-xl">
                    <p className="text-[10px] font-bold text-[#0891B2] uppercase tracking-wide">New registrations</p>
                    <p className="text-xl font-black text-[#0891B2] mt-1">
                      {reportsData.patients?.newThisMonth || 0}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#F1F5F9]">
                  <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wide">Waitlist Status Distribution</h4>
                  <StatusProgress 
                    statusData={reportsData.patients?.byStatus || {}} 
                    total={reportsData.patients?.total || 0} 
                  />
                </div>
              </div>

              {reportsData?.trends && (
                <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
                  <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-4">Registration Trends & Growth</h3>
                  <MonthlyTrendsChart 
                    trendsData={reportsData.trends} 
                    year={reportsData.trends.year} 
                  />
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 text-center py-12 text-xs text-[#94A3B8]">
              No report metrics found.
            </div>
          )}
        </div>

        {/* Right Definitions and Performance column */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F172A] uppercase tracking-wide pb-2 border-b border-[#F1F5F9]">
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

          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F172A] uppercase tracking-wide pb-2 border-b border-[#F1F5F9]">
              <Info className="w-3.5 h-3.5 text-blue-600" />
              <span>Report Definitions</span>
            </div>
            
            <div className="space-y-3 text-xs text-[#64748B] leading-relaxed">
              <div>
                <p className="font-bold text-[#334155]">Total Waitlist</p>
                <p className="mt-0.5">All registered patients in the waitlist database.</p>
              </div>
              <div>
                <p className="font-bold text-[#334155]">Active Waitlist</p>
                <p className="mt-0.5">Patients currently waiting for booking availability.</p>
              </div>
              <div>
                <p className="font-bold text-[#334155]">New Patients</p>
                <p className="mt-0.5">Patients registered within the selected calendar month.</p>
              </div>
              <div className="pt-3 border-t border-[#F1F5F9] text-[10px] space-y-1.5 font-semibold">
                <p className="text-xs font-bold text-[#334155] uppercase tracking-wide">Status Legend:</p>
                <p>• <strong className="text-[#0F172A]">Active:</strong> New registrations waiting</p>
                <p>• <strong className="text-[#0F172A]">Booked:</strong> Appointed slot confirmed</p>
                <p>• <strong className="text-[#0F172A]">Accepted:</strong> Intake validated by admin</p>
                <p>• <strong className="text-[#0F172A]">Rejected:</strong> Denied entry or closed</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}