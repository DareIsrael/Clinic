'use client';
import Link from 'next/link';

export default function WaitingListConfirmation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xs reveal-pop">
        <div className="bg-white rounded-xl shadow-lg border border-sky-100 p-6 slick-card">
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-2 fun-float">
              <svg className="w-6 h-6 text-sky-600 icon-fun-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="text-center space-y-3 mb-4">
            <p className="text-sm font-semibold text-gray-800 leading-tight">
              Thank you for joining our waiting list!
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Our team will contact you shortly to schedule your appointment.
            </p>
          </div>
          <Link href="/" className="w-full bg-sky-600 text-white py-2.5 px-3 rounded-lg text-xs font-semibold hover:bg-sky-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300 block text-center transform hover:-translate-y-0.5">
            Back to Home
          </Link>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center">St Mary Rideau Clinic</p>
          </div>
        </div>
      </div>
    </div>
  );
}