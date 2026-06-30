'use client';
import { useState, useEffect, useCallback } from 'react';
import { dashboardService } from '@/services/dashboardService';
import debounce from 'lodash/debounce';
import WaitlistStatusDropdown from './WaitlistStatusDropdown';
import WaitlistDetailModal from './WaitlistDetailModal';
import { Search, RefreshCw, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function WaitlistTab() {
  const [waitlist, setWaitlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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
      setError('Failed to load waitlist');
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

  const handleStatusUpdate = async (waitlistId, newStatus) => {
    try {
      const response = await dashboardService.updateWaitlistStatus(waitlistId, newStatus);
      
      if (response.success) {
        setWaitlist(prev => 
          prev.map(entry => 
            entry._id === waitlistId ? { ...entry, status: newStatus } : entry
          )
        );
        
        if (selectedWaitlistEntry && selectedWaitlistEntry._id === waitlistId) {
          setSelectedWaitlistEntry(prev => ({ ...prev, status: newStatus }));
        }
      } else {
        alert(response.message || 'Failed to update waitlist status');
      }
    } catch (error) {
      console.error('Error updating waitlist status:', error);
      alert(error.response?.data?.message || 'Error updating waitlist status');
    }
  };

  const openModal = (entry) => {
    setSelectedWaitlistEntry(entry);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedWaitlistEntry(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchWaitlist();
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden p-6 space-y-6">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#F1F5F9]">
        <div>
          <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">Waitlist Management</h2>
          <p className="text-xs text-[#64748B] mt-0.5 font-semibold">
            Showing {waitlist.length} of {pagination.total} entries
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <select
            value={pagination.limit}
            onChange={(e) => handleLimitChange(parseInt(e.target.value))}
            className="px-3 py-1.5 border border-[#E2E8F0] rounded-xl text-xs text-[#334155] focus:outline-none bg-white cursor-pointer"
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
            className="p-1.5 border border-[#E2E8F0] hover:bg-[#F8FAFC] rounded-xl transition disabled:opacity-50"
            title="Refresh list"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#64748B]" />
          </button>
        </div>
      </div>

      {/* 🔍 PREMIUM ENHANCED SEARCH FILTERS 🔍 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94A3B8]" />
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by name, email, or healthcare number..."
            className="w-full pl-9 pr-8 py-2 bg-white border border-[#E2E8F0] rounded-xl text-xs text-[#334155] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] transition-all"
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
          className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl text-xs text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] cursor-pointer"
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
        <div className="flex items-center justify-between text-[11px] text-[#64748B] font-bold bg-[#F8FAFC] border border-[#E2E8F0]/60 px-3 py-2 rounded-xl">
          <div>
            Searching: {searchQuery && `"${searchQuery}"`} 
            {searchQuery && searchStatus !== 'all' && ' & '}
            {searchStatus !== 'all' && `status: ${searchStatus}`}
          </div>
          <button
            onClick={handleClearSearch}
            className="text-[#1E3A8A] hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Table List View */}
      <div className="overflow-x-auto border border-[#E2E8F0] rounded-xl">
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#0EA5E9] border-t-transparent mx-auto"></div>
            <p className="mt-3 text-xs text-[#94A3B8]">Loading waitlist…</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-[#E2E8F0] text-xs">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="px-4 py-3 text-left font-bold text-[#475569] uppercase tracking-wider">No</th>
                <th className="px-4 py-3 text-left font-bold text-[#475569] uppercase tracking-wider">Patient Name</th>
                <th className="px-4 py-3 text-left font-bold text-[#475569] uppercase tracking-wider">Email Address</th>
                <th className="px-4 py-3 text-left font-bold text-[#475569] uppercase tracking-wider">Phone Number</th>
                <th className="px-4 py-3 text-left font-bold text-[#475569] uppercase tracking-wider">Status Badge</th>
                <th className="px-4 py-3 text-left font-bold text-[#475569] uppercase tracking-wider">Joined Date</th>
              </tr>
            </thead>
            
            <tbody className="bg-white divide-y divide-[#F1F5F9]">
              {waitlist.map((entry, index) => (
                <tr 
                  key={entry._id} 
                  className="hover:bg-[#F8FAFC]/50 transition-colors"
                >
                  <td 
                    className="px-4 py-4 text-[#64748B] font-bold cursor-pointer"
                    onClick={() => openModal(entry)}
                  >
                    {(pagination.page - 1) * pagination.limit + index + 1}
                  </td>
                  
                  <td 
                    className="px-4 py-4 cursor-pointer"
                    onClick={() => openModal(entry)}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#F0F9FF] border border-[#0284C7]/15 flex items-center justify-center text-xs font-bold text-[#0369A1] flex-shrink-0">
                        {entry.firstName?.charAt(0) || 'W'}
                      </div>
                      <div className="font-bold text-[#0F172A]">
                        {entry.firstName} {entry.lastName}
                      </div>
                    </div>
                  </td>
                  
                  <td 
                    className="px-4 py-4 text-[#475569] font-medium cursor-pointer"
                    onClick={() => openModal(entry)}
                  >
                    {entry.email}
                  </td>
                  
                  <td 
                    className="px-4 py-4 text-[#475569] font-medium cursor-pointer"
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
                    className="px-4 py-4 text-[#64748B] font-semibold cursor-pointer"
                    onClick={() => openModal(entry)}
                  >
                    {entry.createdAt ? new Date(entry.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                </tr>
              ))}
              
              {waitlist.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-16 text-center text-xs text-[#94A3B8]">
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
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-[#F1F5F9] gap-4 text-xs text-[#64748B] font-medium">
          <div>
            Showing <span className="text-[#0F172A] font-bold">{(pagination.page - 1) * pagination.limit + 1}</span> to{' '}
            <span className="text-[#0F172A] font-bold">
              {Math.min(pagination.page * pagination.limit, pagination.total)}
            </span> of{' '}
            <span className="text-[#0F172A] font-bold">{pagination.total}</span> results
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="p-1.5 border border-[#E2E8F0] hover:bg-[#F8FAFC] rounded-lg transition disabled:opacity-50"
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
                    isCurrent ? 'bg-sky-600 text-white shadow-xs' : 'border border-[#E2E8F0] hover:bg-[#F8FAFC]'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.pages}
              className="p-1.5 border border-[#E2E8F0] hover:bg-[#F8FAFC] rounded-lg transition disabled:opacity-50"
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
        />
      )}
    </div>
  );
}