'use client';
import WaitlistStatusDropdown from './WaitlistStatusDropdown';

const WaitlistDetailModal = ({ entry, onClose, onStatusChange }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
      ></div>
      
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[85vh] overflow-y-auto relative shadow-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">
              Waitlist Entry Details
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                  <dd className="text-sm text-gray-900">{entry.firstName} {entry.lastName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="text-sm text-gray-900">{entry.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="text-sm text-gray-900">{entry.cellPhone || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Gender</dt>
                  <dd className="text-sm text-gray-900">{entry.gender || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                  <dd className="text-sm text-gray-900">
                    {entry.dateOfBirth ? new Date(entry.dateOfBirth).toLocaleDateString() : 'N/A'}
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact & Healthcare</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="text-sm text-gray-900">{entry.address || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Country</dt>
                  <dd className="text-sm text-gray-900">{entry.country || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Postal Code</dt>
                  <dd className="text-sm text-gray-900">{entry.postalCode || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Healthcare Number</dt>
                  <dd className="text-sm text-gray-900">{entry.healthcareNumber || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Healthcare Province</dt>
                  <dd className="text-sm text-gray-900">{entry.healthcareProvince || 'N/A'}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Waitlist Information</h3>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">Joined Waitlist</dt>
                <dd className="text-sm text-gray-900">
                  {entry.createdAt ? new Date(entry.createdAt).toLocaleDateString() : 'N/A'}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="text-sm mt-1">
                  <WaitlistStatusDropdown 
                    waitlistEntry={entry} 
                    onStatusChange={onStatusChange}
                  />
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitlistDetailModal;