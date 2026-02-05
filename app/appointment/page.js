"use client";

import Link from 'next/link';

export default function BookAppointment() {
  const options = [
    {
      id: 1,
      title: "Dr. Fagbolagun's Rostered Patients",
      description: "For patients already registered with Dr. Fagbolagun for ongoing care.",
      note: "(Existing patients only)",
      buttonText: "Book as Existing Patient",
      link: "https://ocean.cognisantmd.com/online-booking/7b15e604-ee55-4d68-909f-a6b8d6039554",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Same-Day Walk-In Appointments",
      description: "For new or unregistered patients who need to be seen today.",
      note: "(Urgent or one-time visits)",
      buttonText: "Book Walk-In Appointment",
      link: "/book-appointment",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Register with a Family Doctor",
      description: "Join the list to become a permanent patient for long-term care.",
      note: "(Not for same-day visits)",
      buttonText: "Join Waitlist",
      link: "/waitlist",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

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
            
            {/* <div className="text-right">
              <p className="text-sm text-gray-500">St Mary Rideau Family Clinic</p>
              <p className="text-xs text-gray-400">158 Rideau Street, Ottawa</p>
            </div> */}
          </div>
          
          <div className="text-center mb-12">
            <h1 className="text-3xl font-light text-gray-900 mb-4">
              Book an Appointment
            </h1>
            <div className="h-px w-20 bg-sky-900 mx-auto mb-5"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Select the option that best fits your needs
            </p>
          </div>
        </div>
      </header>

      {/* Main Content - Clean Booking Options */}
      <main className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {options.map((option) => (
            <div 
              key={option.id}
              className="
                bg-white border border-gray-200 rounded-xl p-8 
                transition-all duration-200 hover:border-gray-300 
                hover:shadow-sm cursor-pointer
              "
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 bg-sky-50">
                <div className="text-sky-900">
                  {option.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-medium text-gray-900 mb-4">
                {option.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-4 text-base leading-relaxed">
                {option.description}
              </p>

              {/* Note */}
              <p className="text-sm text-gray-500 mb-8">
                {option.note}
              </p>

              {/* Sky-900 Button - Always visible with sky color */}
              <Link
                href={option.link}
                className="
                  block text-center py-4 px-6 rounded-lg font-medium 
                  text-base bg-gradient-to-r from-sky-600 to-sky-700 text-white hover:bg-sky-800 
                  transition-colors
                "
              >
                {option.buttonText}
              </Link>
            </div>
          ))}
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
          {/* <div className="text-center text-base text-gray-500">
            <p className="font-medium">St Mary Rideau Family Clinic</p>
            <p className="mt-2">158 Rideau Street, Ottawa, K1N 5X6</p>
            <p className="mt-1">(343) 887-3470</p>
          </div> */}
        </div>
      </main>
    </div>
  );
}