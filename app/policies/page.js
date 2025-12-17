export const metadata = {
  title: 'Patient Information & Clinic Policies | St Mary Rideau Family Clinic',
  description: 'Comprehensive information about patient rights, responsibilities, and clinic policies',
};

export default function PoliciesPage() {
  const policySections = [
    {
      id: 'patient-rights',
      title: 'Patient Rights',
      subtitle: 'As a patient, you have the right to:',
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      items: [
        {
          title: 'Respect & Dignity',
          content: 'Be treated with courtesy, compassion, and professionalism.'
        },
        {
          title: 'Clear Communication',
          content: 'Receive understandable information about your health, treatment options, and any costs associated with uninsured services.'
        },
        {
          title: 'Privacy Protection (PHIPA)',
          content: 'Your health information will be protected under the Personal Health Information Protection Act (PHIPA). Your records are stored securely and accessed only when necessary for your care.'
        },
        {
          title: 'Access to Your Records',
          content: 'You may request copies of your medical records or corrections to inaccuracies (fees may apply for copies).'
        },
        {
          title: 'Involvement in Care',
          content: 'Participate in decisions about your treatment and care plan.'
        },
        {
          title: 'Safe Environment',
          content: 'Expect a safe, harassment-free, discrimination-free environment.'
        }
      ]
    },
    {
      id: 'patient-responsibilities',
      title: 'Patient Responsibilities',
      subtitle: 'To help us care for you effectively, we ask that you:',
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      items: [
        {
          title: 'Respectful Conduct',
          content: 'Treat staff, physicians, and other patients with courtesy. Zero tolerance for verbal abuse, threats, or harassment.'
        },
        {
          title: 'Accurate Information',
          content: 'Keep your demographic, health card, medication, and contact information up to date.'
        },
        {
          title: 'Collaboration',
          content: 'Follow your treatment plan. Ask questions when unclear. Inform us of changes in your health, medications, or hospital visits.'
        }
      ]
    },
    {
      id: 'appointment-policy',
      title: 'Appointment, Late & No-Show Policy',
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      items: [
        {
          title: 'Arrivals',
          content: 'Please arrive 10 minutes early to complete forms and prepare for your appointment.'
        },
        {
          title: 'Late Arrivals',
          content: 'Patients arriving more than 10 minutes late may be asked to reschedule out of fairness to others.'
        },
        {
          title: 'Cancellations',
          content: 'Contact us at least 24 hours before your appointment.'
        },
        {
          title: 'No-Shows',
          content: 'Missed appointments WILL result in fees (30 cad) and no further appointments unless PAID. Three no shows results in a warning. Four no shows results in an automatic de-rostering.'
        }
      ]
    },
    {
      id: 'prescription-policy',
      title: 'Prescription Renewal Policy',
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      items: [
        {
          content: 'Request renewals through your pharmacy (subject to change)'
        },
        {
          content: 'Allow 3–5 business days for processing.'
        },
        {
          content: 'Urgent renewals may not be guaranteed.'
        },
        {
          content: 'Walk-in renewals are not always possible.'
        }
      ]
    },
    {
      id: 'non-ohip-services',
      title: 'Non-OHIP / Uninsured Services',
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      items: [
        {
          content: 'Some services are not covered by OHIP. Common examples include:'
        },
        {
          list: [
            'Driver\'s medical forms',
            'Employment and insurance forms',
            'Sick notes',
            'Travel-related forms',
            'Third-party requests',
            'Transfer of medical records'
          ]
        },
        {
          content: 'A full fee list is available at reception and will be provided before completing any service.'
        }
      ]
    },
    {
      id: 'clinic-conduct',
      title: 'Clinic Conduct Policies',
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      items: [
        {
          title: 'Phones & Recording',
          content: 'Phones must be on silent. No recording (audio/video) anywhere inside the clinic. No speakerphone calls.'
        },
        {
          title: 'Fragrance-Free Clinic',
          content: 'Strong fragrances can trigger allergies or sensitivities. Please avoid perfumes, scented sprays, or strongly scented lotions.'
        },
        {
          title: 'Food & Cleanliness',
          content: 'No food in waiting areas. Drinks must have lids.'
        }
      ]
    },
    {
      id: 'privacy-policy',
      title: 'Privacy Policy (PHIPA)',
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      items: [
        {
          content: 'We follow all guidelines under the Personal Health Information Protection Act:'
        },
        {
          list: [
            'Your information is confidential.',
            'Records are securely stored.',
            'Information is shared only with consent or when legally required.',
            'You may request access or corrections.',
            'Concerns may be directed to the Clinic Manager.'
          ]
        }
      ]
    },
    {
      id: 'accessibility',
      title: 'Accessibility & Inclusion',
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      items: [
        {
          content: 'We welcome patients of all backgrounds and abilities.'
        },
        {
          list: [
            'Wheelchair-accessible building',
            'Service animals welcome',
            'Interpretation or communication assistance available upon request',
            'Staff trained to support diverse patient needs'
          ]
        }
      ]
    }
  ];

  const additionalSections = [
    {
      title: 'How to Prepare for Your Visit',
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      items: [
        {
          content: 'Bringing the following helps ensure smooth care:'
        },
        {
          list: [
            'Valid OHIP card',
            'List of medications or medication bottles',
            'Any recent test results',
            'A list of concerns/questions',
            'Baby immunization cards (if applicable)',
            'Interpreter if needed'
          ]
        }
      ]
    },
    {
      title: 'After-Hours Instructions',
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      items: [
        {
          content: 'If this is an emergency, call 911.'
        },
        {
          content: 'For urgent but non-emergency care, visit your nearest urgent care clinic or emergency department.'
        },
        {
          content: 'For minor, non-urgent concerns, please leave a message or use the appropriate online system (if available).'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center sm:justify-start bg-sky-900 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-sky-900/70"></div>
        </div>

        {/* Sky Blue Text Box - Responsive positioning and sizing */}
        <div className="relative z-10 w-full max-w-4xl mx-4 sm:mx-8 lg:mx-16 xl:mx-24">
          <div className="bg-sky-700/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-sky-400/40 shadow-xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 text-center sm:text-left">
              Patient Information & Clinic Policies
            </h1>
            <div className="w-12 h-0.5 bg-sky-300 rounded-full mb-3 sm:mb-4 mx-auto sm:mx-0"></div>
            <p className="text-xs sm:text-sm text-white leading-relaxed mb-4 text-center sm:text-left">
              Comprehensive, professional, and aligned with CPSO + PHIPA + OMA guidelines
            </p>
            <div className="p-3 bg-sky-600/60 rounded-lg border-l-2 border-sky-300">
              <p className="text-xs sm:text-sm text-white font-light italic text-center sm:text-left">
                "We are committed to providing compassionate, efficient, and high-quality care for every patient."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-8 sm:py-12 lg:py-16 bg-sky-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-sky-200 shadow-lg">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-sky-900 mb-4 sm:mb-6 text-center sm:text-left">
              Welcome to St. Mary Rideau Family Clinic
            </h2>
            <div className="w-12 sm:w-16 h-1 bg-sky-500 mb-4 sm:mb-6 mx-auto sm:mx-0"></div>
            <p className="text-sm sm:text-base lg:text-lg text-sky-700 leading-relaxed">
              We are committed to providing compassionate, efficient, and high-quality care for every patient.
              Below is a clear outline of your rights, responsibilities, and our clinic's operational policies 
              so you always know what to expect.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 sm:space-y-12 lg:space-y-16">
            {policySections.map((section, index) => (
              <div key={index} id={section.id} className="scroll-mt-20 sm:scroll-mt-24">
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-sky-200 shadow-lg">
                  <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="flex-shrink-0 p-2 sm:p-3 bg-sky-100 rounded-lg text-sky-600 mb-3 sm:mb-0 mx-auto sm:mx-0">
                      {section.icon}
                    </div>
                    <div className="text-center sm:text-left">
                      <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-sky-900 mb-2">
                        {section.title}
                      </h2>
                      {section.subtitle && (
                        <p className="text-sm sm:text-base lg:text-lg text-sky-700 font-medium">{section.subtitle}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4 sm:space-y-6">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="border-l-4 border-sky-200 pl-4 sm:pl-6">
                        {item.title && (
                          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-sky-800 mb-2 sm:mb-3">
                            {item.title}
                          </h3>
                        )}
                        
                        {item.content && (
                          <p className="text-sm sm:text-base text-sky-700 leading-relaxed">{item.content}</p>
                        )}
                        
                        {item.list && (
                          <ul className="space-y-1 sm:space-y-2 mt-2 sm:mt-3">
                            {item.list.map((listItem, listIndex) => (
                              <li key={listIndex} className="flex items-start">
                                <span className="text-sky-600 mr-2 sm:mr-3 mt-1">•</span>
                                <span className="text-sm sm:text-base text-sky-700">{listItem}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Additional Sections in Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {additionalSections.map((section, index) => (
                <div key={index} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-sky-200 shadow-lg">
                  <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="flex-shrink-0 p-2 sm:p-3 bg-sky-100 rounded-lg text-sky-600 mb-3 sm:mb-0 mx-auto sm:mx-0">
                      {section.icon}
                    </div>
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-sky-900 text-center sm:text-left">
                      {section.title}
                    </h2>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        {item.content && (
                          <p className="text-sm sm:text-base text-sky-700 leading-relaxed mb-2 sm:mb-3">{item.content}</p>
                        )}
                        
                        {item.list && (
                          <ul className="space-y-1 sm:space-y-2">
                            {item.list.map((listItem, listIndex) => (
                              <li key={listIndex} className="flex items-start">
                                <span className="text-sky-600 mr-2 sm:mr-3 mt-1">•</span>
                                <span className="text-sm sm:text-base text-sky-700">{listItem}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-sky-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6">
            Questions About Our Policies?
          </h3>
          <p className="text-sky-100 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
            Our team is here to help you understand our policies and ensure you have the best possible experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href="/contact"
              className="px-6 sm:px-8 py-2 sm:py-3 bg-white text-sky-600 rounded-lg hover:bg-sky-50 transition-colors duration-200 font-medium shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              Contact Us
            </a>
            
            <a
              href="/uninsured-services"
              className="px-6 sm:px-8 py-2 sm:py-3 bg-sky-700 text-white rounded-lg hover:bg-sky-600 transition-colors duration-200 font-medium text-sm sm:text-base"
            >
              View Service Fees
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}