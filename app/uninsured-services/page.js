export const metadata = {
  title: 'Uninsured Services & Fees | St Mary Rideau Family Clinic',
  description: 'Information about services not covered by OHIP and associated fees',
};

export default function UninsuredServicesPage() {
  const whySection = {
    title: 'Why some services are not covered by OHIP',
    content: `At St Mary Rideau Family Clinic, most of the care you receive is covered by the Ontario Health Insurance Plan (OHIP). However, OHIP does not pay for certain services, forms, notes, and reports - especially when they are requested by employers, schools, insurers, or other third parties. In those cases, the cost is the responsibility of the patient or the third party requesting the service. Our fees for uninsured services follow the Ontario Medical Association (OMA) recommended fee guide.`,
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  };

  const services = [
    {
      category: 'Medical Notes & Certificates',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      items: [
        { service: 'Sick note / Return-to-work or school note', fee: '$40' },
        { service: 'Certificate of freedom from communicable disease (e.g., clearance to return to work/school after an infection)', fee: '$40' },
        { service: 'Fitness-to-work note (more detailed)', fee: 'From $50.00' },
      ]
    },
    {
      category: 'Forms & Reports',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
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
      ]
    },
    {
      category: 'Exams and Third-Party Evaluations',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      items: [
        { service: 'Practice admission interview (patient interviewing a physician about joining the practice)', fee: '$150' },
        { service: 'Pre-adoption exam &amp; evaluation (Children’s Aid Society – CAS)', fee: '$246' },
        
      ]
    },
    {
      category: 'Tuberculosis (TB) Testing for Employment',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      note: 'We will let you know in advance if your TB test is considered an insured or uninsured service.',
      description: 'Some TB tests are insured by OHIP when medically necessary. However, when a TB skin test is requested solely for employment purposes, it is not covered by OHIP.',
      items: [
        { service: 'TB skin test + employment form - One step TB Test', fee: '$45' },
        { service: 'TB skin test + employment form - Two step TB Test', fee: '$80' },
      ]
    },
    {
      category: 'Medical Records & Documentation',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      items: [
        { service: 'Copy of your medical records', fee: '$30.00 for the first 20 pages + $0.25 per page thereafter' },
        { service: 'Physician review/summarizing of records', fee: '$45.00 per 15 minutes, after the first 15 minutes (e.g., for complex third-party requests, summaries, or legal reports.)' },
        { service: 'Courier / shipping costs', fee: 'At cost' },
      ]
    }
  ];

  const additionalSections = [
    {
      title: 'Missed Appointments',
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      content: `OHIP does not pay for missed or late appointments. Our clinic will charge a missed appointment fee for appointments that are not cancelled with sufficient notice i.e same day cancellation or no show. This helps us manage physician time and offer appointments to other patients in need. Details of our missed appointment policy and fees will be clearly posted in the clinic and communicated when you book.`
    },
    {
      title: 'Travel Medicine & Other Uninsured Clinical Services',
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z" />
        </svg>
      ),
      content: `Some clinical visits are uninsured because of the reason for the visit, such as: Travel health consultations, Non-insured vaccines, Certain employment-related assessments. We will always: Inform you in advance if a visit or service is uninsured, Explain the fee, Offer you the choice to proceed or decline.`
    },
    {
      title: 'Questions About Fees?',
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      content: `If you're unsure whether something is covered by OHIP or subject to an uninsured fee, please ask our team. We're happy to explain what is insured, what isn't, and how the fees are calculated.`
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
            backgroundImage: 'url("https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-sky-900/70"></div>
        </div>

        {/* Sky Blue Text Box - Responsive positioning and sizing */}
        <div className="relative z-10 w-full max-w-4xl mx-4 sm:mx-8 lg:mx-16 xl:mx-24">
          <div className="bg-sky-700/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-sky-400/40 shadow-xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 text-center sm:text-left">
              Uninsured Services & Fees
            </h1>
            <div className="w-12 h-0.5 bg-sky-300 rounded-full mb-3 sm:mb-4 mx-auto sm:mx-0"></div>
            <p className="text-xs sm:text-sm text-white leading-relaxed mb-4 text-center sm:text-left">
              Information about services not covered by OHIP and associated fees at St Mary Rideau Family Clinic
            </p>
            <div className="p-3 bg-sky-600/60 rounded-lg border-l-2 border-sky-300">
              <p className="text-xs sm:text-sm text-white font-light italic text-center sm:text-left">
                "Transparent pricing for non-OHIP services following OMA guidelines"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-sky-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-sky-200 shadow-lg">
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex-shrink-0 p-2 sm:p-3 bg-sky-100 rounded-lg text-sky-600 mb-3 sm:mb-0 mx-auto sm:mx-0">
                {whySection.icon}
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-sky-900 mb-3 sm:mb-4">
                  {whySection.title}
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-sky-700 leading-relaxed">
                  {whySection.content}
                </p>
              </div>
            </div>
            
            <div className="mt-4 sm:mt-6 lg:mt-8 p-3 sm:p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-xs sm:text-sm text-yellow-800 font-medium">
                Note: Fees are based on the OMA 2025 recommendations and may change if the OMA updates its guide. We will always inform you of any fee before proceeding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services & Fees */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-sky-900 mb-3 sm:mb-4">
              Common Uninsured Services & Fees
            </h2>
            <div className="w-12 sm:w-16 h-1 bg-sky-500 mx-auto mb-4 sm:mb-6"></div>
            <p className="text-sm sm:text-base text-sky-700 max-w-2xl mx-auto">
              Below are some of the most common uninsured services we provide
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            {services.map((category, index) => (
              <div key={index} className="bg-sky-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-sky-200">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="flex-shrink-0 p-2 sm:p-3 bg-sky-100 rounded-lg text-sky-600">
                    {category.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-sky-900 text-center sm:text-left">
                    {category.category}
                  </h3>
                </div>
                
                {category.description && (
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs sm:text-sm text-blue-700">{category.description}</p>
                  </div>
                )}
                
                <div className="overflow-x-auto -mx-2 sm:mx-0">
                  <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-sky-100">
                        <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 text-left font-medium text-sky-700 uppercase tracking-wider">
                          Service
                        </th>
                        <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 text-left font-medium text-sky-700 uppercase tracking-wider">
                          Fee
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {category.items.map((item, itemIndex) => (
                        <tr key={itemIndex} className={`${itemIndex % 2 === 0 ? 'bg-white' : 'bg-sky-50/50'} hover:bg-sky-100/50`}>
                          <td className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 text-sky-900 text-xs sm:text-sm">
                            {item.service}
                          </td>
                          <td className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4">
                            <span className="inline-flex items-center px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-sky-100 text-sky-700 border border-sky-200">
                              {item.fee}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {category.note && (
                  <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-sky-100 rounded-lg border border-sky-300">
                    <p className="text-xs sm:text-sm text-sky-700 italic">{category.note}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Sections */}
      <section className="py-8 sm:py-12 lg:py-16 bg-sky-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 sm:space-y-8">
            {additionalSections.map((section, index) => (
              <div key={index} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-sky-200 shadow-lg">
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="flex-shrink-0 p-2 sm:p-3 bg-sky-100 rounded-lg text-sky-600 mb-3 sm:mb-0 mx-auto sm:mx-0">
                    {section.icon}
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-sky-900 mb-3 sm:mb-4">
                      {section.title}
                    </h3>
                    <p className="text-sm sm:text-base text-sky-700 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-sky-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6">
            Need Clarification About Fees?
          </h3>
          <p className="text-sky-100 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
            We're happy to explain what is insured, what isn't, and how the fees are calculated.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href="/contact"
              className="px-6 sm:px-8 py-2 sm:py-3 bg-white text-sky-600 rounded-lg hover:bg-sky-50 transition-colors duration-200 font-medium shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              Contact Us
            </a>
            
          </div>
        </div>
      </section>
    </div>
  );
}