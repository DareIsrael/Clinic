"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function BookAppointment() {
  const [expanded, setExpanded] = useState(null);

  const toggle = (id) => {
    setExpanded(expanded === id ? null : id);
  };

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

      {/* Main Content - Three Booking Options */}
      <main className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">

          {/* Card 1: New Patient - Find a Family Doctor */}
          <div 
            className="bg-white border-2 border-sky-200 rounded-xl p-8 transition-all duration-200 hover:border-sky-300 hover:shadow-md relative overflow-hidden"
          >
            {/* Accent badge */}
            <div className="absolute top-0 right-0 bg-sky-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
              Now Accepting
            </div>

            {/* Icon */}
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 bg-sky-50">
              <div className="text-sky-900">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-medium text-gray-900 mb-4">
              New Patient – Find a Family Doctor
            </h3>

            {/* Description */}
            <p className="text-gray-600 mb-2 text-base leading-relaxed">
              Looking for a family doctor?
            </p>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              We're expanding and currently accepting new patients. Book a Meet & Greet appointment directly with one of our family physicians.
            </p>

            {/* Toggle Button */}
            <button
              onClick={() => toggle('new')}
              className="block w-full text-center py-4 px-6 rounded-lg font-medium text-base bg-gradient-to-r from-sky-600 to-sky-700 text-white hover:from-sky-700 hover:to-sky-800 transition-all duration-200"
            >
              Book as a New Patient
            </button>

            {/* Expanded: Physician Selection */}
            {expanded === 'new' && (
              <div className="mt-6 pt-6 border-t border-sky-100 space-y-4">
                <p className="text-sm font-medium text-gray-700 mb-4">Choose your family physician:</p>
                
                {/* Dr. Fagbolagun */}
                <div className="bg-sky-50 rounded-lg p-4">
                  <p className="font-medium text-gray-900 mb-2">Dr. Fagbolagun</p>
                  <a
                    href="https://ocean.cognisantmd.com/online-booking/99384945-bcd8-488a-b8b3-df900083d940"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-3 px-4 rounded-lg text-sm font-medium bg-white border border-sky-300 text-sky-700 hover:bg-sky-100 transition-colors"
                  >
                    Book Meet & Greet
                  </a>
                </div>

                {/* Dr. Okwechime */}
                <div className="bg-sky-50 rounded-lg p-4">
                  <p className="font-medium text-gray-900 mb-2">Dr. Okwechime</p>
                  <a
                    href="https://ocean.cognisantmd.com/online-booking/70262f3f-89d8-4426-9166-4a002360c21b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-3 px-4 rounded-lg text-sm font-medium bg-white border border-sky-300 text-sky-700 hover:bg-sky-100 transition-colors"
                  >
                    Book Meet & Greet
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Card 2: Existing Patient */}
          <div 
            className="bg-white border border-gray-200 rounded-xl p-8 transition-all duration-200 hover:border-gray-300 hover:shadow-sm"
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 bg-sky-50">
              <div className="text-sky-900">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-medium text-gray-900 mb-4">
              Existing Patient
            </h3>

            {/* Description */}
            <p className="text-gray-600 mb-2 text-base leading-relaxed">
              Already a patient of St Mary Rideau Family Clinic?
            </p>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              Book your next appointment directly with your family doctor.
            </p>

            {/* Toggle Button */}
            <button
              onClick={() => toggle('existing')}
              className="block w-full text-center py-4 px-6 rounded-lg font-medium text-base bg-gradient-to-r from-sky-600 to-sky-700 text-white hover:from-sky-700 hover:to-sky-800 transition-all duration-200"
            >
              Book as an Existing Patient
            </button>

            {/* Expanded: Physician Selection */}
            {expanded === 'existing' && (
              <div className="mt-6 pt-6 border-t border-sky-100 space-y-4">
                {/* Dr. Fagbolagun */}
                <div className="bg-sky-50 rounded-lg p-4">
                  <p className="font-medium text-gray-900 mb-2">Dr. Fagbolagun</p>
                  <a
                    href="https://ocean.cognisantmd.com/online-booking/7b15e604-ee55-4d68-909f-a6b8d6039554"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-3 px-4 rounded-lg text-sm font-medium bg-white border border-sky-300 text-sky-700 hover:bg-sky-100 transition-colors"
                  >
                    Book Appointment
                  </a>
                </div>

                {/* Dr. Okwechime */}
                <div className="bg-sky-50 rounded-lg p-4">
                  <p className="font-medium text-gray-900 mb-2">Dr. Okwechime</p>
                  <a
                    href="https://ocean.cognisantmd.com/online-booking/5b641f80-4b63-4511-a6c9-5f04c97199c6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-3 px-4 rounded-lg text-sm font-medium bg-white border border-sky-300 text-sky-700 hover:bg-sky-100 transition-colors"
                  >
                    Book Appointment
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Card 3: Urgent / Same-Day & Walk-In Care */}
          <div 
            className="bg-white border-2 border-sky-200 rounded-xl p-8 transition-all duration-200 hover:border-sky-300 hover:shadow-md"
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 bg-sky-50">
              <div className="text-sky-900">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-medium text-gray-900 mb-4">
              Urgent / Same-Day & Walk-In Care
            </h3>

            {/* Description */}
            <p className="text-gray-600 mb-2 text-base leading-relaxed">
              Need to see a doctor today?
            </p>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              For urgent, non-emergency medical concerns, same-day appointments and walk-in care.
            </p>

            {/* Button - links to existing walk-in booking */}
            <Link
              href="/book-appointment"
              className="block text-center py-4 px-6 rounded-lg font-medium text-base bg-gradient-to-r from-sky-600 to-sky-700 text-white hover:from-sky-700 hover:to-sky-800 transition-all duration-200"
            >
              Book Same-Day / Walk-In
            </Link>

            {/* Emergency notice */}
            <div className="mt-6 pt-4 border-t border-sky-100">
              <p className="text-xs text-gray-500 flex items-start">
                <svg className="w-4 h-4 mr-1.5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                For medical emergencies, please call 911 or go to the nearest Emergency Department.
              </p>
            </div>
          </div>

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