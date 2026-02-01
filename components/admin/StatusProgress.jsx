const StatusProgress = ({ statusData, total }) => {
  const statusColors = {
    Active: 'bg-green-500',
    Booked: 'bg-blue-500',
    Accepted: 'bg-purple-500',
    Rejected: 'bg-red-500'
  };

  return (
    <div className="space-y-2">
      {Object.entries(statusData).map(([status, count]) => {
        const percentage = total > 0 ? (count / total) * 100 : 0;
        return (
          <div key={status} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${statusColors[status]}`}></div>
              <span className="text-sm font-medium text-gray-700">{status}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-900">{count}</span>
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${statusColors[status]} transition-all duration-300`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 w-8">{Math.round(percentage)}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatusProgress;