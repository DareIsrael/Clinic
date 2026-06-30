'use client';

const StatusProgress = ({ statusData, total }) => {
  const statusColors = {
    Active: 'bg-emerald-500',
    Booked: 'bg-blue-500',
    Accepted: 'bg-purple-500',
    Rejected: 'bg-rose-500'
  };

  return (
    <div className="space-y-1.5">
      {Object.entries(statusData).map(([status, count]) => {
        const percentage = total > 0 ? (count / total) * 100 : 0;
        return (
          <div key={status} className="flex items-center justify-between text-[11px] font-semibold text-[#64748B]">
            <div className="flex items-center space-x-2 w-28">
              <span className={`w-1.5 h-1.5 rounded-full ${statusColors[status] || 'bg-gray-400'}`}></span>
              <span className="truncate">{status}</span>
            </div>
            
            <div className="flex-1 flex items-center justify-end space-x-2">
              <span className="font-bold text-[#0F172A] w-6 text-right">{count}</span>
              <div className="w-16 bg-[#F1F5F9] rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${statusColors[status] || 'bg-gray-400'} transition-all duration-300`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="text-[9px] text-[#94A3B8] w-8 text-right font-black">{Math.round(percentage)}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatusProgress;