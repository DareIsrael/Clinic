// import Link from 'next/link';

// export default function Home() {
//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="relative min-h-screen flex items-center justify-start bg-gray-900 overflow-hidden">
//         {/* Background Image */}
//         <div 
//           className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//           style={{
//             backgroundImage: 'url("https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
//           }}
//         >
//           <div className="absolute inset-0 bg-blue-900/70"></div>
//         </div>

//         {/* Compact Text Box */}
//         <div className="relative z-10 max-w-md mx-4 lg:mx-16 xl:mx-24 bg-blue-800/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-blue-400/30 shadow-xl">
//           {/* Clinic Name */}
//           <div className="mb-4">
//             <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
//               St Mary Rideau
//               <span className="block text-blue-200 text-xl lg:text-2xl">Family Clinic</span>
//             </h1>
//             <div className="w-12 h-0.5 bg-blue-300 rounded-full mb-3"></div>
//           </div>

//           {/* Physician */}
//           <div className="mb-4">
//             <p className="text-lg text-blue-100 font-medium">
//               Dr. Oluwaseun FAGBOLAGUN
//             </p>
//             <p className="text-sm text-blue-200/80">
//               MD CCFP MRCGP • Family Physician
//             </p>
//           </div>

//           {/* Welcome Message */}
//           <div className="mb-4">
//             <p className="text-sm text-white leading-relaxed mb-2">
//               Your family's health is our priority. Compassionate, comprehensive care for all ages in a welcoming environment.
//             </p>
//           </div>

//           {/* Tagline */}
//           <div className="mb-4 p-3 bg-blue-700/50 rounded-lg border-l-2 border-blue-300">
//             <p className="text-sm text-white font-light italic">
//               "Your Family's Health, Our Mission"
//             </p>
//           </div>

//           {/* Call-to-Action Buttons */}
//           <div className="flex flex-col gap-3">
//             <Link 
//               href="/appointments-Booking" 
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-center transition-all duration-200 hover:bg-blue-700 hover:shadow-lg"
//             >
//               Book Appointment
//             </Link>
            
//             <Link 
//               href="/services" 
//               className="border border-blue-400/50 text-white px-6 py-3 rounded-lg font-semibold text-center transition-all duration-200 hover:bg-blue-700/50 hover:border-blue-300"
//             >
//               Our Services
//             </Link>
//           </div>

//           {/* Trust Indicators */}
//           <div className="mt-4 flex flex-wrap gap-3 text-blue-200/80 text-xs">
//             <div className="flex items-center gap-1">
//               <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
//               <span>New Patients Welcome</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
//               <span>OHIP Covered</span>
//             </div>
//           </div>
//         </div>

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
//           <div className="flex flex-col items-center text-blue-200/60">
//             <span className="text-xs mb-1">Scroll</span>
//             <div className="w-5 h-8 border border-blue-300/30 rounded-full flex justify-center">
//               <div className="w-0.5 h-2 bg-blue-300/50 rounded-full mt-2 animate-bounce"></div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Services Preview */}
//       <section className="py-16 bg-white">
//         <div className="max-w-4xl mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-2xl font-bold text-gray-800 mb-3">
//               Our Services
//             </h2>
//             <div className="w-12 h-0.5 bg-blue-600 rounded-full mx-auto mb-4"></div>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Comprehensive medical care for your entire family
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[
//               {
//                 icon: (
//                   <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                   </svg>
//                 ),
//                 title: 'Family Medicine',
//                 description: 'Primary care for all ages from infants to seniors'
//               },
//               {
//                 icon: (
//                   <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                   </svg>
//                 ),
//                 title: 'Chronic Care',
//                 description: 'Diabetes, hypertension and heart condition management'
//               },
//               {
//                 icon: (
//                   <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                   </svg>
//                 ),
//                 title: 'Preventive Health',
//                 description: 'Regular check-ups, vaccinations and health screenings'
//               }
//             ].map((service, index) => (
//               <div 
//                 key={index}
//                 className="bg-blue-50 rounded-xl p-6 border border-blue-100 hover:border-blue-300 transition-all duration-200 text-center"
//               >
//                 <div className="text-blue-600 mb-4 flex justify-center">
//                   {service.icon}
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h3>
//                 <p className="text-gray-600 text-sm">{service.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 bg-blue-50">
//         <div className="max-w-4xl mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-2xl font-bold text-gray-800 mb-3">
//               Why Choose Our Clinic
//             </h2>
//             <div className="w-12 h-0.5 bg-blue-600 rounded-full mx-auto mb-4"></div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {[
//               {
//                 icon: (
//                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 ),
//                 title: 'Same-Day Appointments',
//                 description: 'Urgent care needs addressed promptly with flexible scheduling'
//               },
//               {
//                 icon: (
//                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                   </svg>
//                 ),
//                 title: 'Experienced Physician',
//                 description: 'Board-certified with extensive family medicine experience'
//               },
//               {
//                 icon: (
//                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
//                   </svg>
//                 ),
//                 title: 'OHIP Billed Services',
//                 description: 'Most medical services covered by Ontario Health Insurance'
//               },
//               {
//                 icon: (
//                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
//                   </svg>
//                 ),
//                 title: 'Personalized Care',
//                 description: 'Continuity of care with your dedicated family physician'
//               }
//             ].map((feature, index) => (
//               <div key={index} className="flex items-start space-x-4">
//                 <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
//                   {feature.icon}
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-1">{feature.title}</h3>
//                   <p className="text-gray-600 text-sm">{feature.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Final CTA */}
//       <section className="py-16 bg-blue-600">
//         <div className="max-w-2xl mx-auto px-4 text-center">
//           <h2 className="text-2xl font-bold text-white mb-4">
//             Start Your Health Journey
//           </h2>
//           <p className="text-blue-100 mb-6">
//             Book your appointment with Dr. Fagbolagun today
//           </p>
//           <Link 
//             href="/appointments-Booking" 
//             className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 hover:shadow-lg"
//           >
//             Book Now
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }



import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-start bg-gray-900 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-blue-900/70"></div>
        </div>

        {/* Compact Text Box */}
        <div className="relative z-10 max-w-md mx-4 lg:mx-16 xl:mx-24 bg-blue-800/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-blue-400/30 shadow-xl">
          {/* Clinic Name */}
          <div className="mb-4">
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              St Mary Rideau
              <span className="block text-blue-200 text-xl lg:text-2xl">Family Clinic</span>
            </h1>
            <div className="w-12 h-0.5 bg-blue-300 rounded-full mb-3"></div>
          </div>

          {/* Physician */}
          <div className="mb-4">
            <p className="text-lg text-blue-100 font-medium">
              Dr. Oluwaseun FAGBOLAGUN
            </p>
            <p className="text-sm text-blue-200/80">
              MD CCFP MRCGP • Family Physician
            </p>
          </div>

          {/* Welcome Message */}
          <div className="mb-4">
            <p className="text-sm text-white leading-relaxed mb-2">
              Your family's health is our priority. Compassionate, comprehensive care for all ages in a welcoming environment.
            </p>
          </div>

          {/* Tagline */}
          <div className="mb-4 p-3 bg-blue-700/50 rounded-lg border-l-2 border-blue-300">
            <p className="text-sm text-white font-light italic">
              "Your Family's Health, Our Mission"
            </p>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col gap-3">
            <Link 
              href="/appointments-Booking" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-center transition-all duration-200 hover:bg-blue-700 hover:shadow-lg"
            >
              Book Appointment
            </Link>
            
            <Link 
              href="/services" 
              className="border border-blue-400/50 text-white px-6 py-3 rounded-lg font-semibold text-center transition-all duration-200 hover:bg-blue-700/50 hover:border-blue-300"
            >
              Our Services
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-4 flex flex-wrap gap-3 text-blue-200/80 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
              <span>New Patients Welcome</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
              <span>OHIP Covered</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center text-blue-200/60">
            <span className="text-xs mb-1">Scroll</span>
            <div className="w-5 h-8 border border-blue-300/30 rounded-full flex justify-center">
              <div className="w-0.5 h-2 bg-blue-300/50 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Our Medical Services
            </h2>
            <div className="w-12 h-0.5 bg-blue-600 rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              At St Mary Rideau Family Clinic, we know how important it is to get the care you need quickly. 
              We are pleased to offer comprehensive family medicine services to better serve you and your family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: 'Family Medicine',
                description: 'Primary care for all ages from infants to seniors'
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                title: 'Chronic Care',
                description: 'Diabetes, hypertension and heart condition management'
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Preventive Health',
                description: 'Regular check-ups, vaccinations and health screenings'
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: 'Sick Notes',
                description: 'Same-day school, university and work sick notes'
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                ),
                title: 'Cryotherapy',
                description: 'Effective cryotherapy for wart removal with liquid nitrogen'
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: 'WSIB Medical Forms',
                description: 'WSIB medical assessments (FAF) and form 8 completion'
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                ),
                title: `Driver's Medical Exams`,
                description: 'Same-day MTO drivers medical exam and form filling'
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                ),
                title: 'Immunization',
                description: 'Full range of immunizations for all ages'
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                ),
                title: 'TB Testing',
                description: 'Quick and reliable 1 or 2-step TB testing for work and school'
              }
            ].map((service, index) => (
              <div 
                key={index}
                className="bg-blue-50 rounded-xl p-6 border border-blue-100 hover:border-blue-300 transition-all duration-200 text-center hover:shadow-lg"
              >
                <div className="text-blue-600 mb-4 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Why Choose Our Clinic
            </h2>
            <div className="w-12 h-0.5 bg-blue-600 rounded-full mx-auto mb-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Same-Day Appointments',
                description: 'Urgent care needs addressed promptly with flexible scheduling'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Experienced Physician',
                description: 'Board-certified with extensive family medicine experience'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                ),
                title: 'OHIP Billed Services',
                description: 'Most medical services covered by Ontario Health Insurance'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                ),
                title: 'Personalized Care',
                description: 'Continuity of care with your dedicated family physician'
              }
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Start Your Health Journey
          </h2>
          <p className="text-blue-100 mb-6">
            Book your appointment with Dr. Fagbolagun today
          </p>
          <Link 
            href="/appointments-Booking" 
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 hover:shadow-lg"
          >
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
}