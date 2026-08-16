'use client';
import { useState, useEffect, useCallback } from 'react';
import { dashboardService } from '@/services/dashboardService';
import debounce from 'lodash/debounce';
import WaitlistStatusDropdown from './WaitlistStatusDropdown';
import WaitlistDetailModal from './WaitlistDetailModal';
import { useAuth } from '@/hooks/useAuth';
import { exportWaitlistToExcel } from '@/utils/excelExport';
import { Search, RefreshCw, X, ChevronLeft, ChevronRight, Download } from 'lucide-react';

export default function WaitlistTab({ theme }) {
  const isDark = theme === 'dark';
  const { user } = useAuth();
  const isDoctor = user?.role === 'doctor';
  const [waitlist, setWaitlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [selectedWaitlistEntry, setSelectedWaitlistEntry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchStatus, setSearchStatus] = useState('all');

  const fetchWaitlist = async (page = 1, limit = 10, search = '', status = 'all') => {
    try {
      setLoading(true);
      const response = await dashboardService.getWaitlist({ 
        page, 
        limit, 
        search, 
        status: status === 'all' ? null : status 
      });
      
      if (response.success) {
        setWaitlist(response.waitlist || []);
        setPagination(response.pagination || {
          page,
          limit,
          total: 0,
          pages: 0
        });
      }
    } catch (error) {
      console.error('Error fetching waitlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce((searchValue, statusValue) => {
      fetchWaitlist(1, pagination.limit, searchValue, statusValue);
    }, 300),
    [pagination.limit]
  );

  useEffect(() => {
    fetchWaitlist(pagination.page, pagination.limit, searchQuery, searchStatus);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value, searchStatus);
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setSearchStatus(value);
    fetchWaitlist(1, pagination.limit, searchQuery, value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchStatus('all');
    fetchWaitlist(1, pagination.limit, '', 'all');
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      fetchWaitlist(newPage, pagination.limit, searchQuery, searchStatus);
    }
  };

  const handleLimitChange = (newLimit) => {
    fetchWaitlist(1, newLimit, searchQuery, searchStatus);
  };

  const handleStatusUpdate = (id, newStatus) => {
    setWaitlist(prev => prev.map(item => 
      item._id === id ? { ...item, status: newStatus } : item
    ));
    if (selectedWaitlistEntry && selectedWaitlistEntry._id === id) {
      setSelectedWaitlistEntry(prev => ({ ...prev, status: newStatus }));
    }
  };

  const openModal = (entry) => {
    setSelectedWaitlistEntry(entry);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWaitlistEntry(null);
  };

  const handleDownloadAll = async () => {
    try {
      setIsExporting(true);
      const response = await dashboardService.getWaitlist({ 
        page: 1, 
        limit: 10000, 
        search: searchQuery, 
        status: searchStatus === 'all' ? null : searchStatus 
      });
      
      if (response.success && response.waitlist && response.waitlist.length > 0) {
        exportWaitlistToExcel(response.waitlist, 'St_Mary_Rideau_Waitlist_All.xlsx');
      } else {
        alert('No waitlist entries available to export.');
      }
    } catch (err) {
      console.error('Error exporting waitlist:', err);
      alert('Failed to export waitlist entries.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className={`text-base font-extrabold ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>
            Patient Waitlist
          </h2>
          <p className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-[#64748B]'}`}>
            Manage new patient registration requests
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {isDoctor && (
            <button
              onClick={handleDownloadAll}
              disabled={loading || isExporting || waitlist.length === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition disabled:opacity-50 cursor-pointer"
              title="Download All Waitlist Patients as Excel"
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
            onClick={() => fetchWaitlist(pagination.page, pagination.limit, searchQuery, searchStatus)}
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

      {/* SEARCH FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94A3B8]" />
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by name, email, or healthcare number..."
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
          id="statusFilter"
          value={searchStatus}
          onChange={handleStatusChange}
          className={`w-full px-3 py-2 border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] cursor-pointer ${
            isDark ? 'bg-[#1E293B] border-[#334155] text-slate-200' : 'bg-white border-[#E2E8F0] text-[#334155]'
          }`}
        >
          <option value="all">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Booked">Booked</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
          <option value="Called">Called</option>
          <option value="Left Voicemail">Left Voicemail</option>
          <option value="Not Reachable">Not Reachable</option>
        </select>
      </div>

      {/* Active filters summary */}
      {(searchQuery || searchStatus !== 'all') && (
        <div className={`flex items-center justify-between text-[11px] font-bold border px-3 py-2 rounded-xl ${
          isDark ? 'bg-[#1E293B] border-[#334155] text-slate-300' : 'bg-[#F8FAFC] border-[#E2E8F0]/60 text-[#64748B]'
        }`}>
          <div>
            Searching: {searchQuery && `"${searchQuery}"`} 
            {searchQuery && searchStatus !== 'all' && ' & '}
            {searchStatus !== 'all' && `status: ${searchStatus}`}
          </div>
          <button
            onClick={handleClearSearch}
            className="text-[#0EA5E9] hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Table List View */}
      <div className={`overflow-x-auto border rounded-xl ${isDark ? 'border-[#334155]' : 'border-[#E2E8F0]'}`}>
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#0EA5E9] border-t-transparent mx-auto"></div>
            <p className="mt-3 text-xs text-[#94A3B8]">Loading waitlist…</p>
          </div>
        ) : (
          <table className={`min-w-full divide-y text-xs ${isDark ? 'divide-[#334155]' : 'divide-[#E2E8F0]'}`}>
            <thead className={isDark ? 'bg-[#1E293B]' : 'bg-[#F8FAFC]'}>
              <tr>
                <th className={`px-4 py-3 text-left font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-[#475569]'}`}>No</th>
                <th className={`px-4 py-3 text-left font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-[#475569]'}`}>Patient Name</th>
                <th className={`px-4 py-3 text-left font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-[#475569]'}`}>Email Address</th>
                <th className={`px-4 py-3 text-left font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-[#475569]'}`}>Phone Number</th>
                <th className={`px-4 py-3 text-left font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-[#475569]'}`}>Status Badge</th>
                <th className={`px-4 py-3 text-left font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-[#475569]'}`}>Joined Date</th>
              </tr>
            </thead>
            
            <tbody className={`divide-y ${isDark ? 'bg-[#0F172A] divide-[#334155]' : 'bg-white divide-[#F1F5F9]'}`}>
              {waitlist.map((entry, index) => (
                <tr 
                  key={entry._id} 
                  className={`transition-colors ${isDark ? 'hover:bg-[#1E293B]/60' : 'hover:bg-[#F8FAFC]/50'}`}
                >
                  <td 
                    className={`px-4 py-4 font-bold cursor-pointer ${isDark ? 'text-slate-400' : 'text-[#64748B]'}`}
                    onClick={() => openModal(entry)}
                  >
                    {(pagination.page - 1) * pagination.limit + index + 1}
                  </td>
                  
                  <td 
                    className="px-4 py-4 cursor-pointer"
                    onClick={() => openModal(entry)}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        isDark ? 'bg-sky-950 border-sky-800 text-sky-400' : 'bg-[#F0F9FF] border-[#0284C7]/15 text-[#0369A1]'
                      }`}>
                        {entry.firstName?.charAt(0) || 'W'}
                      </div>
                      <div className={`font-bold ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>
                        {entry.firstName} {entry.lastName}
                      </div>
                    </div>
                  </td>
                  
                  <td 
                    className={`px-4 py-4 font-medium cursor-pointer ${isDark ? 'text-slate-300' : 'text-[#475569]'}`}
                    onClick={() => openModal(entry)}
                  >
                    {entry.email}
                  </td>
                  
                  <td 
                    className={`px-4 py-4 font-medium cursor-pointer ${isDark ? 'text-slate-300' : 'text-[#475569]'}`}
                    onClick={() => openModal(entry)}
                  >
                    {entry.cellPhone || 'N/A'}
                  </td>
                  
                  <td className="px-4 py-4">
                    <WaitlistStatusDropdown 
                      waitlistEntry={entry} 
                      onStatusChange={handleStatusUpdate}
                    />
                  </td>
                  
                  <td 
                    className={`px-4 py-4 font-semibold cursor-pointer ${isDark ? 'text-slate-400' : 'text-[#64748B]'}`}
                    onClick={() => openModal(entry)}
                  >
                    {entry.createdAt ? new Date(entry.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                </tr>
              ))}
              
              {waitlist.length === 0 && (
                <tr>
                  <td colSpan="6" className={`px-4 py-16 text-center text-xs ${isDark ? 'text-slate-500' : 'text-[#94A3B8]'}`}>
                    No entries found matching filters.
                  </td>
                </tr>
              )}
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
            Showing <span className={`font-bold ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>{(pagination.page - 1) * pagination.limit + 1}</span> to{' '}
            <span className={`font-bold ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>
              {Math.min(pagination.page * pagination.limit, pagination.total)}
            </span> of{' '}
            <span className={`font-bold ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>{pagination.total}</span> results
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className={`p-1.5 border rounded-lg transition disabled:opacity-50 ${
                isDark ? 'border-[#334155] text-slate-300 hover:bg-[#334155]' : 'border-[#E2E8F0] hover:bg-[#F8FAFC]'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
              let pageNum;
              if (pagination.pages <= 5) {
                pageNum = i + 1;
              } else if (pagination.page <= 3) {
                pageNum = i + 1;
              } else if (pagination.page >= pagination.pages - 2) {
                pageNum = pagination.pages - 4 + i;
              } else {
                pageNum = pagination.page - 2 + i;
              }

              const isCurrent = pagination.page === pageNum;

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold transition ${
                    isCurrent 
                      ? 'bg-sky-600 text-white shadow-xs' 
                      : isDark ? 'border border-[#334155] text-slate-300 hover:bg-[#334155]' : 'border border-[#E2E8F0] hover:bg-[#F8FAFC]'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.pages}
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
      {isModalOpen && selectedWaitlistEntry && (
        <WaitlistDetailModal
          entry={selectedWaitlistEntry}
          onClose={closeModal}
          onStatusChange={handleStatusUpdate}
          theme={theme}
        />
      )}
    </div>
  );
}