'use client';
import { useState } from 'react';
import { Sparkles, Calendar, FileText } from 'lucide-react';

const AnnouncementForm = ({ announcement, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: announcement?.title || '',
    content: announcement?.content || '',
    type: announcement?.type || 'info',
    priority: announcement?.priority || 3,
    isActive: announcement?.isActive !== undefined ? announcement.isActive : true,
    endDate: announcement?.endDate ? new Date(announcement.endDate).toISOString().split('T')[0] : ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await onSubmit(formData);
    } catch (error) {
      setError(error.message || 'Failed to save announcement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-[#E2E8F0]">
        <FileText className="w-4 h-4 text-sky-600" />
        <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
          {announcement ? 'Edit Announcement Form' : 'Create New Announcement Form'}
        </h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-100 text-rose-800 rounded-xl text-xs font-bold">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-[#475569] mb-1.5 uppercase">
            Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full text-xs text-[#334155] px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20"
            required
            placeholder="e.g. Holiday hours reminder"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#475569] mb-1.5 uppercase">
            Content Description *
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            className="w-full text-xs text-[#334155] px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20 resize-y"
            rows="4"
            required
            placeholder="Write announcement description here..."
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
              className="w-full text-xs text-[#334155] px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20 cursor-pointer"
            >
              <option value="info">Info</option>
              <option value="update">Update</option>
              <option value="warning">Warning</option>
              <option value="emergency">Emergency</option>
              <option value="success">Success</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#475569] mb-1.5 uppercase">
              Priority Rank (1-5)
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: parseInt(e.target.value)})}
              className="w-full text-xs text-[#334155] px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20 cursor-pointer"
            >
              <option value="1">1 - Highest Priority</option>
              <option value="2">2</option>
              <option value="3">3 - Normal Priority</option>
              <option value="4">4</option>
              <option value="5">5 - Lowest Priority</option>
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
              className="w-full text-xs text-[#334155] px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isActive"
            checked={formData.isActive}
            onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
            className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded cursor-pointer"
          />
          <label htmlFor="isActive" className="text-xs font-bold text-[#475569] cursor-pointer">
            Active and visible on patients portal homepage
          </label>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-bold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : announcement ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AnnouncementForm;