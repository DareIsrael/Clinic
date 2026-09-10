// =============================================================================
// WAITLIST PAGE — TEMPORARILY DISABLED
// =============================================================================
// The waitlist form has been disabled from the public-facing site.
// Visiting /waitlist now redirects to /appointment.
//
// To restore: remove the redirect component below and uncomment the
// original WaitlistPage component at the bottom of this file.
// =============================================================================

'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function WaitlistPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/appointment');
  }, [router]);
  return null;
}


/* === ORIGINAL WAITLIST PAGE CODE — PRESERVED FOR FUTURE RE-ENABLEMENT ===

// First version (already commented out before this change):

// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function WaitlistPage() {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     gender: '',
//     healthcareProvince: '',
//     healthcareNumber: '',
//     dateOfBirth: '',
//     cellPhone: '',
//     address: '',
//     country: '',
//     postalCode: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [isError, setIsError] = useState(false);

//   const genderOptions = [
//     { value: '', label: 'Select Gender' },
//     { value: 'Male', label: 'Male' },
//     { value: 'Female', label: 'Female' },
//     { value: 'Other', label: 'Other' }
//   ];

//   const countryOptions = [
//     { value: '', label: 'Select Country' },
//     { value: 'USA', label: 'United States' },
//     { value: 'Canada', label: 'Canada' },
//     { value: 'UK', label: 'United Kingdom' },
//     { value: 'Australia', label: 'Australia' }
//   ];

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     try {
//       const response = await fetch('/api/waitlist/join', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (data.success) {
//         setMessage(data.message);
//         setIsError(false);
//         setFormData({
//           firstName: '',
//           lastName: '',
//           email: '',
//           gender: '',
//           healthcareProvince: '',
//           healthcareNumber: '',
//           dateOfBirth: '',
//           cellPhone: '',
//           address: '',
//           country: '',
//           postalCode: ''
//         });
//       } else {
//         setMessage(data.message);
//         setIsError(true);
//       }
//     } catch (error) {
//       setMessage('Failed to join waitlist. Please try again.');
//       setIsError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       ... (truncated for brevity — original form UI)
//     </div>
//   );
// }


// Second version (the active form that was in use):

// 'use client';
// import { useState, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import InputField from '@/components/InputField';
//
// export default function WaitlistPage() {
//   const [formData, setFormData] = useState({
//     firstName: '', lastName: '', email: '', gender: '',
//     healthcareProvince: '', healthcareNumber: '', dateOfBirth: '',
//     cellPhone: '', address: '', country: '', postalCode: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState('');
//   const router = useRouter();
//   const hasTrackedRef = useRef(false);
//
//   const genderOptions = [
//     { value: '', label: 'Select Gender' },
//     { value: 'Male', label: 'Male' },
//     { value: 'Female', label: 'Female' },
//     { value: 'Other', label: 'Other' }
//   ];
//
//   const countryOptions = [
//     { value: '', label: 'Select Country' },
//     { value: 'USA', label: 'United States' },
//     { value: 'Canada', label: 'Canada' },
//     { value: 'UK', label: 'United Kingdom' },
//     { value: 'Australia', label: 'Australia' }
//   ];
//
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     if (errors[name]) { setErrors({ ...errors, [name]: '' }); }
//     if (successMessage) { setSuccessMessage(''); }
//   };
//
//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
//     if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
//     if (!formData.email.trim()) newErrors.email = 'Email is required';
//     if (!formData.gender) newErrors.gender = 'Gender is required';
//     if (!formData.healthcareProvince.trim()) newErrors.healthcareProvince = 'Healthcare province is required';
//     if (!formData.healthcareNumber.trim()) newErrors.healthcareNumber = 'Healthcare number is required';
//     if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
//     if (!formData.cellPhone.trim()) newErrors.cellPhone = 'Cell phone is required';
//     if (!formData.address.trim()) newErrors.address = 'Address is required';
//     if (!formData.country) newErrors.country = 'Country is required';
//     if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (formData.email && !emailRegex.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }
//     if (formData.dateOfBirth) {
//       const dob = new Date(formData.dateOfBirth);
//       if (dob > new Date()) { newErrors.dateOfBirth = 'Date of birth cannot be in the future'; }
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     setLoading(true);
//     setErrors({});
//     setSuccessMessage('');
//     try {
//       const response = await fetch('/api/waitlist/join', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
//       const result = await response.json();
//       if (result.success) {
//         if (typeof window !== 'undefined' && !hasTrackedRef.current) {
//           hasTrackedRef.current = true;
//           window.dataLayer = window.dataLayer || [];
//           window.dataLayer.push({
//             event: 'waitlist_signup',
//             eventCallback: function () { router.push('/waiting-list-confirmation'); },
//             eventTimeout: 2000,
//           });
//         }
//         setSuccessMessage('Successfully joined waitlist! Redirecting...');
//         setTimeout(() => { router.push('/waiting-list-confirmation'); }, 2500);
//       } else {
//         if (result.message?.includes('already on our waitlist') || result.message?.includes('duplicate')) {
//           setErrors({ submit: 'This email is already on our waitlist. Please use a different email.' });
//         } else if (result.message?.includes('validation failed')) {
//           setErrors({ submit: 'Please check your information and try again.' });
//         } else {
//           setErrors({ submit: result.message || 'Failed to join waitlist. Please try again.' });
//         }
//       }
//     } catch (error) {
//       console.error('Waitlist join error:', error);
//       if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
//         setErrors({ submit: 'Network error. Please check your connection and try again.' });
//       } else if (error.response?.status === 500) {
//         setErrors({ submit: 'Server error. Please try again later.' });
//       } else {
//         setErrors({ submit: 'An unexpected error occurred. Please try again.' });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center p-4">
//       <div className="max-w-5xl w-full">
//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
//           <div className="flex flex-col lg:flex-row">
//             <div className="lg:w-1/2 p-6">
//               <div className="max-w-sm mx-auto">
//                 <div className="text-center mb-6">
//                   <div className="flex justify-center mb-3">
//                     <div className="w-10 h-10 bg-sky-600 rounded-lg flex items-center justify-center">
//                       <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
//                       </svg>
//                     </div>
//                   </div>
//                   <h1 className="text-xl font-bold text-gray-900 mb-1">Join Our Waitlist</h1>
//                   <p className="text-gray-600 text-xs">Get notified when appointments become available</p>
//                 </div>
//                 ... (form fields using InputField component)
//                 ... (submit button, success/error messages)
//               </div>
//             </div>
//             <div className="lg:w-1/2 bg-sky-600 relative">
//               ... (right side image panel with clinic branding)
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

=== END PRESERVED WAITLIST CODE === */