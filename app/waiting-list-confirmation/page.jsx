// app/waiting-list/confirmation/page.jsx
import Link from 'next/link';

export default function WaitingListConfirmation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xs">
        <div className="bg-white rounded-xl shadow-sm border border-sky-100 p-6">
          {/* Tiny Header */}
          <div className="text-center mb-4">
            <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg 
                className="w-5 h-5 text-sky-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
          </div>

          {/* Compact Content */}
          <div className="text-center space-y-3 mb-4">
            <p className="text-sm text-gray-700 leading-tight">
              Thank you for joining our waiting list.
            </p>
            <p className="text-sm text-gray-600 leading-tight">
              Our team will contact you shortly to schedule your appointment.
            </p>
          </div>

          {/* Small Home Button */}
          <Link 
            href="/"
            className="w-full bg-sky-600 text-white py-2 px-3 rounded-lg text-xs font-medium hover:bg-sky-700 focus:outline-none focus:ring-1 focus:ring-sky-500 transition duration-200 block text-center"
          >
            Back to Home
          </Link>

          {/* Tiny Footer */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center">
              St Mary Rideau Clinic
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}