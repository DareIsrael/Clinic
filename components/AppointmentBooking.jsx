'use client';
import { useState, useEffect } from 'react';

export default function AppointmentBooking() {
  // State management
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [clinicSchedule, setClinicSchedule] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [otherProvince, setOtherProvince] = useState('');

  // Form data
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
    country: 'Canada',
    postalCode: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
    notes: '',
    urgency: 'medium'
  });

  // Canadian provinces
  const canadianProvinces = [
    'Alberta',
    'British Columbia',
    'Manitoba',
    'New Brunswick',
    'Newfoundland and Labrador',
    'Northwest Territories',
    'Nova Scotia',
    'Nunavut',
    'Ontario',
    'Prince Edward Island',
    'Quebec',
    'Saskatchewan',
    'Yukon'
  ];

  useEffect(() => {
    fetchClinicData();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate);
    }
  }, [selectedDate]);

  // Format date display - SIMPLE FIX: No timezone complexity
  const formatDateDisplay = (dateString) => {
    if (!dateString) return '';
    
    // If it's a YYYY-MM-DD string, format it nicely
    if (typeof dateString === 'string' && dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateString.split('-');
      const dateObj = new Date(year, month - 1, day);
      
      const options = { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      };
      return dateObj.toLocaleDateString('en-US', options);
    }
    
    return dateString;
  };

  const fetchClinicData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/appointments');
      const data = await response.json();
      
      if (data.success) {
        setClinicSchedule(data.clinicSchedule || []);
        setAvailableDates(data.availableDates || []);
      } else {
        setError(data.message || 'Failed to load clinic information');
      }
    } catch (error) {
      console.error('Error fetching clinic data:', error);
      setError('Failed to load clinic information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableSlots = async (date) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/appointments?date=${date}`);
      const data = await response.json();
      
      if (data.success) {
        setAvailableSlots(data.slots);
      } else {
        setError(data.message);
        setAvailableSlots([]);
      }
    } catch (error) {
      console.error('Error fetching slots:', error);
      setError('Failed to fetch available slots');
      setAvailableSlots([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setFormData(prev => ({ ...prev, appointmentDate: date }));
    setSelectedTime('');
    setStep(2);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setFormData(prev => ({ ...prev, appointmentTime: time }));
    setStep(3);
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    
    if (type === 'radio') {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleHealthcareProvinceChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, healthcareProvince: value }));
    
    if (value !== 'Other') {
      setOtherProvince('');
    }
  };

  const handleOtherProvinceChange = (e) => {
    const value = e.target.value;
    setOtherProvince(value);
    setFormData(prev => ({ ...prev, healthcareProvince: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const finalFormData = {
      ...formData,
      healthcareProvince: formData.healthcareProvince === 'Other' ? otherProvince : formData.healthcareProvince,
      country: 'Canada'
    };

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalFormData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Appointment booked successfully! You will receive a confirmation email.');
        setStep(4);
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          gender: '',
          healthcareProvince: '',
          healthcareNumber: '',
          dateOfBirth: '',
          cellPhone: '',
          address: '',
          country: 'Canada',
          postalCode: '',
          appointmentDate: '',
          appointmentTime: '',
          reason: '',
          notes: '',
          urgency: 'medium'
        });
        setOtherProvince('');
        setSelectedDate('');
        setSelectedTime('');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setSelectedDate('');
    setSelectedTime('');
    setOtherProvince('');
    setError('');
    setSuccess('');
    fetchClinicData();
  };

  return (
    <div className="min-h-screen bg-white">
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 bg-white">
      {/* Header Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 rounded-full mb-4">
          <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-sky-900 mb-2">Book Your Appointment</h1>
        <p className="text-gray-600 text-md">Book your appointment from available time slots.</p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Progress Bar */}
        <div className="bg-gray-50 px-6 py-4">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step === stepNumber 
                    ? 'bg-sky-600 text-white ring-4 ring-sky-100' 
                    : step > stepNumber 
                    ? 'bg-sky-500 text-white' 
                    : 'bg-white text-gray-400 border-2 border-gray-300'
                }`}>
                  {stepNumber}
                </div>
                <div className="ml-4 hidden sm:block">
                  <div className={`text-sm font-medium ${
                    step >= stepNumber ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {stepNumber === 1 && 'Select Date'}
                    {stepNumber === 2 && 'Select Time'}
                    {stepNumber === 3 && 'Your Details'}
                    {stepNumber === 4 && 'Confirmation'}
                  </div>
                </div>
                {stepNumber < 4 && (
                  <div className={`h-1 w-8 sm:w-16 mx-2 ${
                    step > stepNumber ? 'bg-sky-500' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8">
          {/* Error/Success Messages */}
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}
          
          {success && (
            <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-r">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-green-700">{success}</p>
              </div>
            </div>
          )}

          {/* Step 1: Select Date */}
          {step === 1 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Select Appointment Date</h2>
                <p className="text-gray-600">Choose from available dates below</p>
              </div>
              
              {/* Clinic Schedule Card */}
              {/* {clinicSchedule.length > 0 && (
                <div className="bg-sky-50 rounded-xl p-6 mb-8 border border-sky-100">
                  <div className="flex items-center mb-4">
                    <svg className="w-6 h-6 text-sky-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900">Clinic Hours</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3">
                    {clinicSchedule.map((day, index) => (
                      <div 
                        key={index} 
                        className={`p-3 rounded-lg text-center transition-colors ${
                          day.isOpen 
                            ? 'bg-white border border-sky-200 shadow-sm' 
                            : 'bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <div className="font-semibold text-gray-900">{day.day.slice(0, 3)}</div>
                        <div className={`text-sm mt-2 ${
                          day.isOpen ? 'text-sky-700 font-medium' : 'text-gray-500'
                        }`}>
                          {day.isOpen ? day.hours : 'Closed'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )} */}

              {/* Available Dates */}
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-sky-200 border-t-sky-600"></div>
                  <p className="mt-4 text-gray-600 font-medium">Loading available dates...</p>
                </div>
              ) : availableDates.length > 0 ? (
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {availableDates.map((dateInfo) => (
                      <button
                        key={dateInfo.date}
                        onClick={() => handleDateSelect(dateInfo.date)}
                        className={`p-5 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-md ${
                          selectedDate === dateInfo.date
                            ? 'border-sky-500 bg-sky-50 shadow-sky-100'
                            : 'border-gray-200 bg-white hover:border-sky-300'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-lg font-semibold text-gray-900">
                              {formatDateDisplay(dateInfo.date).split(',')[0]}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              {formatDateDisplay(dateInfo.date).split(',').slice(1).join(',')}
                            </div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                            dateInfo.isToday 
                              ? 'bg-sky-100 text-sky-800'
                              : dateInfo.isTomorrow
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {dateInfo.isToday ? 'Today' : dateInfo.isTomorrow ? 'Tomorrow' : dateInfo.dayName}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                          <span className="text-sm text-gray-600">Available slots</span>
                          <span className="font-semibold text-sky-600">{dateInfo.availableSlots || 0}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-500 text-lg font-medium">No available dates found</p>
                  <button
                    onClick={fetchClinicData}
                    className="mt-6 px-6 py-3 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition-colors shadow-sm"
                  >
                    Refresh Available Dates
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Select Time */}
          {step === 2 && (
            <div>
              <div className="flex items-center mb-8">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center text-sky-600 hover:text-sky-700 font-medium"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to dates
                </button>
                <div className="ml-auto text-right">
                  <h2 className="text-2xl font-bold text-gray-900">Select Time</h2>
                  <p className="text-gray-600">{selectedDate && formatDateDisplay(selectedDate)}</p>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-sky-200 border-t-sky-600"></div>
                  <p className="mt-4 text-gray-600 font-medium">Loading available time slots...</p>
                </div>
              ) : availableSlots.length > 0 ? (
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Available Time Slots</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {availableSlots.map((slot, index) => (
                        <button
                          key={index}
                          onClick={() => handleTimeSelect(slot.time)}
                          disabled={!slot.available}
                          className={`relative p-4 rounded-xl text-center transition-all duration-200 transform hover:-translate-y-1 ${
                            selectedTime === slot.time
                              ? 'bg-sky-600 text-white shadow-lg shadow-sky-200'
                              : slot.available
                              ? 'bg-white text-gray-900 border-2 border-sky-200 hover:border-sky-400 hover:shadow-md'
                              : 'bg-gray-50 text-gray-400 border-2 border-gray-200 cursor-not-allowed'
                          }`}
                        >
                          <div className="text-xl font-bold">{slot.time}</div>
                          <div className="text-sm mt-1">
                            {slot.available ? (
                              <span className="inline-flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                                Available
                              </span>
                            ) : (
                              <span className="inline-flex items-center">
                                <span className="w-2 h-2 bg-gray-400 rounded-full mr-1"></span>
                                Booked
                              </span>
                            )}
                          </div>
                          {selectedTime === slot.time && (
                            <div className="absolute -top-2 -right-2">
                              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {selectedTime && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-gray-600">Selected time:</p>
                          <p className="text-xl font-bold text-gray-900">{selectedTime}</p>
                        </div>
                        <button
                          onClick={() => setStep(3)}
                          className="px-8 py-3 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition-colors shadow-sm flex items-center"
                        >
                          Continue to Details
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-500 text-lg font-medium mb-2">No available time slots for this date</p>
                  <p className="text-gray-400 mb-6">Please select another date</p>
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition-colors shadow-sm"
                  >
                    Choose Another Date
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Personal Details */}
          {step === 3 && (
            <div>
              <div className="flex items-center mb-8">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center text-sky-600 hover:text-sky-700 font-medium"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to time selection
                </button>
                <div className="ml-auto text-right">
                  <h2 className="text-2xl font-bold text-gray-900">Your Information</h2>
                  <p className="text-gray-600">Complete your appointment details</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Appointment Summary Card */}
                <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-6 border border-sky-100">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-white rounded-lg border border-sky-200 flex items-center justify-center mr-4">
                      <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Appointment Details</h3>
                      <p className="text-sm text-gray-600">Review your selected appointment</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
                        <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <p className="text-sm text-gray-600">Date</p>
                          <p className="font-semibold text-gray-900">{selectedDate && formatDateDisplay(selectedDate)}</p>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
                        <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="text-sm text-gray-600">Time</p>
                          <p className="font-semibold text-gray-900">{selectedTime}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
                        <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <div>
                          <p className="text-sm text-gray-600">Location</p>
                          <p className="font-semibold text-gray-900">St Mary Rideau Clinic, Ottawa</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Information Section */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-700 focus:border-sky-500 transition-colors"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-700 focus:border-sky-500 transition-colors"
                        placeholder="Enter your last name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-700 focus:border-sky-500 transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="cellPhone"
                        value={formData.cellPhone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-700 focus:border-sky-500 transition-colors"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        required
                        max={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-700 focus:border-sky-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender *
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-700 focus:border-sky-500 transition-colors"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Address Information Section */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Address Information</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-700 focus:border-sky-500 transition-colors"
                        placeholder="123 Main Street, Ottawa, Ontario"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value="Canada"
                          readOnly
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-700 focus:border-sky-500 transition-colors"
                        placeholder="A1B 2C3"
                      />
                    </div>
                  </div>
                </div>

                {/* Healthcare Information Section */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Healthcare Information</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Healthcare Number *
                      </label>
                      <input
                        type="text"
                        name="healthcareNumber"
                        value={formData.healthcareNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-700 focus:border-sky-500 transition-colors"
                        placeholder="e.g., 123456789"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Healthcare Province *
                      </label>
                      <select
                        name="healthcareProvince"
                        value={formData.healthcareProvince}
                        onChange={handleHealthcareProvinceChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-700 focus:border-sky-500 transition-colors"
                      >
                        <option value="">Select Province/Territory</option>
                        {canadianProvinces.map(province => (
                          <option key={province} value={province}>{province}</option>
                        ))}
                        <option value="Other">Other (Please specify)</option>
                      </select>
                    </div>
                  </div>

                  {/* Other Province Input */}
                  {formData.healthcareProvince === 'Other' && (
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Specify Your Province/Territory *
                      </label>
                      <input
                        type="text"
                        value={otherProvince}
                        onChange={handleOtherProvinceChange}
                        required
                        className="w-full px-4 py-3 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-700 focus:border-sky-500 transition-colors"
                        placeholder="Enter your province or territory"
                      />
                    </div>
                  )}
                </div>

                {/* Appointment Details Section */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Appointment Details</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reason for Appointment *
                      </label>
                      <textarea
                        name="reason"
                        value={formData.reason}
                        onChange={handleInputChange}
                        required
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-700 focus:border-sky-500 transition-colors"
                        placeholder="Please describe the reason for your visit in detail..."
                      />
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="pt-8 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-8 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium w-full sm:w-auto flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back to Time Selection
                    </button>
                    <div className="flex gap-3 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-8 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium w-full sm:w-auto flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-medium shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto flex items-center justify-center"
                      >
                        {loading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            Confirm Appointment
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Appointment Confirmed!</h2>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Your appointment has been successfully booked. You will receive a confirmation email shortly with all the details.
              </p>
              
              {/* Appointment Card */}
              <div className="bg-gradient-to-r from-sky-50 to-white rounded-2xl p-8 max-w-2xl mx-auto mb-10 border border-sky-100 shadow-sm">
                <h3 className="font-bold text-gray-900 text-xl mb-6">Appointment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="text-left">
                      <p className="text-sm text-gray-600 mb-1">Date & Time</p>
                      <p className="font-semibold text-gray-900">
                        {selectedDate && formatDateDisplay(selectedDate)}
                        <br />
                        <span className="text-sky-600">{selectedTime}</span>
                      </p>
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-600 mb-1">Patient</p>
                      <p className="font-semibold text-gray-900">{formData.firstName} {formData.lastName}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-600 mb-1">Healthcare Number</p>
                      <p className="font-semibold text-gray-900">{formData.healthcareNumber}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="text-left">
                      <p className="text-sm text-gray-600 mb-1">Healthcare Province</p>
                      <p className="font-semibold text-gray-900">
                        {formData.healthcareProvince === 'Other' ? otherProvince : formData.healthcareProvince}
                      </p>
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-600 mb-1">Reason for Visit</p>
                      <p className="font-semibold text-gray-900">{formData.reason}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <p className="text-gray-700">
                      <strong>St Mary Rideau Clinic</strong> • 158 Rideau Street Ottawa, K1N5X6
                    </p>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="max-w-2xl mx-auto mb-10">
                <h4 className="font-semibold text-gray-900 text-lg mb-4">Next Steps & Important Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: '✉️', text: 'Check your email for confirmation' },
                    { icon: '⏰', text: 'Arrive 15 minutes before your appointment' },
                    { icon: '🆔', text: 'Bring your healthcare card and photo ID' },
                    { icon: '📋', text: 'Bring your provincial healthcare information' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-2xl mr-3">{item.icon}</span>
                      <p className="text-sm text-gray-700">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetForm}
                  className="px-8 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-medium shadow-sm hover:shadow flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Book Another Appointment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}