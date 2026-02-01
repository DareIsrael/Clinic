'use client';
import { useState, useEffect } from 'react';
import { dashboardService } from '@/services/dashboardService';
import AnnouncementForm from './AnnouncementForm';
import AnnouncementList from './AnnouncementList';

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
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Announcements</h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage announcements displayed on the homepage
          </p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-sky-700 transition duration-300"
        >
          + New Announcement
        </button>
      </div>

      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {(isCreating || editingAnnouncement) && (
        <div className="mb-6">
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
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading announcements...</p>
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