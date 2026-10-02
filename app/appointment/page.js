"use client";

import Link from 'next/link';

export default function BookAppointment() {

  return (
    <div className="min-h-screen bg-white">
      {/* Clean Header */}
      <header className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between mb-10">
            <Link 
              href="/" 
              className="flex items-center text-gray-600 hover:text-gray-900 text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
          
          <div className="text-center mb-12">
            <h1 className="text-3xl font-light text-gray-900 mb-4">
              Book an Appointment
            </h1>
            <div className="h-px w-20 bg-sky-900 mx-auto mb-5"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-2">
              How can we help you today?
            </p>
            <p className="text-gray-500 text-base max-w-2xl mx-auto">
              Choose the option that best describes what you need.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content - Four Booking Options */}
      <main className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10">

          {/* Card 1: New Patient */}
          <div 
            className="bg-white border-2 border-sky-200 rounded-xl p-5 sm:p-6 transition-all duration-200 hover:border-sky-300 hover:shadow-md relative overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Accent badge */}
              <div className="absolute top-0 right-0 bg-sky-600 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-bl-lg">
                Now Accepting
              </div>

              {/* Icon */}
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-sky-50">
                <div className="text-sky-900">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                New Patient – Find a Family Doctor
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-4 text-xs sm:text-sm leading-relaxed">
                Looking for a family doctor? We're expanding and accepting new patients. Join our waitlist.
              </p>
            </div>

            {/* Join Waitlist Button */}
            <Link
              href="/waitlist"
              className="block w-full text-center py-2.5 px-4 rounded-lg font-medium text-xs sm:text-sm bg-gradient-to-r from-sky-600 to-sky-700 text-white hover:from-sky-700 hover:to-sky-800 transition-all duration-200"
            >
              Join the Waitlist
            </Link>
          </div>

          {/* Card 2: Existing Patient */}
          <div 
            className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 transition-all duration-200 hover:border-gray-300 hover:shadow-sm flex flex-col justify-between"
          >
            <div>
              {/* Icon */}
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-sky-50">
                <div className="text-sky-900">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Existing Patient
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-4 text-xs sm:text-sm leading-relaxed">
                Already a patient of St Mary Rideau Family Clinic? Book directly with your family doctor.
              </p>
            </div>

            {/* Direct Booking Link */}
            <a
              href="https://ocean.cognisantmd.com/online-booking/7b15e604-ee55-4d68-909f-a6b8d6039554"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-2.5 px-4 rounded-lg font-medium text-xs sm:text-sm bg-gradient-to-r from-sky-600 to-sky-700 text-white hover:from-sky-700 hover:to-sky-800 transition-all duration-200"
            >
              Book with Dr. Fagbolagun
            </a>
          </div>

          {/* Card 3: Dr. Okwechime Patients – Continuing Care */}
          <div 
            className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 transition-all duration-200 hover:border-gray-300 hover:shadow-sm flex flex-col justify-between"
          >
            <div>
              {/* Icon */}
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-sky-50">
                <div className="text-sky-900">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Dr. Okwechime Patients – Continuing Care
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-4 text-xs sm:text-sm leading-relaxed">
                For existing St Mary patients previously under the care of Dr. Okwechime to book continuing care appointments with Dr. Fagbolagun.
              </p>
            </div>

            {/* Direct Booking Link */}
            <a
              href="https://ocean.cognisantmd.com/online-booking/ad2f73f2-beb4-43ed-857a-e08ac46042a4"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-2.5 px-4 rounded-lg font-medium text-xs sm:text-sm bg-gradient-to-r from-sky-600 to-sky-700 text-white hover:from-sky-700 hover:to-sky-800 transition-all duration-200"
            >
              Dr. Okwechime Patients – Continuing Care
            </a>
          </div>

          {/* Card 4: Urgent / Same-Day & Walk-In Care */}
          <div 
            className="bg-white border-2 border-sky-200 rounded-xl p-5 sm:p-6 transition-all duration-200 hover:border-sky-300 hover:shadow-md flex flex-col justify-between"
          >
            <div>
              {/* Icon */}
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-sky-50">
                <div className="text-sky-900">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Urgent / Same-Day Care
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-4 text-xs sm:text-sm leading-relaxed">
                Need to see a doctor today? For urgent, non-emergency concerns and same-day care.
              </p>
            </div>

            <div>
              {/* Button */}
              <Link
                href="/book-appointment"
                className="block text-center py-2.5 px-4 rounded-lg font-medium text-xs sm:text-sm bg-gradient-to-r from-sky-600 to-sky-700 text-white hover:from-sky-700 hover:to-sky-800 transition-all duration-200"
              >
                Book Same-Day / Walk-In
              </Link>
            </div>
          </div>

        </div>

        {/* Emergency Notice */}
        <div className="text-center mb-8">
          <p className="inline-flex items-center text-xs sm:text-sm text-red-600 bg-red-50 border border-red-100 rounded-full px-4 py-2">
            <svg className="w-4 h-4 mr-2 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            For medical emergencies, please call 911 or go to the nearest Emergency Department.
          </p>
        </div>

        {/* Help Note - Responsive with Call Button */}
<div className="text-center mb-12">
  <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
    {/* Information Note */}
    <div className="inline-flex items-center text-sm sm:text-base text-gray-600 bg-gray-50 rounded-full px-4 sm:px-6 py-3 sm:py-3 w-full sm:w-auto">
      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="text-center sm:text-left">Need help choosing?</span>
    </div>
    
    {/* Call Button - White background with sky border */}
    <a 
      href="tel:+13438873470"
      className="
        inline-flex items-center justify-center 
        text-sm sm:text-base text-sky-900 
        bg-white border border-sky-300 
        rounded-full px-5 sm:px-8 py-3 sm:py-3
        hover:bg-sky-50 hover:border-sky-400 
        transition-all duration-200
        shadow-sm hover:shadow
        w-full sm:w-auto
      "
    >
      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-sky-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
      Call (343) 887-3470
    </a>
  </div>
</div>

        {/* Simple Footer */}
        <div className="border-t border-gray-100 pt-10 mt-16">
        </div>
      </main>
    </div>
  );
}