const MonthlyTrendsChart = ({ trendsData, year }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const statusColors = {
    Active: 'bg-green-500',
    Booked: 'bg-blue-500', 
    Accepted: 'bg-purple-500',
    Rejected: 'bg-red-500'
  };

  if (!trendsData || !trendsData.monthlyRegistrations) {
    return <div className="text-gray-500 text-center py-4">No trend data available</div>;
  }

  const maxRegistration = Math.max(...trendsData.monthlyRegistrations, 1);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Monthly Waitlist Registrations - {year}</h4>
        <div className="flex items-end justify-between space-x-2 h-48">
          {trendsData.monthlyRegistrations.map((count, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="text-xs text-gray-500 mb-1">{count}</div>
              <div
                className="bg-sky-500 w-full rounded-t transition-all duration-300 hover:bg-sky-600 cursor-pointer"
                style={{ height: `${(count / maxRegistration) * 90}%` }}
                title={`${months[index]}: ${count} registrations`}
              ></div>
              <div className="text-xs text-gray-500 mt-1">{months[index]}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Monthly Status Distribution - {year}</h4>
        <div className="space-y-4">
          {Object.entries(trendsData.monthlyStatusBreakdown || {}).map(([month, statusData]) => (
            <div key={month} className="border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-800 mb-3">
                {monthNames[parseInt(month) - 1]}
              </h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(statusData).map(([status, count]) => (
                  <div key={status} className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${statusColors[status]}`}></div>
                    <span className="text-sm font-medium text-gray-700">{status}:</span>
                    <span className="text-sm font-bold text-gray-900">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthlyTrendsChart;