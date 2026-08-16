import { Calendar, User, Eye, Edit, Trash2 } from 'lucide-react';

const AnnouncementList = ({ announcements, onEdit, onDelete, theme }) => {
  const isDark = theme === 'dark';
  const getTypeBadge = (type) => {
    const styles = {
      emergency: 'bg-rose-50 text-rose-800 border-rose-100',
      warning: 'bg-amber-50 text-amber-800 border-amber-100',
      success: 'bg-emerald-50 text-emerald-800 border-emerald-100',
      update: 'bg-sky-50 text-sky-800 border-sky-100',
      info: 'bg-[#F1F5F9] text-[#334155] border-[#E2E8F0]'
    };
    return (
      <span className={`px-2 py-0.5 border rounded-lg text-[9px] font-bold uppercase tracking-wider ${styles[type] || styles.info}`}>
        {type}
      </span>
    );
  };

  return (
    <div className="space-y-3">
      {announcements.length === 0 ? (
        <div className={`text-center py-12 text-xs border rounded-2xl font-semibold ${
          isDark ? 'bg-[#1E293B] border-[#334155] text-slate-400' : 'bg-[#F8FAFC]/50 border-[#E2E8F0] text-[#94A3B8]'
        }`}>
          No announcements published yet. Click "New Announcement" above to publish one.
        </div>
      ) : (
        announcements.map((announcement) => (
          <div key={announcement._id} className={`border rounded-2xl p-4 transition space-y-3 ${
            isDark ? 'bg-[#1E293B] border-[#334155] hover:border-[#475569]' : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1]'
          }`}>
            <div className="flex justify-between items-start">
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className={`font-bold text-xs ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>
                    {announcement.title}
                  </h3>
                  {getTypeBadge(announcement.type)}
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    announcement.isActive 
                      ? 'bg-emerald-50 text-emerald-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {announcement.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <span className={`text-[10px] font-semibold ${isDark ? 'text-slate-400' : 'text-[#64748B]'}`}>
                    Priority rank: {announcement.priority}
                  </span>
                </div>
                
                <p className={`text-xs leading-relaxed font-medium ${isDark ? 'text-slate-300' : 'text-[#475569]'}`}>
                  {announcement.content}
                </p>
                
                <div className="flex items-center text-[10px] font-bold text-[#94A3B8] space-x-4 pt-1">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Created: {new Date(announcement.createdAt).toLocaleDateString()}</span>
                  {announcement.endDate && (
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> Expires: {new Date(announcement.endDate).toLocaleDateString()}</span>
                  )}
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> By: {announcement.createdBy?.firstName || 'Admin'}</span>
                </div>
              </div>
              
              <div className="flex gap-1.5 ml-4 flex-shrink-0">
                <button
                  onClick={() => onEdit(announcement)}
                  className={`p-1.5 text-sky-600 rounded-lg transition ${isDark ? 'hover:bg-[#334155]' : 'hover:bg-sky-50'}`}
                  title="Edit announcement"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(announcement._id)}
                  className={`p-1.5 text-rose-600 rounded-lg transition ${isDark ? 'hover:bg-[#334155]' : 'hover:bg-rose-50'}`}
                  title="Delete announcement"
                >
                  <Trash2 className="w-4 h-4" />
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