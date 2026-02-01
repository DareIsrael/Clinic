const AnnouncementList = ({ announcements, onEdit, onDelete }) => {
  const getTypeBadge = (type) => {
    const styles = {
      emergency: 'bg-red-100 text-red-800',
      warning: 'bg-yellow-100 text-yellow-800',
      success: 'bg-green-100 text-green-800',
      update: 'bg-blue-100 text-blue-800',
      info: 'bg-sky-100 text-sky-800'
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${styles[type] || styles.info}`}>
        {type.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {announcements.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No announcements yet. Create one to display on the homepage.
        </div>
      ) : (
        announcements.map((announcement) => (
          <div key={announcement._id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-semibold text-gray-900">
                    {announcement.title}
                  </h3>
                  {getTypeBadge(announcement.type)}
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    announcement.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {announcement.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <span className="text-xs text-gray-500">
                    Priority: {announcement.priority}
                  </span>
                </div>
                
                <p className="text-gray-700 text-sm mb-3">
                  {announcement.content}
                </p>
                
                <div className="flex items-center text-xs text-gray-500 space-x-4">
                  <span>Created: {new Date(announcement.createdAt).toLocaleDateString()}</span>
                  {announcement.endDate && (
                    <span>Expires: {new Date(announcement.endDate).toLocaleDateString()}</span>
                  )}
                  <span>By: {announcement.createdBy?.firstName || 'Admin'}</span>
                </div>
              </div>
              
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => onEdit(announcement)}
                  className="text-sky-600 hover:text-sky-800"
                  title="Edit"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete(announcement._id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AnnouncementList;