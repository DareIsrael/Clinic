'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import InputField from '@/components/InputField';
import { useAuth } from '@/hooks/useAuth';

export default function SignupPage() {
  const { register, signIn } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    healthcareProvince: '',
    healthcareNumber: '',
    // age: '',
    dateOfBirth: '',
    cellPhone: '',
    address: '',
    country: '',
    postalCode: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
  if (!formData.password) newErrors.password = 'Password is required';
  if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (formData.email && !emailRegex.test(formData.email)) {
    newErrors.email = 'Please enter a valid email address';
  }

  // Password validation
  if (formData.password) {
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
  }
  
  // Confirm password validation
  if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = 'Passwords do not match';
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
      const result = await register(formData);
      
      if (result.success) {
        setSuccessMessage('Account created successfully! Signing you in...');
        
        // Automatically sign in the user after successful registration
        try {
          const signInResult = await signIn(formData.email, formData.password);
          if (signInResult?.ok) {
            setSuccessMessage('loading...');
            setTimeout(() => {
              router.push('/login');
            }, 1000);
          } else {
            // If auto-signin fails, redirect to login page
            setSuccessMessage('loading...');
            setTimeout(() => {
              router.push('/login');
            }, 2000);
          }
        } catch (signInError) {
          console.error('Auto sign-in error:', signInError);
          setSuccessMessage('loading...');
          setTimeout(() => {
            router.push('/login');
          }, 2000);
        }
      } else {
        // Handle specific backend errors
        if (result.message?.includes('already exists') || result.message?.includes('duplicate')) {
          setErrors({ submit: 'An account with this email already exists. Please use a different email or try logging in.' });
        } else if (result.message?.includes('validation failed')) {
          setErrors({ submit: 'Please check your information and try again.' });
        } else {
          setErrors({ submit: result.message || 'Registration failed. Please try again.' });
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      
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
                  <h1 className="text-xl font-bold text-gray-900 mb-1">Join Our Clinic</h1>
                  <p className="text-gray-600 text-xs">Register</p>
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

                    {/* <InputField
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
                    /> */}
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

                  {/* Password Section with Toggle */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition text-gray-700 duration-200 pr-10 ${
                            errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-sky-500'
                          }`}
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition duration-200"
                        >
                          {showPassword ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-500 text-xs mt-1 flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-200 text-gray-700 pr-10 ${
                            errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-sky-500'
                          }`}
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          onClick={toggleConfirmPasswordVisibility}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition duration-200"
                        >
                          {showConfirmPassword ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1 flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Password Requirements */}
                  <div className="bg-sky-50 rounded-lg p-3 border border-sky-200">
                    <p className="text-xs text-sky-800 font-medium mb-1">Password Requirements:</p>
                    <ul className="text-xs text-sky-600 space-y-1">
                      <li className={`flex items-center ${formData.password.length >= 8 ? 'text-green-600' : ''}`}>
                        <svg className={`w-3 h-3 mr-1 ${formData.password.length >= 8 ? 'text-green-500' : 'text-sky-400'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        At least 8 characters long
                      </li>
                      <li className={`flex items-center ${/(?=.*[a-z])/.test(formData.password) ? 'text-green-600' : ''}`}>
                        <svg className={`w-3 h-3 mr-1 ${/(?=.*[a-z])/.test(formData.password) ? 'text-green-500' : 'text-sky-400'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        One lowercase letter
                      </li>
                      <li className={`flex items-center ${/(?=.*[A-Z])/.test(formData.password) ? 'text-green-600' : ''}`}>
                        <svg className={`w-3 h-3 mr-1 ${/(?=.*[A-Z])/.test(formData.password) ? 'text-green-500' : 'text-sky-400'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        One uppercase letter
                      </li>
                      <li className={`flex items-center ${/(?=.*\d)/.test(formData.password) ? 'text-green-600' : ''}`}>
                        <svg className={`w-3 h-3 mr-1 ${/(?=.*\d)/.test(formData.password) ? 'text-green-500' : 'text-sky-400'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        One number
                      </li>
                    </ul>
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
                        Registering...
                      </span>
                    ) : (
                      'Register'
                    )}
                  </button>
                </form>

                {/* <div className="mt-4 text-center">
                  <p className="text-xs text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="font-medium text-sky-600 hover:text-sky-500 transition duration-200">
                      Sign in here
                    </Link>
                  </p>
                </div> */}
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold mb-1">St Mary Rideau Clinic</h2>
                  <p className="text-sky-100 text-xs mb-3">Admin Registration</p>
                  <div className="space-y-2 text-xs text-sky-200 max-w-xs mx-auto">
                  
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