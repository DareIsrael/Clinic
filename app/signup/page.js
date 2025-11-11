// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import InputField from '@/components/InputField';
// import { useAuth } from '@/contexts/AuthContext';

// export default function SignupPage() {
//   const { register } = useAuth(); // ✅ Moved inside component
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     gender: '',
//     healthcareProvince: '',
//     healthcareNumber: '',
//     age: '',
//     dateOfBirth: '',
//     cellPhone: '',
//     address: '',
//     country: '',
//     postalCode: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const router = useRouter();

//   const genderOptions = [
//     { value: 'Male', label: 'Male' },
//     { value: 'Female', label: 'Female' },
//     { value: 'Other', label: 'Other' }
//   ];

//   const countryOptions = [
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
//     // Clear error when user starts typing
//     if (errors[e.target.name]) {
//       setErrors({
//         ...errors,
//         [e.target.name]: ''
//       });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
//     if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
//     if (!formData.email.trim()) newErrors.email = 'Email is required';
//     if (!formData.gender) newErrors.gender = 'Gender is required';
//     if (!formData.healthcareProvince.trim()) newErrors.healthcareProvince = 'Healthcare province is required';
//     if (!formData.healthcareNumber.trim()) newErrors.healthcareNumber = 'Healthcare number is required';
//     if (!formData.age || formData.age < 0) newErrors.age = 'Valid age is required';
//     if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
//     if (!formData.cellPhone.trim()) newErrors.cellPhone = 'Cell phone is required';
//     if (!formData.address.trim()) newErrors.address = 'Address is required';
//     if (!formData.country) newErrors.country = 'Country is required';
//     if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
//     if (!formData.password) newErrors.password = 'Password is required';
//     if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    
//     if (formData.password && formData.password.length < 8) {
//       newErrors.password = 'Password must be at least 8 characters long';
//     }
    
//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (formData.email && !emailRegex.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;

//     setLoading(true);
//     setErrors({});

//     try {
//       const result = await register(formData);
      
//       if (result.success) {
//         router.push('/dashboard');
//       } else {
//         setErrors({ submit: result.message });
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       setErrors({ 
//         submit: 'An error occurred during registration. Please try again.' 
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-2xl mx-auto">
//         <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
//           <div className="text-center mb-6">
//             <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Create Your Account</h2>
//             <p className="mt-2 text-gray-600">Join thousands of patients managing their healthcare online</p>
//           </div>
          
//           {errors.submit && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
//               {errors.submit}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
//             <InputField
//               label="First Name"
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               error={errors.firstName}
//               required={true}
//               placeholder="Enter your first name"
//             />

//             <InputField
//               label="Last Name"
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               error={errors.lastName}
//               required={true}
//               placeholder="Enter your last name"
//             />

//             <div className="md:col-span-2">
//               <InputField
//                 label="Email Address"
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 error={errors.email}
//                 required={true}
//                 placeholder="your.email@example.com"
//               />
//             </div>

//             <InputField
//               label="Gender"
//               type="select"
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               error={errors.gender}
//               required={true}
//               options={genderOptions}
//             />

//             <InputField
//               label="Healthcare Province"
//               type="text"
//               name="healthcareProvince"
//               value={formData.healthcareProvince}
//               onChange={handleChange}
//               error={errors.healthcareProvince}
//               required={true}
//               placeholder="Enter your province"
//             />

//             <InputField
//               label="Healthcare Number"
//               type="text"
//               name="healthcareNumber"
//               value={formData.healthcareNumber}
//               onChange={handleChange}
//               error={errors.healthcareNumber}
//               required={true}
//               placeholder="Enter healthcare number"
//             />

//             <InputField
//               label="Age"
//               type="number"
//               name="age"
//               value={formData.age}
//               onChange={handleChange}
//               error={errors.age}
//               required={true}
//               placeholder="Enter your age"
//               min="0"
//               max="120"
//             />

//             <InputField
//               label="Date of Birth"
//               type="date"
//               name="dateOfBirth"
//               value={formData.dateOfBirth}
//               onChange={handleChange}
//               error={errors.dateOfBirth}
//               required={true}
//             />

//             <InputField
//               label="Cell Phone"
//               type="tel"
//               name="cellPhone"
//               value={formData.cellPhone}
//               onChange={handleChange}
//               error={errors.cellPhone}
//               required={true}
//               placeholder="Enter your phone number"
//             />

//             <div className="md:col-span-2">
//               <InputField
//                 label="Address"
//                 type="text"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 error={errors.address}
//                 required={true}
//                 placeholder="Enter your full address"
//               />
//             </div>

//             <InputField
//               label="Country"
//               type="select"
//               name="country"
//               value={formData.country}
//               onChange={handleChange}
//               error={errors.country}
//               required={true}
//               options={countryOptions}
//             />

//             <InputField
//               label="Postal Code"
//               type="text"
//               name="postalCode"
//               value={formData.postalCode}
//               onChange={handleChange}
//               error={errors.postalCode}
//               required={true}
//               placeholder="Enter postal code"
//             />

//             <InputField
//               label="Password"
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               error={errors.password}
//               required={true}
//               placeholder="Create a password (min. 8 characters)"
//             />

//             <InputField
//               label="Confirm Password"
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               error={errors.confirmPassword}
//               required={true}
//               placeholder="Confirm your password"
//             />

//             <div className="md:col-span-2">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition duration-300 transform hover:scale-105"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center">
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Creating Account...
//                   </span>
//                 ) : (
//                   'Create Account'
//                 )}
//               </button>
//             </div>
//           </form>

//           <p className="text-center text-gray-600 mt-6 text-sm">
//             Already have an account?{' '}
//             <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium transition duration-300">
//               Sign in here
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import InputField from '@/components/InputField';
import { useAuth } from '@/contexts/AuthContext';

export default function SignupPage() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    healthcareProvince: '',
    healthcareNumber: '',
    age: '',
    dateOfBirth: '',
    cellPhone: '',
    address: '',
    country: '',
    postalCode: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' }
  ];

  const countryOptions = [
    { value: 'USA', label: 'United States' },
    { value: 'Canada', label: 'Canada' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'Australia', label: 'Australia' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.healthcareProvince.trim()) newErrors.healthcareProvince = 'Healthcare province is required';
    if (!formData.healthcareNumber.trim()) newErrors.healthcareNumber = 'Healthcare number is required';
    if (!formData.age || formData.age < 0) newErrors.age = 'Valid age is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.cellPhone.trim()) newErrors.cellPhone = 'Cell phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    
    if (formData.password && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const result = await register(formData);
      
      if (result.success) {
        router.push('/dashboard');
      } else {
        setErrors({ submit: result.message });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ 
        submit: 'An error occurred during registration. Please try again.' 
      });
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
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                  </div>
                  <h1 className="text-xl font-bold text-gray-900 mb-1">Join Our Clinic</h1>
                  <p className="text-gray-600 text-xs">Create your patient portal account</p>
                </div>

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
                  <div className="grid grid-cols-2 gap-3">
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

                  <div className="grid grid-cols-2 gap-3">
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
                      label="Age"
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      error={errors.age}
                      required={true}
                      placeholder="30"
                      min="0"
                      max="120"
                      compact={true}
                    />
                  </div>

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

                  <div className="grid grid-cols-2 gap-3">
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
                  <div className="grid grid-cols-2 gap-3">
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

                  {/* Password Section */}
                  <div className="grid grid-cols-2 gap-3">
                    <InputField
                      label="Password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      error={errors.password}
                      required={true}
                      placeholder="••••••••"
                      compact={true}
                    />

                    <InputField
                      label="Confirm Password"
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      error={errors.confirmPassword}
                      required={true}
                      placeholder="••••••••"
                      compact={true}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition duration-200 font-semibold text-sm mt-2"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Account...
                      </span>
                    ) : (
                      'Create Patient Account'
                    )}
                  </button>
                </form>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="lg:w-1/2 bg-blue-600 relative">
              <div 
                className="h-48 lg:h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80")',
                }}
              >
                <div className="absolute inset-0 bg-blue-900/30"></div>
              </div>
              
              {/* Overlay Content */}
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="text-center text-white">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3 border border-white/30">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold mb-1">St Mary Rideau Clinic</h2>
                  <p className="text-blue-100 text-xs mb-3">Patient Registration</p>
                  <div className="space-y-2 text-xs text-blue-200 max-w-xs mx-auto">
                    <div className="flex items-center justify-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Secure Patient Portal
                    </div>
                    <div className="flex items-center justify-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Easy Appointment Booking
                    </div>
                    {/* <div className="flex items-center justify-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Medical Records Access
                    </div> */}
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