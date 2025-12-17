"use client";

import { useState, useEffect } from 'react';
import { dashboardService } from '@/services/dashboardService';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    if (announcements.length > 1) {
      const interval = setInterval(() => {
        setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [announcements.length]);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await dashboardService.getAnnouncements(false);
      if (response.success) {
        setAnnouncements(response.announcements || []);
      }
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeStyles = (type) => {
    switch (type) {
      case 'emergency':
        return 'bg-red-100 border-red-300 text-red-800';
      case 'warning':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'success':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'update':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      default:
        return 'bg-sky-100 border-sky-300 text-sky-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'emergency':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'success':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'update':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <div className="bg-sky-100 border border-sky-300 rounded-lg p-4 backdrop-blur-sm bg-opacity-90 animate-pulse">
        <div className="h-4 bg-sky-200 rounded w-1/4 mb-2"></div>
        <div className="h-3 bg-sky-200 rounded w-3/4"></div>
      </div>
    );
  }

  if (announcements.length === 0) {
    return null;
  }

  const announcement = announcements[currentAnnouncement];

  return (
    <div className={`${getTypeStyles(announcement.type)} rounded-lg border backdrop-blur-sm bg-opacity-90 transition-all duration-300 ${isExpanded ? 'p-4' : 'p-3'}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-0.5">
            {getTypeIcon(announcement.type)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-sm sm:text-base">
                {announcement.title}
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white bg-opacity-50">
                {announcement.type.toUpperCase()}
              </span>
            </div>
            
            <div className={`${isExpanded ? 'block' : 'line-clamp-2'} text-sm`}>
              {announcement.content}
            </div>
            
            <div className="mt-2 flex items-center justify-between text-xs text-opacity-70">
              <span>
                {new Date(announcement.createdAt).toLocaleDateString()}
              </span>
              
              <div className="flex items-center space-x-3">
                {announcements.length > 1 && (
                  <div className="flex items-center space-x-1">
                    {announcements.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentAnnouncement(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentAnnouncement 
                            ? 'bg-current opacity-100' 
                            : 'bg-current opacity-30'
                        }`}
                      />
                    ))}
                  </div>
                )}
                
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-current hover:opacity-80 transition-opacity"
                >
                  {isExpanded ? 'Show Less' : 'Read More'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;