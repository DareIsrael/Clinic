'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 1,
      title: 'Dental Care',
      icon: '🦷',
      description: 'Comprehensive dental services for your oral health',
      features: [
        'Teeth Cleaning and Whitening',
        'Dental Fillings and Crowns',
        'Root Canal Treatment',
        'Cosmetic Dentistry',
        'Oral Surgery'
      ],
      duration: '30-60 mins',
      price: 'Starting at $50'
    },
    {
      id: 2,
      title: 'Eye Care',
      icon: '👁️',
      description: 'Complete vision care and eye health services',
      features: [
        'Comprehensive Eye Exams',
        'Prescription Glasses & Contacts',
        'Cataract Surgery',
        'Retinal Disease Treatment',
        'Pediatric Ophthalmology'
      ],
      duration: '45-90 mins',
      price: 'Starting at $75'
    },
    // ... other services (same as before)
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-0">
      {/* Hero Section */}
      <section className="bg-sky-600 text-white py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
            Our Medical Services
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Comprehensive healthcare services delivered by experienced professionals 
            using the latest medical technology.
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Healthcare Services</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We offer a wide range of medical services to meet all your healthcare needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {services.map((service) => (
              <div 
                key={service.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => setSelectedService(service)}
              >
                <div className="p-4 sm:p-6">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed">{service.description}</p>
                  <div className="flex justify-between items-center text-xs sm:text-sm text-gray-500 mb-4">
                    <span>{service.duration}</span>
                    <span className="font-semibold text-sky-600">{service.price}</span>
                  </div>
                  <button className="w-full bg-sky-600 text-white py-2 px-4 rounded text-sm sm:text-base hover:bg-sky-700 transition-colors duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <span className="text-3xl sm:text-4xl mr-3 sm:mr-4">{selectedService.icon}</span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{selectedService.title}</h3>
                    <p className="text-gray-600 text-sm sm:text-base">{selectedService.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl sm:text-3xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">Services Included:</h4>
                  <ul className="space-y-2">
                    {selectedService.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-xs sm:text-sm">
                        <span className="text-green-500 mr-2 text-lg">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-sky-50 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Service Details</h4>
                  <p className="text-xs sm:text-sm"><strong>Duration:</strong> {selectedService.duration}</p>
                  <p className="text-xs sm:text-sm"><strong>Price:</strong> {selectedService.price}</p>
                  <p className="text-xs sm:text-sm"><strong>Availability:</strong> Monday - Saturday</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link
                  href="appointments-Booking"
                  className="flex-1 bg-sky-600 text-white text-center py-3 px-4 rounded text-sm sm:text-base hover:bg-sky-700 transition-colors duration-300"
                  onClick={() => setSelectedService(null)}
                >
                  Book Appointment
                </Link>
                <button
                  onClick={() => setSelectedService(null)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded text-sm sm:text-base hover:bg-gray-400 transition-colors duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}