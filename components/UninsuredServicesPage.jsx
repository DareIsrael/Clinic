'use client';

import React from 'react';
import { FileText, ClipboardCheck, Stethoscope, Clock, AlertCircle, DollarSign, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const UninsuredServicesPage = () => {
  const { t } = useLanguage();

  const sections = [
    {
      id: 'why-not-covered',
      title: t('uninsured_why_title'),
      icon: <AlertCircle className="w-6 h-6" />,
      content: t('uninsured_why_content'),
    },
    {
      id: 'common-services',
      title: t('uninsured_common_title'),
      icon: <DollarSign className="w-6 h-6" />,
      note: t('uninsured_oma_note'),
      subsections: [
        {
          title: t('uninsured_sub_notes'),
          icon: <FileText className="w-5 h-5" />,
          items: [
            { service: t('uninsured_s1_name'), fee: '$40' },
            { service: t('uninsured_s2_name'), fee: '$40' },
            { service: t('uninsured_s3_name'), fee: 'From $50.00' },
          ],
        },
        {
          title: t('uninsured_sub_forms'),
          icon: <ClipboardCheck className="w-5 h-5" />,
          items: [
            { service: t('uninsured_f1_name'), fee: '$40' },
            { service: t('uninsured_f2_name'), fee: '$40' },
            { service: t('uninsured_f3_name'), fee: '$50' },
            { service: t('uninsured_f4_name'), fee: '$50' },
            { service: t('uninsured_f5_name'), fee: '$75' },
            { service: t('uninsured_f6_name'), fee: '$160' },
            { service: t('uninsured_f7_name'), fee: '$50' },
            { service: t('uninsured_f8_name'), fee: '$72' },
            { service: t('uninsured_f9_name'), fee: 'From $150' },
          ],
        },
        {
          title: t('uninsured_sub_exams'),
          icon: <Stethoscope className="w-5 h-5" />,
          items: [
            { service: t('uninsured_e1_name'), fee: '$150' },
            { service: t('uninsured_e2_name'), fee: '$246' },
          ],
        },
        {
          title: t('uninsured_sub_tb'),
          icon: <CheckCircle className="w-5 h-5" />,
          description: t('uninsured_tb_desc'),
          items: [
            { service: t('uninsured_tb1_name'), fee: '$45' },
            { service: t('uninsured_tb2_name'), fee: '$80' },
          ],
          note: t('uninsured_tb_note'),
        },
        {
          title: t('uninsured_sub_records'),
          icon: <FileText className="w-5 h-5" />,
          items: [
            { service: t('uninsured_r1_name'), fee: t('uninsured_r1_fee') },
            { service: t('uninsured_r2_name'), fee: t('uninsured_r2_fee') },
            { service: t('uninsured_r3_name'), fee: t('uninsured_r3_fee') },
          ],
        },
      ],
    },
    {
      id: 'missed-appointments',
      title: t('uninsured_missed_title'),
      icon: <Clock className="w-6 h-6" />,
      content: t('uninsured_missed_desc'),
    },
    {
      id: 'travel-medicine',
      title: t('uninsured_travel_title'),
      icon: <Stethoscope className="w-6 h-6" />,
      content: t('uninsured_travel_desc'),
      list: [
        t('uninsured_tr_l1'),
        t('uninsured_tr_l2'),
        t('uninsured_tr_l3'),
      ],
    },
    {
      id: 'questions',
      title: t('uninsured_q_title'),
      icon: <AlertCircle className="w-6 h-6" />,
      content: t('uninsured_q_desc'),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-sky-50 to-blue-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-sky-900 mb-4">
              {t('uninsured_title')}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('uninsured_subtitle')}
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
                                  {t('table_service')}
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-sky-700 uppercase tracking-wider w-1/4">
                                  {t('table_fee')}
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
                          {t('uninsured_cta_title')}
                        </h3>
                        <p className="text-gray-600">
                          {t('uninsured_cta_text')}
                        </p>
                      </div>
                      <a
                        href="/contact"
                        className="px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
                      >
                        {t('contact_us')}
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
              {t('uninsured_oma_note')}
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-6 py-3 bg-white text-sky-600 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
              >
                {t('contact_us')}
              </a>
              <a
                href="/appointment"
                className="px-6 py-3 bg-transparent border-2 border-white rounded-lg hover:bg-white/10 transition-colors duration-200 font-medium"
              >
                {t('nav_book')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UninsuredServicesPage;