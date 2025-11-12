export default function ServiceCard({ service, onClick }) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="p-6">
        <div className="text-4xl mb-4">{service.icon}</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
        <p className="text-gray-600 mb-4">{service.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{service.duration}</span>
          <span className="font-semibold text-sky-600">{service.price}</span>
        </div>
      </div>
    </div>
  );
}