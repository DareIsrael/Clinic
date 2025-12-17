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
//         // Reset form
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
//       <div className="max-w-2xl mx-auto">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               Join Our Waitlist
//             </h1>
//             <p className="text-gray-600">
//               Provide your information and we'll contact you when spots become available.
//             </p>
//           </div>

//           {message && (
//             <div className={`p-4 rounded-lg mb-6 ${
//               isError ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'
//             }`}>
//               {message}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Personal Information */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   First Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="John"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Last Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Doe"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address *
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="john@example.com"
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Gender *
//                 </label>
//                 <select
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   {genderOptions.map(option => (
//                     <option key={option.value} value={option.value}>
//                       {option.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Date of Birth *
//                 </label>
//                 <input
//                   type="date"
//                   name="dateOfBirth"
//                   value={formData.dateOfBirth}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             {/* Contact Information */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Cell Phone *
//               </label>
//               <input
//                 type="tel"
//                 name="cellPhone"
//                 value={formData.cellPhone}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="+1 (555) 123-4567"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Address *
//               </label>
//               <input
//                 type="text"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="123 Main Street"
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Country *
//                 </label>
//                 <select
//                   name="country"
//                   value={formData.country}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   {countryOptions.map(option => (
//                     <option key={option.value} value={option.value}>
//                       {option.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Postal Code *
//                 </label>
//                 <input
//                   type="text"
//                   name="postalCode"
//                   value={formData.postalCode}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="12345"
//                 />
//               </div>
//             </div>

//             {/* Healthcare Information */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Healthcare Province *
//                 </label>
//                 <input
//                   type="text"
//                   name="healthcareProvince"
//                   value={formData.healthcareProvince}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Ontario"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Healthcare Number *
//                 </label>
//                 <input
//                   type="text"
//                   name="healthcareNumber"
//                   value={formData.healthcareNumber}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="123456789"
//                 />
//               </div>
//             </div>

//             <div className="pt-4">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition duration-200 font-semibold"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center">
//                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Joining Waitlist...
//                   </span>
//                 ) : (
//                   'Join Waitlist'
//                 )}
//               </button>
//             </div>

//             <div className="text-center text-sm text-gray-500">
//               <p>We'll contact you when appointments become available. No account creation required.</p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }



'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '@/components/InputField';

export default function WaitlistPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    healthcareProvince: '',
    healthcareNumber: '',
    dateOfBirth: '',
    cellPhone: '',
    address: '',
    country: '',
    postalCode: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const genderOptions = [
    { value: '', label: 'Select Gender' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' }
  ];

  const countryOptions = [
    { value: '', label: 'Select Country' },
    { value: 'USA', label: 'United States' },
    { value: 'Canada', label: 'Canada' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'Australia', label: 'Australia' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear specific field error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    // Clear success message when user makes changes
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validations
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.healthcareProvince.trim()) newErrors.healthcareProvince = 'Healthcare province is required';
    if (!formData.healthcareNumber.trim()) newErrors.healthcareNumber = 'Healthcare number is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.cellPhone.trim()) newErrors.cellPhone = 'Cell phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Date of birth validation
    if (formData.dateOfBirth) {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      if (dob > today) {
        newErrors.dateOfBirth = 'Date of birth cannot be in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});
    setSuccessMessage('');

    try {
      const response = await fetch('/api/waitlist/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        setSuccessMessage('Successfully joined waitlist! Redirecting...');
        
        // Redirect to confirmation page after short delay
        setTimeout(() => {
          router.push('/waiting-list-confirmation');
        }, 1500);
      } else {
        // Handle specific backend errors
        if (result.message?.includes('already on our waitlist') || result.message?.includes('duplicate')) {
          setErrors({ submit: 'This email is already on our waitlist. Please use a different email.' });
        } else if (result.message?.includes('validation failed')) {
          setErrors({ submit: 'Please check your information and try again.' });
        } else {
          setErrors({ submit: result.message || 'Failed to join waitlist. Please try again.' });
        }
      }
    } catch (error) {
      console.error('Waitlist join error:', error);
      
      // Handle different types of errors
      if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
        setErrors({ submit: 'Network error. Please check your connection and try again.' });
      } else if (error.response?.status === 500) {
        setErrors({ submit: 'Server error. Please try again later.' });
      } else {
        setErrors({ submit: 'An unexpected error occurred. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Form */}
            <div className="lg:w-1/2 p-6">
              <div className="max-w-sm mx-auto">
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-3">
                    <div className="w-10 h-10 bg-sky-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                  </div>
                  <h1 className="text-xl font-bold text-gray-900 mb-1">Join Our Waitlist</h1>
                  <p className="text-gray-600 text-xs">Get notified when appointments become available</p>
                </div>

                {/* Success Message */}
                {successMessage && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-lg mb-4 text-xs flex items-start">
                    <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {successMessage}
                  </div>
                )}

                {/* Error Message */}
                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg mb-4 text-xs flex items-start">
                    <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.submit}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Personal Information */}
                  <div className="grid grid-cols-2 gap-3 text-gray-700">
                    <InputField
                      label="First Name"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      error={errors.firstName}
                      required={true}
                      placeholder="John"
                      compact={true}
                    />

                    <InputField
                      label="Last Name"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      error={errors.lastName}
                      required={true}
                      placeholder="Doe"
                      compact={true}
                    />
                  </div>

                  <InputField
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    required={true}
                    placeholder="john@example.com"
                    compact={true}
                  />

                  <div className="grid grid-cols-2 gap-3 text-gray-700">
                    <InputField
                      label="Gender"
                      type="select"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      error={errors.gender}
                      required={true}
                      options={genderOptions}
                      compact={true}
                    />

                    <InputField
                      label="Date of Birth"
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      error={errors.dateOfBirth}
                      required={true}
                      compact={true}
                    />
                  </div>

                  {/* Contact Information */}
                  <InputField
                    label="Cell Phone"
                    type="tel"
                    name="cellPhone"
                    value={formData.cellPhone}
                    onChange={handleChange}
                    error={errors.cellPhone}
                    required={true}
                    placeholder="+1 (555) 123-4567"
                    compact={true}
                  />

                  <InputField
                    label="Address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    error={errors.address}
                    required={true}
                    placeholder="123 Main Street"
                    compact={true}
                  />

                  <div className="grid grid-cols-2 gap-3 text-gray-700">
                    <InputField
                      label="Country"
                      type="select"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      error={errors.country}
                      required={true}
                      options={countryOptions}
                      compact={true}
                    />

                    <InputField
                      label="Postal Code"
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      error={errors.postalCode}
                      required={true}
                      placeholder="12345"
                      compact={true}
                    />
                  </div>

                  {/* Healthcare Information */}
                  <div className="grid grid-cols-2 gap-3 text-gray-700">
                    <InputField
                      label="Healthcare Province"
                      type="text"
                      name="healthcareProvince"
                      value={formData.healthcareProvince}
                      onChange={handleChange}
                      error={errors.healthcareProvince}
                      required={true}
                      placeholder="Ontario"
                      compact={true}
                    />

                    <InputField
                      label="Healthcare Number"
                      type="text"
                      name="healthcareNumber"
                      value={formData.healthcareNumber}
                      onChange={handleChange}
                      error={errors.healthcareNumber}
                      required={true}
                      placeholder="123456789"
                      compact={true}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-sky-600 text-white py-2 px-4 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 font-semibold text-sm mt-2"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Joining Waitlist...
                      </span>
                    ) : (
                      'Join Waitlist'
                    )}
                  </button>
                </form>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-600">
                    We'll contact you when appointments become available.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="lg:w-1/2 bg-sky-600 relative">
              <div
                className="h-48 lg:h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1576097449790-4b5e7f7dd4c5?auto=format&fit=crop&w=1000&q=80")',
                }}
              >
                <div className="absolute inset-0 bg-blue-900/20"></div>
              </div>
              
              {/* Overlay Content */}
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="text-center text-white">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3 border border-white/30">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold mb-1">St Mary Rideau Clinic</h2>
                  <p className="text-sky-100 text-xs mb-3">Waitlist Registration</p>
                  <div className="space-y-2 text-xs text-sky-200 max-w-xs mx-auto">
                    <div className="flex items-center justify-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Secure Information
                    </div>
                    <div className="flex items-center justify-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email Notifications
                    </div>
                    <div className="flex items-center justify-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      No Commitment Required
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}