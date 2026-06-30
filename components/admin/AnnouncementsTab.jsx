'use client';
import { useState, useEffect } from 'react';
import { dashboardService } from '@/services/dashboardService';
import AnnouncementForm from './AnnouncementForm';
import AnnouncementList from './AnnouncementList';
import { Megaphone, Plus, Sparkles } from 'lucide-react';

export default function AnnouncementsTab() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await dashboardService.getAnnouncements(true);
      if (response.success) {
        setAnnouncements(response.announcements || []);
      }
    } catch (error) {
      console.error('Error fetching announcements:', error);
      setError('Failed to load announcements');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      const response = await dashboardService.createAnnouncement(formData);
      if (response.success) {
        await fetchAnnouncements();
        setIsCreating(false);
      } else {
        setError(response.message || 'Failed to create announcement');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create announcement');
      console.error('Error creating announcement:', error);
    }
  };

  const handleUpdate = async (id, formData) => {
    try {
      const response = await dashboardService.updateAnnouncement(id, formData);
      if (response.success) {
        await fetchAnnouncements();
        setEditingAnnouncement(null);
      } else {
        setError(response.message || 'Failed to update announcement');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update announcement');
      console.error('Error updating announcement:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this announcement?')) return;

    try {
      const response = await dashboardService.deleteAnnouncement(id);
      if (response.success) {
        await fetchAnnouncements();
      } else {
        alert(response.message || 'Failed to delete announcement');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete announcement');
      console.error('Error deleting announcement:', error);
    }
  };

  const handleEdit = (announcement) => {
    setEditingAnnouncement(announcement);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 space-y-6">
      
      {/* Header */}
      <div className="pb-4 border-b border-[#F1F5F9] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-sky-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <Megaphone className="w-5 h-5 text-sky-600" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">Homepage Announcements</h2>
            <p className="text-xs text-[#64748B] mt-0.5 font-semibold">
              Manage notifications and priorities displayed on the patient home portal
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" /> New Announcement
        </button>
      </div>

      {error && (
        <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-800 rounded-xl text-xs font-bold">
          {error}
        </div>
      )}

      {(isCreating || editingAnnouncement) && (
        <div className="p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl">
          <AnnouncementForm
            announcement={editingAnnouncement}
            onSubmit={editingAnnouncement ? 
              (data) => handleUpdate(editingAnnouncement._id, data) : 
              handleCreate}
            onCancel={() => {
              setIsCreating(false);
              setEditingAnnouncement(null);
            }}
          />
        </div>
      )}

      {loading ? (
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#0EA5E9] border-t-transparent mx-auto"></div>
          <p className="mt-3 text-xs text-[#94A3B8]">Loading announcements...</p>
        </div>
      ) : (
        <AnnouncementList
          announcements={announcements}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}