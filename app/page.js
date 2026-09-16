// "use client";

// import Link from 'next/link';
// import { useState, useEffect, useRef } from 'react';
// import Announcements from '@/components/Announcements';

// export default function Home() {
//   // Testimonial slider state
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);

//   const testimonials = [
//     {
//       id: 1,
//       name: 'Sarah Johnson',
//       role: 'Patient',
//       content: 'Dr. Fagbolagun has been our family physician for over 2 years. The care and attention we receive is exceptional. Same-day appointments have been a lifesaver for our busy family.',
//       rating: 5
//     },
//     {
//       id: 2,
//       name: 'Michael Chen',
//       role: 'Patient',
//       content: 'The clinic is modern, clean, and the staff is very professional. I appreciate how thorough Dr. Fagbolagun is during examinations. Highly recommended!',
//       rating: 5
//     },
//     {
//       id: 3,
//       name: 'The Williams Family',
//       role: 'Family Patients',
//       content: 'From our toddler to grandparents, everyone receives excellent care. The physician takes time to explain everything clearly. Truly a family-focused practice.',
//       rating: 5
//     }
//   ];

//   // Auto-rotate testimonials
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [testimonials.length]);

//   const nextTestimonial = () => {
//     setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//   };

//   const prevTestimonial = () => {
//     setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//   };

//   // Render star rating
//   const renderStars = (rating) => {
//     return Array.from({ length: 5 }, (_, i) => (
//       <svg
//         key={i}
//         className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
//         fill="currentColor"
//         viewBox="0 0 20 20"
//       >
//         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//       </svg>
//     ));
//   };

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
//           <div className="absolute inset-0 bg-sky-800/70"></div>
//           {/* <div className="absolute inset-0 bg-white/80"></div> */}
//         </div>

//         {/* Announcements Section - Properly positioned with enough margin */}
//         <div className="absolute top-2 left-4 right-4 z-20">
//           <Announcements />
//         </div>

//         {/* Main Content Box - Pushed down to avoid overlap */}
//        <div className="relative z-10 max-w-md mx-4 mb-16 lg:mx-16 xl:mx-24 bg-white rounded-2xl p-6 lg:p-8 border border-gray-200 shadow-xl mt-40 lg:mt-44 xl:mt-48">

//   {/* Header */}
//   <div className=" mb-4 ">
//     <h1 className="hero-heading text-3xl lg:text-3xl font-bold text-sky-800 mb-2 leading-tight">
//       Family Doctor & Walk-In Clinic in Downtown Ottawa
//     </h1>

//     <div className="hero-heading w-16 h-1 bg-sky-800 rounded-full mb-3" style={{ animationDelay: '0.25s' }}></div>

//     <p className="hero-sub text-gray-600 text-sm lg:text-base">
//       Same-day visits. Online booking. No phone wait.
//     </p>
//   </div>

//   {/* Call-to-Action Buttons */}
//   <div className="hero-cta flex flex-col sm:flex-row gap-3 mt-6">

//     {/* Book Appointment Button */}
//     <Link
//     href="/appointment"
//     className="btn-breathe bg-gradient-to-r from-sky-600 to-sky-700 text-white px-4 py-3 rounded-lg font-semibold text-center transition-all duration-200 hover:bg-sky-900 hover:shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
//   >
//     Book Appointment
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//     </svg>
//   </Link>

//   {/* Call Now Button */}
//   <a
//     href="tel:+13438873470"
//     className="bg-white border border-gray-300 text-sky-800 px-4 py-3 rounded-lg font-semibold text-center transition-all duration-200 hover:bg-gray-100 hover:shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
//   >
//     Call Now
//     <svg className="w-4 h-4 text-sky-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//     </svg>
//   </a>

//   </div>

//   {/* Accepting New Patients Notice */}
//   <div className="mt-5">
//     <p className="text-sky-700 font-semibold text-sm">
//       Accepting new patients.
//     </p>
//   </div>

// </div>

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
//           <div className="flex flex-col items-center text-sky-200/70">
//             <span className="text-xs mb-1">Scroll</span>
//             <div className="w-5 h-8 border border-sky-300/40 rounded-full flex justify-center">
//               <div className="w-0.5 h-2 bg-sky-300/60 rounded-full mt-2 animate-bounce"></div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Services Preview */}
//       <section id="services" className="py-16 bg-white">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-2xl font-bold text-sky-900 mb-3">
//               Our Medical Services
//             </h2>
//             <div className="w-12 h-0.5 bg-sky-500 rounded-full mx-auto mb-4"></div>
//             <p className="text-sky-700 max-w-3xl mx-auto text-sm sm:text-base  leading-relaxed">
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
//                 title: 'STI Screening',
//                 description: 'Confidential and accurate testing for sexually transmitted infections.'
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
//                 title: 'Counselling',
//                 description: 'Professional health counselling to support your physical and emotional wellbeing.'
//               },
//               {
//                 icon: (
//                   <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
//                   </svg>
//                 ),
//                 title: 'Treatments',
//                 description: 'Comprehensive medical treatments tailored to your health needs.'
//               }
//             ].map((service, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl p-6 border border-sky-200 hover:border-sky-400 transition-all duration-200 text-center hover:shadow-lg hover:shadow-sky-100"
//               >
//                 <div className="text-sky-600 mb-4 flex justify-center">
//                   {service.icon}
//                 </div>
//                 <h3 className="text-lg font-semibold text-sky-900 mb-2">{service.title}</h3>
//                 <p className="text-sky-700 text-sm leading-relaxed">{service.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Clinic Policy & Hours Section */}
//       <section className="py-16 bg-white">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             {/* Clinic Policy */}
//             <div>
//               <h2 className="text-2xl font-bold text-sky-900 mb-6">Clinic Policy</h2>
//               <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-sky-200">
//                 <div className="space-y-6">
//                   <div className="flex items-start space-x-4">
//                     <div className="flex-shrink-0 w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-sky-900 mb-1">Appointment Policy</h3>
//                       <p className="text-sky-700 text-sm">
//                         Please arrive 10 minutes early for your appointment. Late arrivals may be asked to reschedule.
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start space-x-4">
//                     <div className="flex-shrink-0 w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-sky-900 mb-1">Cancellation Policy</h3>
//                       <p className="text-sky-700 text-sm">
//                         24-hour notice required for appointment cancellations. Multiple no-shows may result in discharge from the clinic.
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start space-x-4">
//                     <div className="flex-shrink-0 w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-sky-900 mb-1">Document Fees</h3>
//                       <p className="text-sky-700 text-sm">
//                         Medical forms and documents not covered by OHIP may incur fees. Please inquire at reception.
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start space-x-4">
//                     <div className="flex-shrink-0 w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-sky-900 mb-1">New Patients</h3>
//                       <p className="text-sky-700 text-sm">
//                         New patients are welcome! Please bring your health card and any relevant medical records.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Hours of Operation */}
//             <div>
//               <h2 className="text-2xl font-bold text-sky-900 mb-6">Hours of Operation</h2>
//               <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-sky-200">
//                 <div className="space-y-4 mb-6">
//                   {[
//                     { day: 'Monday', hours: '10:00 AM - 7:00 PM' },
//                     { day: 'Tuesday', hours: '10:00 AM - 7:00 PM' },
//                     { day: 'Wednesday', hours: '10:00 AM - 7:00 PM' },
//                     { day: 'Thursday', hours: '10:00 AM - 7:00 PM' },
//                     { day: 'Friday', hours: '10:00 AM - 5:00 PM' },
//                     { day: 'Saturday', hours: '10:00 AM - 3:00 PM' },
//                     { day: 'Sunday', hours: 'Closed' }
//                   ].map((schedule, index) => (
//                     <div key={index} className="flex justify-between items-center py-2 border-b border-sky-100 last:border-b-0">
//                       <span className={`font-medium ${schedule.day === 'Sunday' ? 'text-red-500' : 'text-sky-800'}`}>
//                         {schedule.day}
//                       </span>
//                       <span className={schedule.hours === 'Closed' ? 'text-red-500 font-medium' : 'text-sky-700'}>
//                         {schedule.hours}
//                       </span>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Emergency Notice */}
//                 <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//                   <div className="flex items-start space-x-3">
//                     <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                     </svg>
//                     <div>
//                       <h4 className="font-semibold text-red-800 text-sm mb-1">Emergency Care</h4>
//                       <p className="text-red-700 text-xs">
//                         For medical emergencies, please call 911 or visit your nearest hospital emergency department.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 bg-white">
//         <div className="max-w-4xl mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-2xl font-bold text-sky-900 mb-3">
//               Why Choose Our Clinic
//             </h2>
//             <div className="w-12 h-0.5 bg-sky-500 rounded-full mx-auto mb-4"></div>
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
//                   <h3 className="text-lg font-semibold text-sky-900 mb-1">{feature.title}</h3>
//                   <p className="text-sky-700 text-sm">{feature.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Final CTA */}
//       <section className="py-16 bg-sky-50">
//         <div className="max-w-2xl mx-auto px-4 text-center">
//           <h2 className="text-2xl font-bold text-sky-800 mb-4">
//             Start Your Health Journey
//           </h2>
//           <Link
//             href="/appointment"
//             className="inline-block bg-white text-sky-600 px-8 py-3 rounded-lg font-semibold hover:bg-sky-50 transition-all duration-200 hover:shadow-lg"
//           >
//             Book Appointment
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Announcements from "@/components/Announcements";

export default function Home() {
  // Testimonial slider state
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // New doctor announcement state
  const [showNewDoctorAnnouncement, setShowNewDoctorAnnouncement] =
    useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Patient",
      content:
        "Dr. Fagbolagun has been our family physician for over 2 years. The care and attention we receive is exceptional. Same-day appointments have been a lifesaver for our busy family.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Patient",
      content:
        "The clinic is modern, clean, and the staff is very professional. I appreciate how thorough Dr. Fagbolagun is during examinations. Highly recommended!",
      rating: 5,
    },
    {
      id: 3,
      name: "The Williams Family",
      role: "Family Patients",
      content:
        "From our toddler to grandparents, everyone receives excellent care. The physician takes time to explain everything clearly. Truly a family-focused practice.",
      rating: 5,
    },
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
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  // Render star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="min-h-screen">
      {/* Mobile Hero Section (Background Image View - Fits screen) */}
      <section className="relative min-h-[calc(100vh-4.5rem)] flex flex-col justify-between bg-gray-900 overflow-hidden lg:hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://res.cloudinary.com/dveill0ji/image/upload/v1776831591/St.MaryBackground_i6rqpf.jpg")',
          }}
        >
          <div className="absolute inset-0 bg-sky-800/70"></div>
        </div>

        {/* All content in normal document flow */}
        <div className="relative z-10 flex flex-col px-4 py-3 flex-1 justify-center max-w-md mx-auto w-full">
          {/* Announcements - in flow, pushes content down when expanded */}
          <div className="w-full mb-3">
            <Announcements />
          </div>

          {/* Main Content Box on Mobile - Clean White Card Background */}
          <div className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-xl my-auto">
            {/* Badge */}
            <div className="inline-block px-3 py-1 rounded-lg bg-sky-50 border border-sky-100 text-sky-700 text-sm sm:text-base font-bold mb-2.5 shadow-sm">
              Accepting New Patients
            </div>

            {/* Header */}
            <div className="mb-2.5">
              <h1 className="hero-heading text-xl sm:text-2xl font-extrabold text-slate-900 mb-1.5 leading-tight">
                Family Doctor & Walk-In Clinic in Downtown Ottawa
              </h1>
              <div className="w-12 h-1 bg-sky-600 rounded-full mb-2"></div>
              <p className="hero-sub text-slate-600 text-xs sm:text-sm font-medium">
                Same day visits. Online booking. No phone wait.
              </p>
            </div>

            {/* Call-to-Action Buttons */}
            <div className="hero-cta flex flex-col sm:flex-row gap-2.5 mt-3">
              {/* Book Appointment Button */}
              <Link
                href="/appointment"
                className="btn-breathe bg-sky-600 hover:bg-sky-700 text-white px-4 py-3 rounded-xl font-bold text-sm sm:text-base text-center transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Book Appointment
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              {/* Call Now Button */}
              <a
                href="tel:+13438873470"
                className="bg-white border border-gray-300 text-slate-700 hover:text-sky-600 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm text-center transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Call Now
                <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            </div>

            {/* Sub-notice */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-sky-700">
              <svg className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Walk-Ins & Roster Appointments Available Today</span>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop Hero Section (Content Left, Video Right with Diagonal Cut - Fits screen) */}
      <section className="relative min-h-[calc(100vh-4.5rem)] h-[calc(100vh-4.5rem)] w-full hidden lg:flex flex-row overflow-hidden bg-slate-50 font-sans">
        {/* Left Side - Hero Content Section (z-0 sits behind video clip - No white card background) */}
        <div className="flex-1 flex flex-col justify-center items-center p-6 xl:p-12 z-0 -mr-12 relative bg-gradient-to-br from-slate-50 via-sky-50/20 to-slate-100">
          <div className="w-full max-w-lg my-auto pr-6 xl:pr-10">
            {/* Badge */}
            <div className="inline-block px-3.5 py-1.5 rounded-xl bg-sky-100/90 border border-sky-200/80 text-sky-800 text-lg xl:text-xl font-bold mb-3 shadow-xs">
              Accepting New Patients
            </div>

            {/* Header */}
            <h1 className="text-3xl xl:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2.5">
              Family Doctor & Walk-In Clinic in Downtown Ottawa
            </h1>

            <div className="w-14 h-1 bg-sky-600 rounded-full mb-3"></div>

            <p className="text-slate-600 text-sm xl:text-base leading-relaxed mb-5 font-medium">
              Same day visits. Online booking. No phone wait.
            </p>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-row gap-3">
              {/* Book Appointment Button */}
              <Link
                href="/appointment"
                className="btn-breathe flex-1 bg-sky-600 hover:bg-sky-700 text-white px-4 py-3.5 rounded-xl font-bold text-base xl:text-lg text-center shadow-lg shadow-sky-600/25 hover:shadow-sky-600/35 transition-all duration-200 flex items-center justify-center gap-2"
              >
                Book Appointment
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              {/* Call Now Button */}
              <a
                href="tel:+13438873470"
                className="flex-1 bg-white border border-slate-300 text-slate-700 hover:text-sky-600 hover:border-sky-400 px-4 py-3.5 rounded-xl font-bold text-sm xl:text-base text-center transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
              >
                Call Now
                <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            </div>

            {/* Sub-notice */}
            <div className="mt-5 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-sky-800">
              <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Walk-Ins & Roster Appointments Available Today</span>
            </div>
          </div>
        </div>

        {/* Right Side - Animated Video Section with Diagonal Cut (z-10 overlays left side) */}
        <div className="relative w-[56%] h-full flex-shrink-0 overflow-hidden [clip-path:polygon(16%_0,100%_0,100%_100%,0_100%)] z-10 bg-slate-900">
          {/* Background Video */}
          <video
            src="https://res.cloudinary.com/dveill0ji/video/upload/v1789562225/StmaryBackvid_ew7noz.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Subtle Overlay for contrast & legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-slate-900/40" />

          {/* Announcements Section - Top Right on Video */}
          <div className="absolute top-6 right-6 z-20 max-w-md">
            <Announcements />
          </div>

          {/* Video Hero Caption */}
          <div className="flex absolute bottom-10 right-10 left-24 z-20 flex-col text-white max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 backdrop-blur-md border border-sky-400/30 text-sky-200 text-xs font-semibold tracking-wide w-fit mb-3">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              St. Mary Rideau Family Clinic
            </div>
            <h2 className="text-2xl xl:text-3xl font-extrabold tracking-tight text-white mb-2 drop-shadow-sm leading-tight">
              Compassionate Care,<br />Modern Healthcare.
            </h2>
            <p className="text-sky-100/80 text-xs xl:text-sm leading-relaxed">
              Providing exceptional primary care and walk-in medical services in downtown Ottawa.
            </p>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-sky-900 mb-3">
              Our Medical Services
            </h2>
            <div className="w-12 h-0.5 bg-sky-500 rounded-full mx-auto mb-4"></div>
            <p className="text-sky-700 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
              At St Mary Rideau Family Clinic, we know how important it is to
              get the care you need quickly. We are pleased to offer
              comprehensive family medicine services to better serve you and
              your family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg
                    className="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                ),
                title: "Family Medicine",
                description:
                  "Primary care for all ages from infants to seniors",
              },
              {
                icon: (
                  <svg
                    className="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                ),
                title: "Chronic Care",
                description:
                  "Diabetes, hypertension and heart condition management",
              },
              {
                icon: (
                  <svg
                    className="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                ),
                title: "Preventive Health",
                description:
                  "Regular check-ups, vaccinations and health screenings",
              },
              {
                icon: (
                  <svg
                    className="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                ),
                title: "Sick Notes",
                description: "Same-day school, university and work sick notes",
              },
              {
                icon: (
                  <svg
                    className="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                ),
                title: "STI Screening",
                description:
                  "Confidential and accurate testing for sexually transmitted infections.",
              },
              {
                icon: (
                  <svg
                    className="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                ),
                title: "WSIB Medical Forms",
                description:
                  "WSIB medical assessments (FAF) and form 8 completion",
              },
              {
                icon: (
                  <svg
                    className="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                    />
                  </svg>
                ),
                title: `Driver's Medical Exams`,
                description:
                  "Same-day MTO drivers medical exam and form filling",
              },
              {
                icon: (
                  <svg
                    className="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                ),
                title: "Counselling",
                description:
                  "Professional health counselling to support your physical and emotional wellbeing.",
              },
              {
                icon: (
                  <svg
                    className="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                ),
                title: "Treatments",
                description:
                  "Comprehensive medical treatments tailored to your health needs.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-sky-200 hover:border-sky-400 transition-all duration-200 text-center hover:shadow-lg hover:shadow-sky-100"
              >
                <div className="text-sky-600 mb-4 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-sky-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sky-700 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinic Policy & Hours Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Clinic Policy */}
            <div>
              <h2 className="text-2xl font-bold text-sky-900 mb-6">
                Clinic Policy
              </h2>
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-sky-200">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sky-900 mb-1">
                        Appointment Policy
                      </h3>
                      <p className="text-sky-700 text-sm">
                        Please arrive 10 minutes early for your appointment.
                        Late arrivals may be asked to reschedule.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sky-900 mb-1">
                        Cancellation Policy
                      </h3>
                      <p className="text-sky-700 text-sm">
                        24-hour notice required for appointment cancellations.
                        Multiple no-shows may result in discharge from the
                        clinic.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sky-900 mb-1">
                        Document Fees
                      </h3>
                      <p className="text-sky-700 text-sm">
                        Medical forms and documents not covered by OHIP may
                        incur fees. Please inquire at reception.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sky-900 mb-1">
                        New Patients
                      </h3>
                      <p className="text-sky-700 text-sm">
                        New patients are welcome! Please bring your health card
                        and any relevant medical records.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours of Operation */}
            <div>
              <h2 className="text-2xl font-bold text-sky-900 mb-6">
                Hours of Operation
              </h2>
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-sky-200">
                <div className="space-y-4 mb-6">
                  {[
                    { day: "Monday", hours: "10:00 AM - 7:00 PM" },
                    { day: "Tuesday", hours: "10:00 AM - 7:00 PM" },
                    { day: "Wednesday", hours: "10:00 AM - 7:00 PM" },
                    { day: "Thursday", hours: "10:00 AM - 7:00 PM" },
                    { day: "Friday", hours: "10:00 AM - 5:00 PM" },
                    { day: "Saturday", hours: "10:00 AM - 3:00 PM" },
                    { day: "Sunday", hours: "Closed" },
                  ].map((schedule, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-sky-100 last:border-b-0"
                    >
                      <span
                        className={`font-medium ${schedule.day === "Sunday" ? "text-red-500" : "text-sky-800"}`}
                      >
                        {schedule.day}
                      </span>
                      <span
                        className={
                          schedule.hours === "Closed"
                            ? "text-red-500 font-medium"
                            : "text-sky-700"
                        }
                      >
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Emergency Notice */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-red-800 text-sm mb-1">
                        Emergency Care
                      </h4>
                      <p className="text-red-700 text-xs">
                        For medical emergencies, please call 911 or visit your
                        nearest hospital emergency department.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
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
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                title: "Same-Day Appointments",
                description:
                  "Urgent care needs addressed promptly with flexible scheduling",
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                ),
                title: "Experienced Physician",
                description:
                  "Board-certified with extensive family medicine experience",
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                ),
                title: "OHIP Billed Services",
                description:
                  "Most medical services covered by Ontario Health Insurance",
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                ),
                title: "Personalized Care",
                description:
                  "Continuity of care with your dedicated family physician",
              },
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-sky-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sky-700 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-sky-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-sky-800 mb-4">
            Start Your Health Journey
          </h2>
          <Link
            href="/appointment"
            className="inline-block bg-white text-sky-600 px-8 py-3 rounded-lg font-semibold hover:bg-sky-50 transition-all duration-200 hover:shadow-lg"
          >
            Book Appointment
          </Link>
        </div>
      </section>

      {/* Add this CSS to your global styles or component */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

// "use client";

// import Link from 'next/link';
// import { useState, useEffect } from 'react';
// import Announcements from '@/components/Announcements';

// export default function Home() {
//   // Testimonial slider state
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);

//   const testimonials = [
//     {
//       id: 1,
//       name: 'Sarah Johnson',
//       role: 'Patient',
//       content: 'Dr. Fagbolagun has been our family physician for over 2 years. The care and attention we receive is exceptional. Same-day appointments have been a lifesaver for our busy family.',
//       rating: 5
//     },
//     {
//       id: 2,
//       name: 'Michael Chen',
//       role: 'Patient',
//       content: 'The clinic is modern, clean, and the staff is very professional. I appreciate how thorough Dr. Fagbolagun is during examinations. Highly recommended!',
//       rating: 5
//     },
//     {
//       id: 3,
//       name: 'The Williams Family',
//       role: 'Family Patients',
//       content: 'From our toddler to grandparents, everyone receives excellent care. The physician takes time to explain everything clearly. Truly a family-focused practice.',
//       rating: 5
//     }
//   ];

//   // Auto-rotate testimonials
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [testimonials.length]);

//   const nextTestimonial = () => {
//     setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//   };

//   const prevTestimonial = () => {
//     setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//   };

//   // Render star rating
//   const renderStars = (rating) => {
//     return Array.from({ length: 5 }, (_, i) => (
//       <svg
//         key={i}
//         className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
//         fill="currentColor"
//         viewBox="0 0 20 20"
//       >
//         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//       </svg>
//     ));
//   };

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}

//       <section className="relative min-h-screen flex items-center justify-start bg-white overflow-hidden">

//   {/* Announcements Section */}
//   <div className="absolute top-2 left-4 right-4 z-20">
//     <Announcements />
//   </div>

//   {/* Main Content */}
//   <div className="relative z-10 max-w-2xl mx-4 lg:mx-16 xl:mx-24 mt-40 lg:mt-44 xl:mt-48">

//     {/* Header Text */}
//     <h1 className="text-3xl lg:text-4xl font-extrabold text-sky-800 mb-4 leading-tight">
//       Family Doctor & Walk-In Clinic in Downtown Ottawa
//     </h1>

//     {/* Subtext */}
//     <p className="text-gray-600 text-lg mb-6">
//       Same-day visits. Online booking. No phone wait.
//     </p>

//     {/* CTA Buttons */}
//     <div className="flex flex-col sm:flex-row gap-4 mb-4">

//       {/* Book Appointment - Blue */}
//       <Link
//         href="/book-appointment"
//         className="bg-sky-700 text-white px-8 py-4 rounded-lg font-semibold text-center text-lg transition-all duration-200 hover:bg-sky-900 shadow-md"
//       >
//         Book Appointment
//       </Link>

//       {/* Call Now - White */}
//       <a
//         href="tel:+1234567890"
//         className="border border-gray-300 text-sky-900 px-8 py-4 rounded-lg font-semibold text-center text-lg transition-all duration-200 hover:bg-sky-100 shadow-sm"
//       >
//         Call Now
//       </a>

//     </div>

//     {/* Accepting New Patients */}
//     <p className="text-sky-800 font-medium text-base">
//       Accepting new patients.
//     </p>

//   </div>

// </section>

//       {/* Services Preview */}
//       <section id="services" className="py-16 bg-sky-50">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-2xl font-bold text-sky-900 mb-3">
//               Our Medical Services
//             </h2>
//             <div className="w-12 h-0.5 bg-sky-500 rounded-full mx-auto mb-4"></div>
//             <p className="text-sky-700 max-w-3xl mx-auto text-sm sm:text-base  leading-relaxed">
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
//                 title: 'STI Screening',
//                 description: 'Confidential and accurate testing for sexually transmitted infections.'
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
//                 title: 'Counselling',
//                 description: 'Professional health counselling to support your physical and emotional wellbeing.'
//               },
//               {
//                 icon: (
//                   <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
//                   </svg>
//                 ),
//                 title: 'Treatments',
//                 description: 'Comprehensive medical treatments tailored to your health needs.'
//               }
//             ].map((service, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl p-6 border border-sky-200 hover:border-sky-400 transition-all duration-200 text-center hover:shadow-lg hover:shadow-sky-100"
//               >
//                 <div className="text-sky-600 mb-4 flex justify-center">
//                   {service.icon}
//                 </div>
//                 <h3 className="text-lg font-semibold text-sky-900 mb-2">{service.title}</h3>
//                 <p className="text-sky-700 text-sm leading-relaxed">{service.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Clinic Policy & Hours Section */}
//       <section className="py-16 bg-sky-50">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             {/* Clinic Policy */}
//             <div>
//               <h2 className="text-2xl font-bold text-sky-900 mb-6">Clinic Policy</h2>
//               <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-sky-200">
//                 <div className="space-y-6">
//                   <div className="flex items-start space-x-4">
//                     <div className="flex-shrink-0 w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-sky-900 mb-1">Appointment Policy</h3>
//                       <p className="text-sky-700 text-sm">
//                         Please arrive 10 minutes early for your appointment. Late arrivals may be asked to reschedule.
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start space-x-4">
//                     <div className="flex-shrink-0 w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-sky-900 mb-1">Cancellation Policy</h3>
//                       <p className="text-sky-700 text-sm">
//                         24-hour notice required for appointment cancellations. Multiple no-shows may result in discharge from the clinic.
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start space-x-4">
//                     <div className="flex-shrink-0 w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-sky-900 mb-1">Document Fees</h3>
//                       <p className="text-sky-700 text-sm">
//                         Medical forms and documents not covered by OHIP may incur fees. Please inquire at reception.
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start space-x-4">
//                     <div className="flex-shrink-0 w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-sky-900 mb-1">New Patients</h3>
//                       <p className="text-sky-700 text-sm">
//                         New patients are welcome! Please bring your health card and any relevant medical records.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Hours of Operation */}
//             <div>
//               <h2 className="text-2xl font-bold text-sky-900 mb-6">Hours of Operation</h2>
//               <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-sky-200">
//                 <div className="space-y-4 mb-6">
//                   {[
//                     { day: 'Monday', hours: '4:00 PM - 8:00 PM' },
//                     { day: 'Tuesday', hours: '10:00 AM - 7:00 PM' },
//                     { day: 'Wednesday', hours: '4:00 PM - 8:00 PM' },
//                     { day: 'Thursday', hours: '10:00 AM - 7:00 PM' },
//                     // { day: 'Friday', hours: '10:00 AM - 7:00 PM' },
//                     { day: 'Saturday', hours: '10:00 AM - 3:00 PM' },
//                     { day: 'Sunday', hours: 'Closed' }
//                   ].map((schedule, index) => (
//                     <div key={index} className="flex justify-between items-center py-2 border-b border-sky-100 last:border-b-0">
//                       <span className={`font-medium ${schedule.day === 'Sunday' ? 'text-red-500' : 'text-sky-800'}`}>
//                         {schedule.day}
//                       </span>
//                       <span className={schedule.hours === 'Closed' ? 'text-red-500 font-medium' : 'text-sky-700'}>
//                         {schedule.hours}
//                       </span>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Emergency Notice */}
//                 <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//                   <div className="flex items-start space-x-3">
//                     <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                     </svg>
//                     <div>
//                       <h4 className="font-semibold text-red-800 text-sm mb-1">Emergency Care</h4>
//                       <p className="text-red-700 text-xs">
//                         For medical emergencies, please call 911 or visit your nearest hospital emergency department.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 bg-sky-100">
//         <div className="max-w-4xl mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-2xl font-bold text-sky-900 mb-3">
//               Why Choose Our Clinic
//             </h2>
//             <div className="w-12 h-0.5 bg-sky-500 rounded-full mx-auto mb-4"></div>
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
//                   <h3 className="text-lg font-semibold text-sky-900 mb-1">{feature.title}</h3>
//                   <p className="text-sky-700 text-sm">{feature.description}</p>
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
//           <Link
//             href="/waitlist"
//             className="inline-block bg-white text-sky-600 px-8 py-3 rounded-lg font-semibold hover:bg-sky-50 transition-all duration-200 hover:shadow-lg"
//           >
//             Join the waitlist
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }
