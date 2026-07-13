'use client';
import { useState, useEffect, useCallback } from 'react';
import { Search, Shield, UserPlus, ToggleLeft, ToggleRight, Trash2, RefreshCw, X, CheckCircle2, XCircle, Users } from 'lucide-react';
import debounce from 'lodash/debounce';

export default function AdminManagementPanel({ theme }) {
  const [admins, setAdmins] = useState([]);
  const [counts, setCounts] = useState({ total: 0, active: 0, deactivated: 0 });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showGrantModal, setShowGrantModal] = useState(false);
  const [patientSearch, setPatientSearch] = useState('');
  const [patients, setPatients] = useState([]);
  const [patientsLoading, setPatientsLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const isDark = theme === 'dark';

  const fetchAdmins = async (search = '') => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      
      const response = await fetch(`/api/admin/admin-users?${params.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        setAdmins(data.admins || []);
        setCounts(data.counts || { total: 0, active: 0, deactivated: 0 });
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
      setMessage({ type: 'error', text: 'Failed to load admin users' });
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      fetchAdmins(value);
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const searchPatients = async (search) => {
    if (!search || search.length < 2) {
      setPatients([]);
      return;
    }
    try {
      setPatientsLoading(true);
      const response = await fetch(`/api/admin/users?search=${encodeURIComponent(search)}&limit=10`);
      const data = await response.json();
      if (data.success) {
        setPatients(data.users || []);
      }
    } catch (error) {
      console.error('Error searching patients:', error);
    } finally {
      setPatientsLoading(false);
    }
  };

  const debouncedPatientSearch = useCallback(
    debounce((value) => {
      searchPatients(value);
    }, 300),
    []
  );

  const handlePatientSearchChange = (e) => {
    const value = e.target.value;
    setPatientSearch(value);
    debouncedPatientSearch(value);
  };

  const grantAdminAccess = async (userId) => {
    if (!confirm('Are you sure you want to grant admin access to this user?')) return;
    
    try {
      setActionLoading(userId);
      const response = await fetch('/api/admin/admin-users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      
      if (data.success) {
        setMessage({ type: 'success', text: data.message });
        setShowGrantModal(false);
        setPatientSearch('');
        setPatients([]);
        await fetchAdmins(searchQuery);
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch (error) {
      console.error('Error granting admin:', error);
      setMessage({ type: 'error', text: 'Failed to grant admin access' });
    } finally {
      setActionLoading('');
    }
  };

  const toggleAdminStatus = async (adminId, currentStatus) => {
    const action = currentStatus === 'Deactivated' ? 'activate' : 'deactivate';
    if (!confirm(`Are you sure you want to ${action} this admin?`)) return;
    
    try {
      setActionLoading(adminId);
      const response = await fetch(`/api/admin/admin-users/${adminId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      const data = await response.json();
      
      if (data.success) {
        setMessage({ type: 'success', text: data.message });
        await fetchAdmins(searchQuery);
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch (error) {
      console.error('Error toggling admin:', error);
      setMessage({ type: 'error', text: 'Failed to update admin status' });
    } finally {
      setActionLoading('');
    }
  };

  const removeAdmin = async (adminId) => {
    if (!confirm('Are you sure you want to remove admin access? This user will be demoted to a patient.')) return;
    
    try {
      setActionLoading(adminId);
      const response = await fetch(`/api/admin/admin-users/${adminId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      
      if (data.success) {
        setMessage({ type: 'success', text: data.message });
        await fetchAdmins(searchQuery);
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch (error) {
      console.error('Error removing admin:', error);
      setMessage({ type: 'error', text: 'Failed to remove admin' });
    } finally {
      setActionLoading('');
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Auto-clear messages after 4 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ type: '', text: '' }), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="space-y-5">

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className={`rounded-xl border p-4 flex items-center justify-between ${isDark ? 'bg-[#0F172A] border-[#334155]' : 'bg-[#F8FAFC] border-[#E2E8F0]'}`}>
          <div>
            <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider">Total Admins</p>
            <p className={`text-lg font-extrabold mt-0.5 ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>{counts.total}</p>
          </div>
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <Users className="w-4 h-4 text-blue-600" />
          </div>
        </div>
        <div className={`rounded-xl border p-4 flex items-center justify-between ${isDark ? 'bg-[#0F172A] border-[#334155]' : 'bg-[#F8FAFC] border-[#E2E8F0]'}`}>
          <div>
            <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider">Active</p>
            <p className={`text-lg font-extrabold mt-0.5 ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>{counts.active}</p>
          </div>
          <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
        </div>
        <div className={`rounded-xl border p-4 flex items-center justify-between ${isDark ? 'bg-[#0F172A] border-[#334155]' : 'bg-[#F8FAFC] border-[#E2E8F0]'}`}>
          <div>
            <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider">Deactivated</p>
            <p className={`text-lg font-extrabold mt-0.5 ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>{counts.deactivated}</p>
          </div>
          <div className="w-8 h-8 bg-rose-50 rounded-lg flex items-center justify-center">
            <XCircle className="w-4 h-4 text-rose-600" />
          </div>
        </div>
      </div>

      {/* Message */}
      {message.text && (
        <div className={`p-3 rounded-xl text-xs font-bold border ${
          message.type === 'success' 
            ? 'bg-emerald-50 text-emerald-800 border-emerald-100' 
            : 'bg-rose-50 text-rose-800 border-rose-100'
        }`}>
          {message.text}
        </div>
      )}

      {/* Header + Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search admins by name or email..."
            className={`w-full pl-9 pr-3 py-2 border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] transition ${
              isDark ? 'bg-[#0F172A] border-[#334155] text-white placeholder-slate-500' : 'bg-white border-[#E2E8F0] text-[#334155] placeholder-[#94A3B8]'
            }`}
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowGrantModal(true)}
            className="px-3.5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <UserPlus className="w-3.5 h-3.5" /> Grant Admin Access
          </button>
          <button
            onClick={() => fetchAdmins(searchQuery)}
            disabled={loading}
            className={`p-2 border rounded-xl transition disabled:opacity-50 ${isDark ? 'border-[#334155] hover:bg-[#334155]' : 'border-[#E2E8F0] hover:bg-[#F8FAFC]'}`}
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#64748B]" />
          </button>
        </div>
      </div>

      {/* Admin List Table */}
      <div className={`overflow-x-auto border rounded-xl ${isDark ? 'border-[#334155]' : 'border-[#E2E8F0]'}`}>
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#0EA5E9] border-t-transparent mx-auto"></div>
            <p className="mt-3 text-xs text-[#94A3B8]">Loading admins…</p>
          </div>
        ) : admins.length === 0 ? (
          <div className="text-center py-16 text-xs text-[#94A3B8]">No admin users found.</div>
        ) : (
          <table className="min-w-full divide-y divide-[#E2E8F0] text-xs">
            <thead className={isDark ? 'bg-[#0F172A]' : 'bg-[#F8FAFC]'}>
              <tr>
                <th className={`px-4 py-3 text-left font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-[#475569]'}`}>No</th>
                <th className={`px-4 py-3 text-left font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-[#475569]'}`}>Admin User</th>
                <th className={`px-4 py-3 text-left font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-[#475569]'}`}>Email</th>
                <th className={`px-4 py-3 text-left font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-[#475569]'}`}>Status</th>
                <th className={`px-4 py-3 text-left font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-[#475569]'}`}>Joined</th>
                <th className={`px-4 py-3 text-left font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-[#475569]'}`}>Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'bg-[#1E293B] divide-[#334155]' : 'bg-white divide-[#F1F5F9]'}`}>
              {admins.map((admin, index) => (
                <tr key={admin._id} className={`transition-colors ${isDark ? 'hover:bg-[#334155]/30' : 'hover:bg-[#F8FAFC]/50'}`}>
                  <td className={`px-4 py-4 font-bold ${isDark ? 'text-slate-400' : 'text-[#64748B]'}`}>
                    {index + 1}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#F0F9FF] border border-[#0284C7]/15 flex items-center justify-center text-xs font-bold text-[#0369A1] flex-shrink-0">
                        {admin.firstName?.charAt(0) || 'A'}
                      </div>
                      <div className={`font-bold ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>
                        {admin.firstName} {admin.lastName}
                      </div>
                    </div>
                  </td>
                  <td className={`px-4 py-4 font-medium ${isDark ? 'text-slate-300' : 'text-[#475569]'}`}>
                    {admin.email}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                      admin.status === 'Deactivated'
                        ? 'bg-rose-50 text-rose-700'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      {admin.status === 'Deactivated' ? 'Deactivated' : 'Active'}
                    </span>
                  </td>
                  <td className={`px-4 py-4 font-semibold ${isDark ? 'text-slate-400' : 'text-[#64748B]'}`}>
                    {admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => toggleAdminStatus(admin._id, admin.status)}
                        disabled={actionLoading === admin._id}
                        className={`px-2 py-1 text-[10px] font-bold rounded-lg transition disabled:opacity-50 ${
                          admin.status === 'Deactivated'
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                            : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                        }`}
                        title={admin.status === 'Deactivated' ? 'Activate' : 'Deactivate'}
                      >
                        {admin.status === 'Deactivated' ? (
                          <span className="flex items-center gap-1"><ToggleLeft className="w-3 h-3" /> Activate</span>
                        ) : (
                          <span className="flex items-center gap-1"><ToggleRight className="w-3 h-3" /> Deactivate</span>
                        )}
                      </button>
                      <button
                        onClick={() => removeAdmin(admin._id)}
                        disabled={actionLoading === admin._id}
                        className="px-2 py-1 text-[10px] font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg transition disabled:opacity-50 flex items-center gap-1"
                        title="Remove admin access"
                      >
                        <Trash2 className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Grant Admin Modal */}
      {showGrantModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-md rounded-2xl shadow-xl border p-6 space-y-4 ${isDark ? 'bg-[#1E293B] border-[#334155]' : 'bg-white border-[#E2E8F0]'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-sky-50 rounded-lg flex items-center justify-center">
                  <UserPlus className="w-4 h-4 text-sky-600" />
                </div>
                <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>Grant Admin Access</h3>
              </div>
              <button
                onClick={() => { setShowGrantModal(false); setPatientSearch(''); setPatients([]); }}
                className={`p-1.5 rounded-lg transition ${isDark ? 'hover:bg-[#334155]' : 'hover:bg-[#F8FAFC]'}`}
              >
                <X className="w-4 h-4 text-[#94A3B8]" />
              </button>
            </div>

            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-[#64748B]'}`}>
              Search for a registered patient to promote to admin.
            </p>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94A3B8]" />
              <input
                type="text"
                value={patientSearch}
                onChange={handlePatientSearchChange}
                placeholder="Search by name or email (min 2 chars)..."
                className={`w-full pl-9 pr-3 py-2.5 border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] transition ${
                  isDark ? 'bg-[#0F172A] border-[#334155] text-white placeholder-slate-500' : 'bg-white border-[#E2E8F0] text-[#334155] placeholder-[#94A3B8]'
                }`}
                autoFocus
              />
            </div>

            <div className={`max-h-[240px] overflow-y-auto border rounded-xl divide-y ${isDark ? 'border-[#334155] divide-[#334155]' : 'border-[#E2E8F0] divide-[#F1F5F9]'}`}>
              {patientsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#0EA5E9] border-t-transparent mx-auto"></div>
                  <p className="mt-2 text-[10px] text-[#94A3B8]">Searching...</p>
                </div>
              ) : patients.length > 0 ? (
                patients.map((patient) => (
                  <div key={patient._id} className={`flex items-center justify-between p-3 transition ${isDark ? 'hover:bg-[#334155]/30' : 'hover:bg-[#F8FAFC]'}`}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#F0F9FF] border border-[#0284C7]/15 flex items-center justify-center text-[10px] font-bold text-[#0369A1] flex-shrink-0">
                        {patient.firstName?.charAt(0) || 'P'}
                      </div>
                      <div>
                        <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>
                          {patient.firstName} {patient.lastName}
                        </div>
                        <div className="text-[10px] text-[#64748B]">{patient.email}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => grantAdminAccess(patient._id)}
                      disabled={actionLoading === patient._id}
                      className="px-2.5 py-1 bg-sky-600 hover:bg-sky-700 text-white text-[10px] font-bold rounded-lg transition disabled:opacity-50 flex items-center gap-1"
                    >
                      {actionLoading === patient._id ? 'Granting...' : (
                        <><Shield className="w-3 h-3" /> Grant</>
                      )}
                    </button>
                  </div>
                ))
              ) : patientSearch.length >= 2 ? (
                <div className="text-center py-8 text-[10px] text-[#94A3B8]">
                  No patients found matching "{patientSearch}"
                </div>
              ) : (
                <div className="text-center py-8 text-[10px] text-[#94A3B8]">
                  Type at least 2 characters to search
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
