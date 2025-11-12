// 'use client';
// import { useState } from 'react';

// export default function ContactPage() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState('');

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setSubmitStatus('');

//     setTimeout(() => {
//       setLoading(false);
//       setSubmitStatus('success');
//       setFormData({
//         name: '',
//         email: '',
//         subject: '',
//         message: ''
//       });
//     }, 2000);
//   };

//   const contactInfo = [
//     {
//       icon: (
//         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//         </svg>
//       ),
//       title: 'Visit Our Clinic',
//       details: ['St Mary Rideau Family Clinic', '158 Rideau Street', 'Ottawa, K1N5X6'],
//       description: 'Free parking available onsite'
//     },
//     {
//       icon: (
//         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//         </svg>
//       ),
//       title: 'Call Us',
//       details: ['Main: (613) 301-8805'],
//       description: 'Same-day appointments available'
//     },
//     {
//       icon: (
//         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//         </svg>
//       ),
//       title: 'Email Us',
//       details: ['info@stmaryrideau.ca', 'drfagbolagun@stmaryrideau.ca', 'appointments@stmaryrideau.ca'],
//       description: 'We respond within 24 hours'
//     },
//     {
//       icon: (
//         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       ),
//       title: 'Opening Hours',
//       details: ['Monday - Friday: 9:00 AM - 5:00 PM', 'Saturday: 9:00 AM - 2:00 PM', 'Sunday: Closed'],
//       description: 'Extended hours by appointment'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section with Background Image */}
//       <section className="relative min-h-[50vh] flex items-center justify-start bg-gray-900 overflow-hidden">
//         {/* Background Image */}
//         <div 
//           className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//           style={{
//             backgroundImage: 'url("https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
//           }}
//         >
//           <div className="absolute inset-0 bg-sky-900/70"></div>
//         </div>

//         {/* Blue Text Box */}
//         <div className="relative z-10 max-w-md mx-4 lg:mx-16 xl:mx-24 bg-sky-800/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-sky-400/30 shadow-xl">
//           <h1 className="text-2xl lg:text-3xl font-bold text-white mb-4">
//             Contact St Mary Rideau Clinic
//           </h1>
//           <div className="w-12 h-0.5 bg-sky-300 rounded-full mb-4"></div>
//           <p className="text-lg text-sky-100 font-medium mb-2">
//             Dr. Oluwaseun FAGBOLAGUN
//           </p>
//           <p className="text-sm text-sky-200/80 mb-4">
//             MD CCFP MRCGP • Family Physician
//           </p>
//           <p className="text-sm text-white leading-relaxed">
//             We're here to help you with all your healthcare needs. Get in touch with us today for appointments, inquiries, or medical concerns.
//           </p>
//         </div>
//       </section>

//       {/* Contact Information & Form */}
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-6xl mx-auto px-4">
//           {/* Contact Information Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
//             {contactInfo.map((info, index) => (
//               <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
//                 <div className="text-sky-600 mb-4 flex justify-center">
//                   {info.icon}
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">{info.title}</h3>
//                 <div className="space-y-2 mb-4">
//                   {info.details.map((detail, idx) => (
//                     <p key={idx} className="text-gray-600 text-sm">{detail}</p>
//                   ))}
//                 </div>
//                 <p className="text-xs text-sky-600 font-medium">{info.description}</p>
//               </div>
//             ))}
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             {/* Contact Form */}
//             <div className="bg-white rounded-2xl p-8 shadow-sm">
//               <h2 className="text-2xl font-bold text-gray-800 mb-2">Send Us a Message</h2>
//               <div className="w-12 h-1 bg-sky-600 mb-6"></div>
              
//               {submitStatus === 'success' && (
//                 <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
//                   Thank you for your message! We'll get back to you within 24 hours.
//                 </div>
//               )}

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//                     Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200"
//                     placeholder="Your full name"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                     Email Address *
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200"
//                     placeholder="your.email@example.com"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
//                     Subject *
//                   </label>
//                   <select
//                     id="subject"
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200"
//                   >
//                     <option value="">Select a subject</option>
//                     <option value="appointment">Appointment Inquiry</option>
//                     <option value="prescription">Prescription Refill</option>
//                     <option value="medical-records">Medical Records</option>
//                     <option value="billing">Billing Question</option>
//                     <option value="referral">Specialist Referral</option>
//                     <option value="general">General Inquiry</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
//                     Message *
//                   </label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     rows="5"
//                     value={formData.message}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200 resize-none"
//                     placeholder="Please describe your inquiry in detail..."
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full bg-sky-600 text-white py-4 px-6 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-50 transition duration-300 font-semibold"
//                 >
//                   {loading ? (
//                     <span className="flex items-center justify-center">
//                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Sending Message...
//                     </span>
//                   ) : (
//                     'Send Message'
//                   )}
//                 </button>
//               </form>
//             </div>

//             {/* Map and Additional Info */}
//             <div className="space-y-8">
//               {/* Map Placeholder */}
//               <div className="bg-white rounded-2xl p-8 shadow-sm">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Location</h3>
//                 <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
//                   <div className="text-center text-gray-500">
//                     <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
//                     </svg>
//                     <p className="font-medium">Interactive Map</p>
//                     <p className="text-sm mt-1">158 Rideau Street Ottawa, K1N5X6</p>
//                   </div>
//                 </div>
//                 <div className="mt-4 text-center">
//                   <button className="text-sky-600 hover:text-sky-700 font-medium text-sm">
//                     Get Directions →
//                   </button>
//                 </div>
//               </div>

//               {/* Emergency Info */}
//               <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
//                 <div className="flex items-start space-x-3">
//                   <svg className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                   </svg>
//                   <div>
//                     <h3 className="text-lg font-semibold text-red-800 mb-2">Medical Emergency</h3>
//                     <p className="text-red-700 text-sm mb-3">
//                       For urgent medical concerns that require immediate attention, please call 911 or visit your nearest emergency department.
//                     </p>
//                     <div className="text-lg font-bold text-red-800">Call 911 for Emergencies</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Quick Contact */}
//               <div className="bg-sky-50 rounded-2xl p-6">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Contact</h3>
//                 <div className="space-y-2 text-sm text-gray-600">
//                   <p>📞 <span className="font-medium">Appointments:</span> (613) 301-8805</p>
//                   <p>📠 <span className="font-medium">Fax:</span> (613) 301-8805</p>
//                   <p>📧 <span className="font-medium">Email:</span> appointments@stmaryrideau.ca</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }



'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus('');

    setTimeout(() => {
      setLoading(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Visit Our Clinic',
      details: ['St Mary Rideau Family Clinic', '158 Rideau Street', 'Ottawa, K1N5X6'],
      description: 'Free parking available onsite'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Call Us',
      details: ['Main: (613) 301-8805'],
      description: 'Same-day appointments available'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email Us',
      details: ['info@stmaryrideau.ca', 'drfagbolagun@stmaryrideau.ca', 'appointments@stmaryrideau.ca'],
      description: 'We respond within 24 hours'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Opening Hours',
      details: ['Monday - Friday: 9:00 AM - 5:00 PM', 'Saturday: 9:00 AM - 2:00 PM', 'Sunday: Closed'],
      description: 'Extended hours by appointment'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[50vh] flex items-center justify-start bg-sky-900 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-sky-900/70"></div>
        </div>

        {/* Sky Blue Text Box */}
        <div className="relative z-10 max-w-md mx-4 lg:mx-16 xl:mx-24 bg-sky-700/90 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-sky-400/40 shadow-xl">
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Contact St Mary Rideau Clinic
          </h1>
          <div className="w-12 h-0.5 bg-sky-300 rounded-full mb-4"></div>
          <p className="text-lg text-sky-50 font-medium mb-2">
            Dr. Oluwaseun FAGBOLAGUN
          </p>
          <p className="text-sm text-sky-200/90 mb-4">
            MD CCFP MRCGP • Family Physician
          </p>
          <p className="text-sm text-white leading-relaxed">
            We're here to help you with all your healthcare needs. Get in touch with us today for appointments, inquiries, or medical concerns.
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16 bg-sky-50">
        <div className="max-w-6xl mx-auto px-4">
          {/* Contact Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center border border-sky-100">
                <div className="text-sky-600 mb-4 flex justify-center">
                  {info.icon}
                </div>
                <h3 className="text-lg font-semibold text-sky-900 mb-4">{info.title}</h3>
                <div className="space-y-2 mb-4">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sky-700 text-sm">{detail}</p>
                  ))}
                </div>
                <p className="text-xs text-sky-600 font-medium">{info.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-sky-200">
              <h2 className="text-2xl font-bold text-sky-900 mb-2">Send Us a Message</h2>
              <div className="w-12 h-1 bg-sky-500 mb-6"></div>
              
              {submitStatus === 'success' && (
                <div className="bg-emerald-100 border border-emerald-400 text-emerald-700 px-4 py-3 rounded-lg mb-6">
                  Thank you for your message! We'll get back to you within 24 hours.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-sky-800 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200 bg-white"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-sky-800 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200 bg-white"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-sky-800 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200 bg-white"
                  >
                    <option value="">Select a subject</option>
                    <option value="appointment">Appointment Inquiry</option>
                    <option value="prescription">Prescription Refill</option>
                    <option value="medical-records">Medical Records</option>
                    <option value="billing">Billing Question</option>
                    <option value="referral">Specialist Referral</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-sky-800 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200 resize-none bg-white"
                    placeholder="Please describe your inquiry in detail..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-sky-600 text-white py-4 px-6 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-50 transition duration-300 font-semibold"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Message...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-sky-200">
                <h3 className="text-xl font-semibold text-sky-900 mb-4">Our Location</h3>
                <div className="bg-sky-50 h-64 rounded-lg flex items-center justify-center border-2 border-dashed border-sky-200">
                  <div className="text-center text-sky-600">
                    <svg className="w-12 h-12 mx-auto mb-3 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <p className="font-medium">Interactive Map</p>
                    <p className="text-sm mt-1">158 Rideau Street Ottawa, K1N5X6</p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <button className="text-sky-600 hover:text-sky-700 font-medium text-sm">
                    Get Directions →
                  </button>
                </div>
              </div>

              {/* Emergency Info */}
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-semibold text-red-800 mb-2">Medical Emergency</h3>
                    <p className="text-red-700 text-sm mb-3">
                      For urgent medical concerns that require immediate attention, please call 911 or visit your nearest emergency department.
                    </p>
                    <div className="text-lg font-bold text-red-800">Call 911 for Emergencies</div>
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-sky-100 rounded-2xl p-6 border border-sky-200">
                <h3 className="text-lg font-semibold text-sky-900 mb-3">Quick Contact</h3>
                <div className="space-y-2 text-sm text-sky-700">
                  <p className="flex items-center">
                    <span className="w-6">📞</span>
                    <span><span className="font-medium">Appointments:</span> (613) 301-8805</span>
                  </p>
                  <p className="flex items-center">
                    <span className="w-6">📠</span>
                    <span><span className="font-medium">Fax:</span> (613) 301-8805</span>
                  </p>
                  <p className="flex items-center">
                    <span className="w-6">📧</span>
                    <span><span className="font-medium">Email:</span> appointments@stmaryrideau.ca</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}