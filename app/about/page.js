import Image from 'next/image';

export default function AboutPage() {
  const credentials = [
    { 
      title: 'Medical Degree', 
      value: 'MD - Doctor of Medicine',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v6l9-5-9-5-9 5 9 5z" />
        </svg>
      )
    },
    { 
      title: 'Canadian Certification', 
      value: 'CCFP - Canadian College of Family Physicians',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    { 
      title: 'UK Certification', 
      value: 'MRCGP - Member of Royal College of General Practitioners',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    { 
      title: 'Clinical Experience', 
      value: '15+ Years in Family Medicine',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      title: 'Patient-Centered Care',
      description: 'Every treatment plan is tailored to your unique health needs and lifestyle'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      title: 'Continuity of Care',
      description: 'Build a long-term relationship with your dedicated family physician'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: 'Evidence-Based Medicine',
      description: 'Treatment decisions based on the latest medical research and guidelines'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'Compassionate Approach',
      description: 'Healthcare delivered with empathy, respect, and understanding'
    }
  ];

  const practiceFeatures = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Same-Day Appointments',
      description: 'Urgent care needs addressed promptly'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      title: 'OHIP Billed Services',
      description: 'Most medical services covered by Ontario Health Insurance'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Comprehensive Care',
      description: 'Full-spectrum family medicine for all ages'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ),
      title: 'Welcoming Environment',
      description: 'Comfortable clinic designed for patient relaxation'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[60vh] flex items-center justify-start bg-sky-900 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-sky-900/70"></div>
        </div>

        {/* Sky Blue Text Box */}
        <div className="relative z-10 max-w-md mx-4 lg:mx-16 xl:mx-24 bg-sky-700/90 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-sky-400/40 shadow-xl">
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            About St Mary Rideau Family Clinic
          </h1>
          <div className="w-12 h-0.5 bg-sky-300 rounded-full mb-4"></div>
          <p className="text-lg text-sky-50 font-medium mb-2">
            Dr. Oluwaseun FAGBOLAGUN
          </p>
          <p className="text-sm text-sky-200/90 mb-4">
            MD CCFP MRCGP • Family Physician
          </p>
          <p className="text-sm text-white leading-relaxed mb-4">
            Providing compassionate, comprehensive family medicine to the Ottawa community with personalized care from an experienced physician.
          </p>
          <div className="p-3 bg-sky-600/60 rounded-lg border-l-2 border-sky-300">
            <p className="text-sm text-white font-light italic">
              "Building healthier families through dedicated, personalized medical care."
            </p>
          </div>
        </div>
      </section>

      {/* Physician Profile */}
      <section className="py-16 bg-sky-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Physician Information */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-sky-900 mb-6">Meet Your Family Physician</h2>
              <div className="w-16 h-1 bg-sky-500 mb-6"></div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-sky-900 mb-4">Dr. Oluwaseun FAGBOLAGUN</h3>
                <p className="text-lg text-sky-600 font-medium mb-6">Family Physician</p>
                <p className="text-sky-700 text-sm sm:text-base md:text-lg leading-relaxed mb-6">
                  Dr. Fagbolagun brings over 15 years of experience in family medicine, certified by both Canadian 
                  and UK medical boards. With a commitment to excellence and a compassionate approach to patient care, 
                  Dr. Fagbolagun provides comprehensive medical services for patients of all ages.
                </p>
                <p className="text-sky-700 text-sm sm:text-base md:text-lg leading-relaxed">
                  Fluent in multiple languages and dedicated to ongoing medical education, Dr. Fagbolagun stays 
                  current with the latest advancements in family medicine to provide the highest standard of care 
                  to the Ottawa community.
                </p>
              </div>

              {/* Credentials */}
              <div className="space-y-4 text-sm sm:text-base md:text-lg leading-relaxed">
                {credentials.map((credential, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
                      {credential.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sky-900 text-sm uppercase tracking-wide">{credential.title}</h4>
                      <p className="text-sky-700">{credential.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Practice Philosophy */}
            <div className="bg-white rounded-2xl p-8 border border-sky-200 shadow-lg">
              <h3 className="text-2xl font-bold text-sky-900 mb-6">Our Practice Philosophy</h3>
              <div className="space-y-6">
                {values.map((value, index) => (
                  <div key={index} className="flex items-start space-x-4 ">
                    <div className="flex-shrink-0 w-12 h-12 bg-sky-50 rounded-lg flex items-center justify-center  text-sky-600 border border-sky-200">
                      {value.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-sky-900 mb-2">{value.title}</h4>
                      <p className="text-sky-700 text-sm sm:text-base md:text-lg leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Features */}
      <section className="py-16 bg-sky-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-sky-900 mb-4">Our Practice Features</h2>
            <div className="w-16 h-1 bg-sky-500 mx-auto mb-6"></div>
            <p className="text-sky-700 max-w-2xl mx-auto">
              Designed with your comfort and convenience in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {practiceFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200 border border-sky-100">
                <div className="text-sky-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-sky-900 mb-2">{feature.title}</h3>
                <p className="text-sky-700 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-sky-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-sky-900 mb-6">Our Mission</h2>
              <div className="w-16 h-1 bg-sky-500 mb-6"></div>
              <p className="text-sky-700 text-sm sm:text-base md:text-lg leading-relaxed mb-6">
                To provide exceptional, patient-centered family medicine that enhances the health and well-being 
                of individuals and families in our community. We are committed to delivering accessible, 
                comprehensive healthcare with compassion, respect, and clinical excellence.
              </p>
              <div className="bg-sky-100 rounded-lg p-6 border border-sky-200">
                <h3 className="font-semibold text-sky-800 mb-3">Our Commitment</h3>
                <ul className="space-y-2 text-sky-700 text-sm sm:text-base md:text-lg leading-relaxed">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Personalized care for every patient
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Evidence-based medical practice
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Continuity of care through long-term relationships
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-sky-900 mb-6">Our Vision</h2>
              <div className="w-16 h-1 bg-sky-500 mb-6"></div>
              <p className="text-sky-700 text-sm sm:text-base md:text-lg leading-relaxed mb-6">
                To be the trusted family medicine practice of choice in Ottawa, recognized for clinical excellence, 
                compassionate care, and meaningful patient relationships. We envision a community where every family 
                has access to comprehensive healthcare that supports their lifelong wellness journey.
              </p>
              <div className="border-l-4 border-sky-500 pl-6">
                <p className="text-lg italic text-sky-800 text-sm sm:text-base md:text-lg leading-relaxed">
                  "Building healthier families through dedicated, personalized medical care."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}