'use client';
import { useState, useEffect } from 'react';
import { dashboardService } from '@/services/dashboardService';
import { AlertTriangle, Plus, Trash2, Edit3, Eye, EyeOff, Calendar, FileText, ExternalLink } from 'lucide-react';

export default function EmergencyTeaserTab() {
  const [teasers, setTeasers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingTeaser, setEditingTeaser] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'emergency',
    priority: 1,
    isActive: true,
    endDate: '',
    buttonLabel: '',
    buttonUrl: ''
  });

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      type: 'emergency',
      priority: 1,
      isActive: true,
      endDate: '',
      buttonLabel: '',
      buttonUrl: ''
    });
    setEditingTeaser(null);
    setIsCreating(false);
    setError('');
  };

  const fetchTeasers = async () => {
    try {
      setLoading(true);
      const response = await dashboardService.getEmergencyTeasers(true);
      if (response.success) {
        setTeasers(response.teasers || []);
      }
    } catch (err) {
      console.error('Error fetching emergency teasers:', err);
      setError('Failed to load emergency teasers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeasers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingTeaser) {
        const response = await dashboardService.updateEmergencyTeaser(editingTeaser._id, formData);
        if (response.success) {
          setSuccess('Emergency teaser updated successfully');
          await fetchTeasers();
          resetForm();
        } else {
          setError(response.message || 'Failed to update teaser');
        }
      } else {
        const response = await dashboardService.createEmergencyTeaser(formData);
        if (response.success) {
          setSuccess('Emergency teaser created successfully');
          await fetchTeasers();
          resetForm();
        } else {
          setError(response.message || 'Failed to create teaser');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save emergency teaser');
      console.error('Error saving emergency teaser:', err);
    }
  };

  const handleEdit = (teaser) => {
    setEditingTeaser(teaser);
    setFormData({
      title: teaser.title,
      content: teaser.content,
      type: teaser.type,
      priority: teaser.priority,
      isActive: teaser.isActive,
      endDate: teaser.endDate ? new Date(teaser.endDate).toISOString().split('T')[0] : '',
      buttonLabel: teaser.buttonLabel || '',
      buttonUrl: teaser.buttonUrl || ''
    });
    setIsCreating(true);
    setError('');
    setSuccess('');
  };

  const handleToggleActive = async (teaser) => {
    try {
      const response = await dashboardService.updateEmergencyTeaser(teaser._id, {
        isActive: !teaser.isActive
      });
      if (response.success) {
        setSuccess(`Teaser ${!teaser.isActive ? 'activated' : 'deactivated'} successfully`);
        await fetchTeasers();
      }
    } catch (err) {
      setError('Failed to toggle teaser status');
      console.error('Error toggling teaser:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this emergency teaser?')) return;

    try {
      const response = await dashboardService.deleteEmergencyTeaser(id);
      if (response.success) {
        setSuccess('Emergency teaser deleted successfully');
        await fetchTeasers();
      } else {
        setError(response.message || 'Failed to delete teaser');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete emergency teaser');
      console.error('Error deleting emergency teaser:', err);
    }
  };

  // Clear success message after 4 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const getTypeBadge = (type) => {
    const styles = {
      emergency: 'bg-red-100 text-red-800 border-red-200',
      warning: 'bg-amber-100 text-amber-800 border-amber-200',
      info: 'bg-sky-100 text-sky-800 border-sky-200',
      update: 'bg-blue-100 text-blue-800 border-blue-200',
      success: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    };
    return styles[type] || styles.info;
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 space-y-6">
      
      {/* Header */}
      <div className="pb-4 border-b border-[#F1F5F9] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">Emergency Teaser</h2>
            <p className="text-xs text-[#64748B] mt-0.5 font-semibold">
              Manage site-wide emergency banners visible to all visitors
            </p>
          </div>
        </div>
        
        <button
          onClick={() => { setIsCreating(true); setEditingTeaser(null); setError(''); setSuccess(''); }}
          className="px-4 py-2 bg-sky-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" /> New Teaser
        </button>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-800 rounded-xl text-xs font-bold">
          {error}
        </div>
      )}
      {success && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-xs font-bold">
          {success}
        </div>
      )}

      {/* Create / Edit Form */}
      {isCreating && (
        <div className="p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E2E8F0] mb-4">
            <FileText className="w-4 h-4 text-red-600" />
            <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
              {editingTeaser ? 'Edit Emergency Teaser' : 'Create New Emergency Teaser'}
            </h3>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#475569] mb-1.5 uppercase">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full text-xs text-[#334155] px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20"
                required
                placeholder="e.g. Clinic Closure Notice"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#475569] mb-1.5 uppercase">
                Content *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full text-xs text-[#334155] px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 resize-y"
                rows="3"
                required
                placeholder="Write the emergency teaser message here..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#475569] mb-1.5 uppercase">
                  Category Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full text-xs text-[#334155] px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 cursor-pointer"
                >
                  <option value="emergency">Emergency</option>
                  <option value="warning">Warning</option>
                  <option value="info">Info</option>
                  <option value="update">Update</option>
                  <option value="success">Success</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#475569] mb-1.5 uppercase">
                  Priority (1 = Highest)
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: parseInt(e.target.value)})}
                  className="w-full text-xs text-[#334155] px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 cursor-pointer"
                >
                  <option value="1">1 - Highest</option>
                  <option value="2">2</option>
                  <option value="3">3 - Normal</option>
                  <option value="4">4</option>
                  <option value="5">5 - Lowest</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#475569] mb-1.5 uppercase">
                  Expiration Date (Optional)
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  className="w-full text-xs text-[#334155] px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="teaserIsActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="teaserIsActive" className="text-xs font-bold text-[#475569] cursor-pointer">
                Active and visible to all website visitors
              </label>
            </div>

            {/* Optional Button Section */}
            <div className="pt-3 border-t border-[#E2E8F0]">
              <p className="text-xs font-bold text-[#475569] uppercase mb-3 flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5" />
                Action Button (Optional)
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#475569] mb-1.5 uppercase">
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={formData.buttonLabel}
                    onChange={(e) => setFormData({...formData, buttonLabel: e.target.value})}
                    className="w-full text-xs text-[#334155] px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20"
                    placeholder="e.g. Book Appointment"
                    maxLength={100}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#475569] mb-1.5 uppercase">
                    Button Link URL
                  </label>
                  <input
                    type="text"
                    value={formData.buttonUrl}
                    onChange={(e) => setFormData({...formData, buttonUrl: e.target.value})}
                    className="w-full text-xs text-[#334155] px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20"
                    placeholder="e.g. /appointment or https://example.com"
                    maxLength={500}
                  />
                </div>
              </div>
              <p className="text-[10px] text-[#94A3B8] mt-1.5">Leave both fields empty for no button. Use relative paths like /appointment or full URLs.</p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 text-xs font-bold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition disabled:opacity-50"
              >
                {editingTeaser ? 'Update Teaser' : 'Create Teaser'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Teaser List */}
      {loading ? (
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-red-500 border-t-transparent mx-auto"></div>
          <p className="mt-3 text-xs text-[#94A3B8]">Loading emergency teasers...</p>
        </div>
      ) : teasers.length === 0 ? (
        <div className="text-center py-16 text-[#94A3B8]">
          <AlertTriangle className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm font-semibold">No emergency teasers</p>
          <p className="text-xs mt-1">Create one to display a site-wide banner to visitors.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {teasers.map((teaser) => (
            <div
              key={teaser._id}
              className={`rounded-xl border p-4 transition-all ${
                teaser.isActive
                  ? 'bg-white border-red-200 shadow-sm'
                  : 'bg-gray-50 border-[#E2E8F0] opacity-60'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${getTypeBadge(teaser.type)}`}>
                      {teaser.type}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      teaser.isActive
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        : 'bg-gray-100 text-gray-500 border border-gray-200'
                    }`}>
                      {teaser.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                    <span className="text-[10px] text-[#94A3B8] font-medium">
                      Priority: {teaser.priority}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#0F172A] mb-1">{teaser.title}</h4>
                  <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">{teaser.content}</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-[#94A3B8] flex-wrap">
                    <span>Created: {new Date(teaser.createdAt).toLocaleDateString()}</span>
                    {teaser.endDate && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Expires: {new Date(teaser.endDate).toLocaleDateString()}
                      </span>
                    )}
                    {teaser.createdBy && (
                      <span>By: {teaser.createdBy.firstName} {teaser.createdBy.lastName}</span>
                    )}
                    {teaser.buttonLabel && teaser.buttonUrl && (
                      <span className="flex items-center gap-1 text-sky-600">
                        <ExternalLink className="w-3 h-3" />
                        Button: {teaser.buttonLabel}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => handleToggleActive(teaser)}
                    title={teaser.isActive ? 'Deactivate' : 'Activate'}
                    className={`p-1.5 rounded-lg transition text-xs ${
                      teaser.isActive
                        ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {teaser.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => handleEdit(teaser)}
                    title="Edit"
                    className="p-1.5 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 transition"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(teaser._id)}
                    title="Delete"
                    className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
