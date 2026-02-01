const MonthlyChart = ({ data, year, title }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const maxValue = Math.max(...data, 1);

  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium text-gray-700 mb-3">{title} - {year}</h4>
      <div className="flex items-end justify-between space-x-1 h-32">
        {data.map((value, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="text-xs text-gray-500 mb-1">{value}</div>
            <div
              className="bg-sky-500 w-full rounded-t transition-all duration-300 hover:bg-sky-600"
              style={{ height: `${(value / maxValue) * 80}%` }}
              title={`${months[index]}: ${value}`}
            ></div>
            <div className="text-xs text-gray-500 mt-1">{months[index]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyChart;