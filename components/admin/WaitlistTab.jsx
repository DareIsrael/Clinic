'use client';
import { useState, useEffect, useCallback } from 'react';
import { dashboardService } from '@/services/dashboardService';
import debounce from 'lodash/debounce';
import WaitlistStatusDropdown from './WaitlistStatusDropdown';
import WaitlistDetailModal from './WaitlistDetailModal';

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
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Waitlist Management</h2>
            <p className="text-sm text-gray-600 mt-1">
              Showing {waitlist.length} of {pagination.total} waitlist entries
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={pagination.limit}
              onChange={(e) => handleLimitChange(parseInt(e.target.value))}
              className="text-sm text-gray-600 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
              disabled={loading}
            >
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
              <option value="50">50 per page</option>
            </select>
            
            <button 
              onClick={() => fetchWaitlist(pagination.page, pagination.limit, searchQuery, searchStatus)}
              disabled={loading}
              className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-sky-700 transition duration-300 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search Waitlist
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by name, email, or healthcare number..."
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-gray-700 focus:ring-2 focus:ring-sky-500"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          <div>
            <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Status
            </label>
            <select
              id="statusFilter"
              value={searchStatus}
              onChange={handleStatusChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-700 focus:ring-sky-500"
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
        </div>

        {/* Search Results Info */}
        {(searchQuery || searchStatus !== 'all') && (
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <div>
              Searching for: {searchQuery && `"${searchQuery}"`} 
              {searchQuery && searchStatus !== 'all' && ' with '}
              {searchStatus !== 'all' && `status: ${searchStatus}`}
            </div>
            <button
              onClick={handleClearSearch}
              className="text-sky-600 hover:text-sky-800 text-sm font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
      
      <div className="p-4 sm:p-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading waitlist...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      No
                    </th>
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
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {waitlist.map((entry, index) => (
                    <tr 
                      key={entry._id} 
                      className="hover:bg-gray-50 transition duration-300"
                    >
                      <td 
                        className="px-4 py-4 whitespace-nowrap cursor-pointer"
                        onClick={() => openModal(entry)}
                      >
                        <div className="text-sm font-medium text-gray-900">
                          {(pagination.page - 1) * pagination.limit + index + 1}
                        </div>
                      </td>
                      <td 
                        className="px-4 py-4 whitespace-nowrap cursor-pointer"
                        onClick={() => openModal(entry)}
                      >
                        <div className="text-sm font-medium text-gray-900">
                          {entry.firstName} {entry.lastName}
                        </div>
                      </td>
                      <td 
                        className="px-4 py-4 whitespace-nowrap cursor-pointer"
                        onClick={() => openModal(entry)}
                      >
                        <div className="text-sm text-gray-900">{entry.email}</div>
                      </td>
                      <td 
                        className="px-4 py-4 whitespace-nowrap cursor-pointer"
                        onClick={() => openModal(entry)}
                      >
                        <div className="text-sm text-gray-900">{entry.cellPhone || 'N/A'}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <WaitlistStatusDropdown 
                          waitlistEntry={entry} 
                          onStatusChange={handleStatusUpdate}
                        />
                      </td>
                      <td 
                        className="px-4 py-4 whitespace-nowrap cursor-pointer"
                        onClick={() => openModal(entry)}
                      >
                        <div className="text-sm text-gray-900">
                          {entry.createdAt ? new Date(entry.createdAt).toLocaleDateString() : 'N/A'}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {waitlist.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                        {searchQuery || searchStatus !== 'all' 
                          ? 'No waitlist entries found matching your search criteria.'
                          : 'No waitlist entries found'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex items-center justify-between mt-6 px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
                <div className="flex justify-between flex-1 sm:hidden">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.pages}
                    className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(pagination.page * pagination.limit, pagination.total)}
                      </span> of{' '}
                      <span className="font-medium">{pagination.total}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                      <button
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1}
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      {/* Page numbers */}
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

                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                              pagination.page === pageNum
                                ? 'z-10 bg-sky-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600'
                                : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === pagination.pages}
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

      {/* Detail Modal */}
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