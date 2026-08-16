'use client';

import React from 'react';
import { FileText, ClipboardCheck, Stethoscope, Clock, AlertCircle, DollarSign, CheckCircle } from 'lucide-react';

const UninsuredServicesPage = () => {
  const sections = [
    {
      id: 'why-not-covered',
      title: 'Why some services are not covered by OHIP',
      icon: <AlertCircle className="w-6 h-6" />,
      content: `At St Mary Rideau Family Clinic, most of the care you receive is covered by the Ontario Health Insurance Plan (OHIP). However, OHIP does not pay for certain services, forms, notes, and reports - especially when they are requested by employers, schools, insurers, or other third parties. In those cases, the cost is the responsibility of the patient or the third party requesting the service. Our fees for uninsured services follow the Ontario Medical Association (OMA) recommended fee guide.`,
    },
    {
      id: 'common-services',
      title: 'Common Uninsured Services & Fees',
      icon: <DollarSign className="w-6 h-6" />,
      note: 'Note: Fees are based on the OMA 2025 recommendations and may change if the OMA updates its guide. We will always inform you of any fee before proceeding.',
      subsections: [
        {
          title: 'Medical Notes & Certificates',
          icon: <FileText className="w-5 h-5" />,
          items: [
            { service: 'Sick note / Return-to-work or school note', fee: '$40' },
            { service: 'Certificate of freedom from communicable disease (e.g., clearance to return to work/school after an infection)', fee: '$40' },
            { service: 'Fitness-to-work note (more detailed)', fee: 'From $50.00' },
          ],
        },
        {
          title: 'Forms & Reports',
          icon: <ClipboardCheck className="w-5 h-5" />,
          items: [
            { service: 'School / Camp / Daycare physical form', fee: '$40' },
            { service: 'University / International student admission forms', fee: '$40' },
            { service: 'Pre-employment fitness / Fitness club forms', fee: '$50' },
            { service: 'Hospital / Nursing-home employment forms', fee: '$50' },
            { service: "Driver's medical – form only", fee: '$75' },
            { service: 'Travel insurance cancellation form', fee: '$160' },
            { service: 'Employment Insurance (EI) sickness benefits medical certificate', fee: '$50' },
            { service: 'EI compassionate care medical certificate', fee: '$72' },
            { service: 'Disability Tax Credit (T2201)', fee: 'From $150' },
          ],
        },
        {
          title: 'Exams & Third-Party Evaluations',
          icon: <Stethoscope className="w-5 h-5" />,
          items: [
            { service: 'Practice admission interview (patient interviewing a physician about joining the practice)', fee: '$150' },
            { service: 'Pre-adoption exam & evaluation (Children\'s Aid Society – CAS)', fee: '$246' },
          ],
        },
        {
          title: 'Tuberculosis (TB) Testing for Employment',
          icon: <CheckCircle className="w-5 h-5" />,
          description: 'Some TB tests are insured by OHIP when medically necessary. However, when a TB skin test is requested solely for employment purposes, it is not covered by OHIP.',
          items: [
            { service: 'TB skin test + employment form - One step TB Test', fee: '$45' },
            { service: 'TB skin test + employment form - Two step TB Test', fee: '$80' },
          ],
          note: 'We will let you know in advance if your TB test is considered an insured or uninsured service.',
        },
        {
          title: 'Medical Records & Documentation',
          icon: <FileText className="w-5 h-5" />,
          items: [
            { service: 'Copy of your medical records', fee: '$30.00 for the first 20 pages + $0.25 per page thereafter' },
            { service: 'Physician review/summarizing of records', fee: '$45.00 per 15 minutes, after the first 15 minutes (e.g., for complex third-party requests, summaries, or legal reports.)' },
            { service: 'Courier / shipping costs', fee: 'At cost' },
          ],
        },
      ],
    },
    {
      id: 'missed-appointments',
      title: 'Missed Appointments',
      icon: <Clock className="w-6 h-6" />,
      content: `OHIP does not pay for missed or late appointments. Our clinic will charge a missed appointment fee for appointments that are not cancelled with sufficient notice i.e same day cancellation or no show. This helps us manage physician time and offer appointments to other patients in need. Details of our missed appointment policy and fees will be clearly posted in the clinic and communicated when you book.`,
    },
    {
      id: 'travel-medicine',
      title: 'Travel Medicine & Other Uninsured Clinical Services',
      icon: <Stethoscope className="w-6 h-6" />,
      content: `Some clinical visits are uninsured because of the reason for the visit, such as: Travel health consultations, Non-insured vaccines, Certain employment-related assessments. We will always: Inform you in advance if a visit or service is uninsured, Explain the fee, Offer you the choice to proceed or decline.`,
      list: [
        'Travel health consultations',
        'Non-insured vaccines',
        'Certain employment-related assessments',
      ],
    },
    {
      id: 'questions',
      title: 'Questions About Fees?',
      icon: <AlertCircle className="w-6 h-6" />,
      content: `If you're unsure whether something is covered by OHIP or subject to an uninsured fee, please ask our team. We're happy to explain what is insured, what isn't, and how the fees are calculated.`,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-sky-50 to-blue-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-sky-900 mb-4">
              Uninsured Services & Fees
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Information about services not covered by OHIP and associated fees
            </p>
          </div>
          
          {/* Quick Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="px-4 py-2 bg-white text-sky-600 rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 border border-sky-100 hover:border-sky-300"
              >
                {section.title.split(' ').slice(0, 3).join(' ')}...
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-12">
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-sky-100"
            >
              {/* Section Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-sky-50 rounded-lg text-sky-600">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-sky-800 mb-2">
                    {section.title}
                  </h2>
                  {section.note && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-3">
                      <p className="text-yellow-800 text-sm italic">{section.note}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Section Content */}
              <div className="prose max-w-none">
                {section.content && (
                  <p className="text-gray-700 leading-relaxed mb-6">{section.content}</p>
                )}

                {/* List for travel medicine section */}
                {section.list && (
                  <ul className="space-y-2 mb-6">
                    {section.list.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-sky-600 mr-2">•</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Subsections (for common services) */}
                {section.subsections && (
                  <div className="space-y-8">
                    {section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex} className="border-l-4 border-sky-200 pl-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-sky-50 rounded-lg text-sky-600">
                            {subsection.icon}
                          </div>
                          <h3 className="text-xl font-semibold text-sky-700">
                            {subsection.title}
                          </h3>
                        </div>
                        
                        {subsection.description && (
                          <p className="text-gray-600 mb-4">{subsection.description}</p>
                        )}

                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                              <tr className="bg-sky-50">
                                <th className="px-4 py-3 text-left text-xs font-medium text-sky-700 uppercase tracking-wider">
                                  Service
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-sky-700 uppercase tracking-wider w-1/4">
                                  Fee
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {subsection.items.map((item, itemIndex) => (
                                <tr 
                                  key={itemIndex} 
                                  className={`hover:bg-sky-50 transition-colors duration-150 ${
                                    itemIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                  }`}
                                >
                                  <td className="px-4 py-4 text-gray-700">
                                    {item.service}
                                  </td>
                                  <td className="px-4 py-4">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-sky-100 text-sky-700">
                                      {item.fee}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {subsection.note && (
                          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-blue-700 text-sm italic">{subsection.note}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Call to action for questions section */}
                {section.id === 'questions' && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl border border-sky-200">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      <div>
                        <h3 className="text-xl font-semibold text-sky-800 mb-2">
                          Need Clarification?
                        </h3>
                        <p className="text-gray-600">
                          Contact our front desk for detailed information about specific fees
                        </p>
                      </div>
                      <a
                        href="/contact"
                        className="px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
                      >
                        Contact Us
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>

        {/* Important Notice */}
        <div className="mt-12 bg-gradient-to-r from-sky-500 to-blue-500 rounded-2xl p-8 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              Important Notice
            </h3>
            <p className="mb-6 opacity-90">
              All fees are based on the Ontario Medical Association (OMA) recommended fee guide. 
              We are committed to transparency and will always discuss fees with you before 
              proceeding with any uninsured service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-6 py-3 bg-white text-sky-600 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
              >
                Ask About Fees
              </a>
              <a
                href="/appointments"
                className="px-6 py-3 bg-transparent border-2 border-white rounded-lg hover:bg-white/10 transition-colors duration-200 font-medium"
              >
                Book Appointment
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UninsuredServicesPage;