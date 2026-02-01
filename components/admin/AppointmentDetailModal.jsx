'use client';
import AppointmentStatusDropdown from './AppointmentStatusDropdown';

const AppointmentDetailModal = ({ appointment, onClose, onStatusChange }) => {
  const formatDate = (dateString) => {
  if (!dateString) return '';
  
  if (typeof dateString === 'string' && dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
    const [year, month, day] = dateString.split('-');
    const dateObj = new Date(year, month - 1, day);
    
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  return dateString;
};

  const calculateAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
      ></div>
      
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">
              Appointment Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition duration-200 p-1 hover:bg-gray-100 rounded"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Appointment Header */}
          <div className="bg-sky-50 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  {appointment.firstName} {appointment.lastName}
                  <span className="ml-3 text-sm font-normal text-gray-600">
                    ({calculateAge(appointment.dateOfBirth)} years old)
                  </span>
                </h3>
                <p className="text-gray-600 mt-1">
                  Appointment ID: <span className="font-mono">{appointment._id}</span>
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Status</div>
                <div className="mt-1">
                  <AppointmentStatusDropdown 
                    appointment={appointment} 
                    onStatusChange={onStatusChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column: Patient Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">First Name</label>
                    <p className="text-gray-900 font-medium">{appointment.firstName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Last Name</label>
                    <p className="text-gray-900 font-medium">{appointment.lastName}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                  <p className="text-gray-900">{appointment.email}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                    <p className="text-gray-900">{appointment.cellPhone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Gender</label>
                    <p className="text-gray-900">{appointment.gender}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Date of Birth</label>
                  <p className="text-gray-900">
                    {new Date(appointment.dateOfBirth).toLocaleDateString()} 
                    <span className="ml-2 text-gray-500">
                      ({calculateAge(appointment.dateOfBirth)} years old)
                    </span>
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
                  <p className="text-gray-900">{appointment.address}</p>
                  <p className="text-gray-600 text-sm">
                    {appointment.city && `${appointment.city}, `}
                    {appointment.province} {appointment.postalCode}
                    {appointment.country && `, ${appointment.country}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Appointment Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Details</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Appointment Date</label>
                    <p className="text-gray-900 font-medium">{formatDate(appointment.appointmentDate)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Appointment Time</label>
                    <p className="text-gray-900 font-medium">{appointment.appointmentTime}</p>
                  </div>
                </div>
                
                
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Healthcare Information</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Healthcare Number</p>
                      <p className="text-gray-900">{appointment.healthcareNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Healthcare Province</p>
                      <p className="text-gray-900">{appointment.healthcareProvince}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Reason for Appointment</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded">{appointment.reason}</p>
                </div>
                
                {appointment.notes && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Additional Notes</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded">{appointment.notes}</p>
                  </div>
                )}
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Created At</p>
                      <p className="text-gray-900">
                        {new Date(appointment.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Last Updated</p>
                      <p className="text-gray-900">
                        {new Date(appointment.updatedAt || appointment.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200 font-medium"
            >
              Close
            </button>
            {/* <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition duration-200 font-medium"
            >
              Print Details
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailModal;