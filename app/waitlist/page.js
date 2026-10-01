'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '@/components/InputField';

export default function WaitlistPage() {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', gender: '',
    healthcareProvince: '', healthcareNumber: '', dateOfBirth: '',
    cellPhone: '', address: '', country: '', postalCode: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();
  const hasTrackedRef = useRef(false);

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
    setFormData({ ...formData, [name]: value });
    if (errors[name]) { setErrors({ ...errors, [name]: '' }); }
    if (successMessage) { setSuccessMessage(''); }
  };

  const validateForm = () => {
    const newErrors = {};
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (formData.dateOfBirth) {
      const dob = new Date(formData.dateOfBirth);
      if (dob > new Date()) { newErrors.dateOfBirth = 'Date of birth cannot be in the future'; }
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        if (typeof window !== 'undefined' && !hasTrackedRef.current) {
          hasTrackedRef.current = true;
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'waitlist_signup',
            eventCallback: function () { router.push('/waiting-list-confirmation'); },
            eventTimeout: 2000,
          });
        }
        setSuccessMessage('Successfully joined waitlist! Redirecting...');
        setTimeout(() => { router.push('/waiting-list-confirmation'); }, 2500);
      } else {
        if (result.message?.includes('already on our waitlist')) {
          setErrors({ submit: result.message });
        } else if (result.message?.includes('validation failed')) {
          setErrors({ submit: 'Please check your information and try again.' });
        } else {
          setErrors({ submit: result.message || 'Failed to join waitlist. Please try again.' });
        }
      }
    } catch (error) {
      console.error('Waitlist join error:', error);
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
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm text-center">
                    {successMessage}
                  </div>
                )}

                {/* Submit Error */}
                {errors.submit && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm text-center">
                    {errors.submit}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
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
                    We&apos;ll contact you when appointments become available.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="lg:w-1/2 bg-sky-600 relative">
              <div
                className="h-48 lg:h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1576091160449-4b5e7f7dd4c5?auto=format&fit=crop&w=1000&q=80")',
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