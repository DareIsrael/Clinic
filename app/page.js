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
//           <div className="absolute inset-0 bg-sky-900/70"></div>
//         </div>

//         {/* Compact Text Box */}
//         <div className="relative z-10 max-w-md mx-4 lg:mx-16 xl:mx-24 bg-sky-800/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-sky-400/30 shadow-xl">
//           {/* Clinic Name */}
//           <div className="mb-4">
//             <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
//               St Mary Rideau
//               <span className="block text-sky-200 text-xl lg:text-2xl">Family Clinic</span>
//             </h1>
//             <div className="w-12 h-0.5 bg-sky-300 rounded-full mb-3"></div>
//           </div>

//           {/* Physician */}
//           <div className="mb-4">
//             <p className="text-lg text-sky-100 font-medium">
//               Dr. Oluwaseun FAGBOLAGUN
//             </p>
//             <p className="text-sm text-sky-200/80">
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
//           <div className="mb-4 p-3 bg-sky-700/50 rounded-lg border-l-2 border-sky-300">
//             <p className="text-sm text-white font-light italic">
//               "Your Family's Health, Our Mission"
//             </p>
//           </div>

//           {/* Call-to-Action Buttons */}
//           <div className="flex flex-col gap-3">
//             <Link 
//               href="/appointments-Booking" 
//               className="bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold text-center transition-all duration-200 hover:bg-sky-700 hover:shadow-lg"
//             >
//               Book Appointment
//             </Link>
            
//             <Link 
//               href="/services" 
//               className="border border-sky-400/50 text-white px-6 py-3 rounded-lg font-semibold text-center transition-all duration-200 hover:bg-sky-700/50 hover:border-sky-300"
//             >
//               Our Services
//             </Link>
//           </div>

//           {/* Trust Indicators */}
//           <div className="mt-4 flex flex-wrap gap-3 text-sky-200/80 text-xs">
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
//           <div className="flex flex-col items-center text-sky-200/60">
//             <span className="text-xs mb-1">Scroll</span>
//             <div className="w-5 h-8 border border-sky-300/30 rounded-full flex justify-center">
//               <div className="w-0.5 h-2 bg-sky-300/50 rounded-full mt-2 animate-bounce"></div>
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
//             <div className="w-12 h-0.5 bg-sky-600 rounded-full mx-auto mb-4"></div>
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
//                 className="bg-sky-50 rounded-xl p-6 border border-sky-100 hover:border-sky-300 transition-all duration-200 text-center"
//               >
//                 <div className="text-sky-600 mb-4 flex justify-center">
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
//       <section className="py-16 bg-sky-50">
//         <div className="max-w-4xl mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-2xl font-bold text-gray-800 mb-3">
//               Why Choose Our Clinic
//             </h2>
//             <div className="w-12 h-0.5 bg-sky-600 rounded-full mx-auto mb-4"></div>
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
//                 <div className="flex-shrink-0 w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
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
//       <section className="py-16 bg-sky-600">
//         <div className="max-w-2xl mx-auto px-4 text-center">
//           <h2 className="text-2xl font-bold text-white mb-4">
//             Start Your Health Journey
//           </h2>
//           <p className="text-sky-100 mb-6">
//             Book your appointment with Dr. Fagbolagun today
//           </p>
//           <Link 
//             href="/appointments-Booking" 
//             className="inline-block bg-white text-sky-600 px-8 py-3 rounded-lg font-semibold hover:bg-sky-50 transition-all duration-200 hover:shadow-lg"
//           >
//             Book Now
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }











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
//           <div className="absolute inset-0 bg-sky-900/70"></div>
//         </div>

//         {/* Compact Text Box */}
//         <div className="relative z-10 max-w-md mx-4 lg:mx-16 xl:mx-24 bg-sky-800/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-sky-400/30 shadow-xl">
//           {/* Clinic Name */}
//           <div className="mb-4">
//             <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
//               St Mary Rideau
//               <span className="block text-sky-200 text-xl lg:text-2xl">Family Clinic</span>
//             </h1>
//             <div className="w-12 h-0.5 bg-sky-300 rounded-full mb-3"></div>
//           </div>

//           {/* Physician */}
//           <div className="mb-4">
//             <p className="text-lg text-sky-100 font-medium">
//               Dr. Oluwaseun FAGBOLAGUN
//             </p>
//             <p className="text-sm text-sky-200/80">
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
//           <div className="mb-4 p-3 bg-sky-700/50 rounded-lg border-l-2 border-sky-300">
//             <p className="text-sm text-white font-light italic">
//               "Your Family's Health, Our Mission"
//             </p>
//           </div>

//           {/* Call-to-Action Buttons */}
//           <div className="flex flex-col gap-3">
//             <Link 
//               href="/appointments-Booking" 
//               className="bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold text-center transition-all duration-200 hover:bg-sky-700 hover:shadow-lg"
//             >
//               Book Appointment
//             </Link>
            
//             <Link 
//               href="/services" 
//               className="border border-sky-400/50 text-white px-6 py-3 rounded-lg font-semibold text-center transition-all duration-200 hover:bg-sky-700/50 hover:border-sky-300"
//             >
//               Our Services
//             </Link>
//           </div>

//           {/* Trust Indicators */}
//           <div className="mt-4 flex flex-wrap gap-3 text-sky-200/80 text-xs">
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
//           <div className="flex flex-col items-center text-sky-200/60">
//             <span className="text-xs mb-1">Scroll</span>
//             <div className="w-5 h-8 border border-sky-300/30 rounded-full flex justify-center">
//               <div className="w-0.5 h-2 bg-sky-300/50 rounded-full mt-2 animate-bounce"></div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Services Preview */}
//       <section className="py-16 bg-white">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-2xl font-bold text-gray-800 mb-3">
//               Our Medical Services
//             </h2>
//             <div className="w-12 h-0.5 bg-sky-600 rounded-full mx-auto mb-4"></div>
//             <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
//               At St Mary Rideau Family Clinic, we know how important it is to get the care you need quickly. 
//               We are pleased to offer comprehensive family medicine services to better serve you and your family.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
//               },
//               {
//                 icon: (
//                   <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                   </svg>
//                 ),
//                 title: 'Sick Notes',
//                 description: 'Same-day school, university and work sick notes'
//               },
//               {
//                 icon: (
//                   <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//                   </svg>
//                 ),
//                 title: 'Cryotherapy',
//                 description: 'Effective cryotherapy for wart removal with liquid nitrogen'
//               },
//               {
//                 icon: (
//                   <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                   </svg>
//                 ),
//                 title: 'WSIB Medical Forms',
//                 description: 'WSIB medical assessments (FAF) and form 8 completion'
//               },
//               {
//                 icon: (
//                   <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
//                   </svg>
//                 ),
//                 title: `Driver's Medical Exams`,
//                 description: 'Same-day MTO drivers medical exam and form filling'
//               },
//               {
//                 icon: (
//                   <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                   </svg>
//                 ),
//                 title: 'Immunization',
//                 description: 'Full range of immunizations for all ages'
//               },
//               {
//                 icon: (
//                   <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
//                   </svg>
//                 ),
//                 title: 'TB Testing',
//                 description: 'Quick and reliable 1 or 2-step TB testing for work and school'
//               }
//             ].map((service, index) => (
//               <div 
//                 key={index}
//                 className="bg-sky-50 rounded-xl p-6 border border-sky-100 hover:border-sky-300 transition-all duration-200 text-center hover:shadow-lg"
//               >
//                 <div className="text-sky-600 mb-4 flex justify-center">
//                   {service.icon}
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h3>
//                 <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 bg-sky-50">
//         <div className="max-w-4xl mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-2xl font-bold text-gray-800 mb-3">
//               Why Choose Our Clinic
//             </h2>
//             <div className="w-12 h-0.5 bg-sky-600 rounded-full mx-auto mb-4"></div>
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
//                 <div className="flex-shrink-0 w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
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
//       <section className="py-16 bg-sky-600">
//         <div className="max-w-2xl mx-auto px-4 text-center">
//           <h2 className="text-2xl font-bold text-white mb-4">
//             Start Your Health Journey
//           </h2>
//           <p className="text-sky-100 mb-6">
//             Book your appointment with Dr. Fagbolagun today
//           </p>
//           <Link 
//             href="/appointments-Booking" 
//             className="inline-block bg-white text-sky-600 px-8 py-3 rounded-lg font-semibold hover:bg-sky-50 transition-all duration-200 hover:shadow-lg"
//           >
//             Book Now
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }









"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  // Testimonial slider state
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Patient',
      content: 'Dr. Fagbolagun has been our family physician for over 2 years. The care and attention we receive is exceptional. Same-day appointments have been a lifesaver for our busy family.',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Patient',
      content: 'The clinic is modern, clean, and the staff is very professional. I appreciate how thorough Dr. Fagbolagun is during examinations. Highly recommended!',
      rating: 5
    },
    {
      id: 3,
      name: 'The Williams Family',
      role: 'Family Patients',
      content: 'From our toddler to grandparents, everyone receives excellent care. The physician takes time to explain everything clearly. Truly a family-focused practice.',
      rating: 5
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Render star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

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
          <div className="absolute inset-0 bg-sky-800/70"></div>
        </div>

        {/* Compact Text Box */}
        <div className="relative z-10 max-w-md mx-4 lg:mx-16 xl:mx-24 bg-sky-700/90 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-sky-400/40 shadow-xl">
          {/* Clinic Name */}
          <div className="mb-4">
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              St Mary Rideau
              <span className="block text-sky-100 text-xl lg:text-2xl">Family Clinic</span>
            </h1>
            <div className="w-12 h-0.5 bg-sky-300 rounded-full mb-3"></div>
          </div>

          {/* Physician */}
          {/* <div className="mb-4">
            <p className="text-lg text-sky-50 font-medium">
              Dr. Oluwaseun FAGBOLAGUN
            </p>
            <p className="text-sm text-sky-200/90">
              MD CCFP MRCGP • Family Physician
            </p>
          </div> */}

          {/* Welcome Message */}
          <div className="mb-4">
            <p className="text-sm text-white leading-relaxed mb-2">
              Your family's health is our priority. Compassionate, comprehensive care for all ages in a welcoming environment.
            </p>
          </div>

          {/* Tagline */}
          <div className="mb-4 p-3 bg-sky-600/60 rounded-lg border-l-2 border-sky-300">
            <p className="text-sm text-white font-light italic">
              "Your Family's Health, Our Mission"
            </p>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col gap-3">
            {/* <Link 
              href="/appointments-Booking" 
              className="bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold text-center transition-all duration-200 hover:bg-sky-600 hover:shadow-lg"
            >
              Book Appointment. Join the waitlist
            </Link> */}

            <Link 
              href="/signup" 
              className="bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold text-center transition-all duration-200 hover:bg-sky-600 hover:shadow-lg"
            >
            Join the waitlist
            </Link>
            
            <Link 
              href="#services" 
              className="border border-sky-400/60 text-white px-6 py-3 rounded-lg font-semibold text-center transition-all duration-200 hover:bg-sky-600/50 hover:border-sky-300"
            >
              Our Services
            </Link>
          </div>

          {/* Walk-ins Available Badge */}
          <div className="mt-4 flex justify-center">
            <div className="bg-gradient-to-r from-sky-400 to-sky-500 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg border border-sky-300/40 backdrop-blur-sm animate-pulse">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>WALK-INS AVAILABLE</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-4 flex flex-wrap gap-3 text-sky-200/90 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
              <span>New Patients Welcome</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
              <span>OHIP Covered</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center text-sky-200/70">
            <span className="text-xs mb-1">Scroll</span>
            <div className="w-5 h-8 border border-sky-300/40 rounded-full flex justify-center">
              <div className="w-0.5 h-2 bg-sky-300/60 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-sky-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 id='services' className="text-2xl font-bold text-sky-900 mb-3">
              Our Medical Services
            </h2>
            <div className="w-12 h-0.5 bg-sky-500 rounded-full mx-auto mb-4"></div>
            <p className="text-sky-700 max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
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
                title: 'STI Screening',
                description: 'Confidential and accurate testing for sexually transmitted infections.'
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
                title: 'Counselling',
                description: 'Professional health counselling to support your physical and emotional wellbeing.'
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                ),
                title: 'Treatments',
                description: 'Comprehensive medical treatments tailored to your health needs.'
              }
            ].map((service, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 border border-sky-200 hover:border-sky-400 transition-all duration-200 text-center hover:shadow-lg hover:shadow-sky-100"
              >
                <div className="text-sky-600 mb-4 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-sky-900 mb-2">{service.title}</h3>
                <p className="text-sky-700 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinic Policy & Hours Section */}
      <section className="py-16 bg-sky-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Clinic Policy */}
            <div>
              <h2 className="text-2xl font-bold text-sky-900 mb-6">Clinic Policy</h2>
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-sky-200">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sky-900 mb-1">Appointment Policy</h3>
                      <p className="text-sky-700 text-sm">
                        Please arrive 10 minutes early for your appointment. Late arrivals may be asked to reschedule.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sky-900 mb-1">Cancellation Policy</h3>
                      <p className="text-sky-700 text-sm">
                        24-hour notice required for appointment cancellations. Multiple no-shows may result in discharge from the clinic.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sky-900 mb-1">Document Fees</h3>
                      <p className="text-sky-700 text-sm">
                        Medical forms and documents not covered by OHIP may incur fees. Please inquire at reception.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sky-900 mb-1">New Patients</h3>
                      <p className="text-sky-700 text-sm">
                        New patients are welcome! Please bring your health card and any relevant medical records.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours of Operation */}
            <div>
              <h2 className="text-2xl font-bold text-sky-900 mb-6">Hours of Operation</h2>
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-sky-200">
                <div className="space-y-4 mb-6">
                  {[
                    { day: 'Monday', hours: '10:00 AM - 7:00 PM' },
                    { day: 'Tuesday', hours: '10:00 AM - 7:00 PM' },
                    { day: 'Wednesday', hours: '10:00 AM - 7:00 PM' },
                    { day: 'Thursday', hours: '10:00 AM - 7:00 PM' },
                    { day: 'Friday', hours: '10:00 AM - 7:00 PM' },
                    { day: 'Saturday', hours: '10:00 AM - 3:00 PM' },
                    { day: 'Sunday', hours: 'Closed' }
                  ].map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-sky-100 last:border-b-0">
                      <span className={`font-medium ${schedule.day === 'Sunday' ? 'text-red-500' : 'text-sky-800'}`}>
                        {schedule.day}
                      </span>
                      <span className={schedule.hours === 'Closed' ? 'text-red-500 font-medium' : 'text-sky-700'}>
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Emergency Notice */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-red-800 text-sm mb-1">Emergency Care</h4>
                      <p className="text-red-700 text-xs">
                        For medical emergencies, please call 911 or visit your nearest hospital emergency department.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section
      <section className="py-16 bg-sky-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-sky-900 mb-3">
              What Our Patients Say
            </h2>
            <div className="w-12 h-0.5 bg-sky-500 rounded-full mx-auto mb-4"></div>
            <p className="text-sky-700 max-w-2xl mx-auto">
              Hear from families who trust us with their healthcare needs
            </p>
          </div>

          
          <div className="relative bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-sky-200 ">
            <div className="text-center">
              
              <div className="flex justify-center mb-4">
                <div className="flex space-x-1">
                  {renderStars(testimonials[currentTestimonial].rating)}
                </div>
              </div>
              
              
              <blockquote className="text-lg text-sky-800 mb-6 text-sm sm:text-base md:text-lg leading-relaxed">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              
              
              <div className="mb-8">
                <p className="font-semibold text-sky-900 text-lg">
                  {testimonials[currentTestimonial].name}
                </p>
                <p className="text-sky-700 text-sm">
                  {testimonials[currentTestimonial].role}
                </p>
              </div>

              
              <div className="flex justify-center space-x-2 mb-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentTestimonial ? 'bg-sky-500' : 'bg-sky-200'
                    }`}
                  />
                ))}
              </div>

              
              <div className="flex justify-center space-x-4">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-sky-100 text-sky-600 hover:bg-sky-200 transition-colors duration-200"
                  aria-label="Previous testimonial"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-sky-100 text-sky-600 hover:bg-sky-200 transition-colors duration-200"
                  aria-label="Next testimonial"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      <section className="py-16 bg-sky-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-sky-900 mb-3">
              Why Choose Our Clinic
            </h2>
            <div className="w-12 h-0.5 bg-sky-500 rounded-full mx-auto mb-4"></div>
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
                <div className="flex-shrink-0 w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-sky-900 mb-1">{feature.title}</h3>
                  <p className="text-sky-700 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-sky-600">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Start Your Health Journey
          </h2>
          {/* <p className="text-sky-100 mb-6">
            Book your appointment with Dr. Fagbolagun today
          </p> */}
          <Link 
            href="/signup" 
            className="inline-block bg-white text-sky-600 px-8 py-3 rounded-lg font-semibold hover:bg-sky-50 transition-all duration-200 hover:shadow-lg"
          >
            Join the waitlist
          </Link>
        </div>
      </section>
    </div>
  );
}