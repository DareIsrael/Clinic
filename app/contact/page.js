'use client';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: t('contact_visit_us'),
      details: [t('about_title'), t('address')],
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: t('contact_call_us'),
      details: [`Main: ${t('phone')}`, `${t('fax_label')}: ${t('fax')}`],
      description: t('feat_sameday')
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: t('contact_email_us'),
      details: [t('email')],
      description: t('contact_respond_24h')
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t('contact_hours'),
      details: [`${t('day_monday')} - ${t('day_thursday')}: ${t('hours_mon_thu')}`, `${t('day_friday')}: ${t('hours_fri')}`, `${t('day_saturday')}: ${t('hours_sat')}`],
      description: t('contact_ext_hours')
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[50vh] flex items-center justify-start bg-sky-900 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://res.cloudinary.com/dveill0ji/image/upload/v1776832712/St.BackgroundContact_uf5vwf.jpg")',
          }}
        >
          <div className="absolute inset-0 bg-sky-900/70"></div>
        </div>

        {/* Sky Blue Text Box */}
        <div className="relative z-10 max-w-md mx-4 lg:mx-16 xl:mx-24 bg-white-700/90 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-sky-400/40 shadow-xl">
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            {t('contact_title')}
          </h1>
          <div className="w-12 h-0.5 bg-sky-300 rounded-full mb-4"></div>
          
          <p className="text-sm text-white leading-relaxed">
            {t('contact_subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          {/* Contact Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center border border-sky-100">
                <div className="text-sky-600 mb-4 flex justify-center">
                  {info.icon}
                </div>
                <h3 className="text-lg font-semibold text-sky-900 mb-4">{info.title}</h3>
                <div className="space-y-2 mb-4">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sky-700 text-sm">{detail}</p>
                  ))}
                </div>
                <p className="text-xs text-sky-600 font-medium">{info.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-sky-200">
              <h2 className="text-2xl font-bold text-sky-900 mb-2">{t('contact_title')}</h2>
              <div className="w-12 h-1 bg-sky-500 mb-6"></div>
              
              {submitStatus === 'success' && (
                <div className="bg-emerald-100 border border-emerald-400 text-emerald-700 px-4 py-3 rounded-lg mb-6">
                  {t('contact_success')}
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                  {t('contact_error')}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-sky-800 mb-2">
                    {t('contact_form_name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-700 focus:border-sky-500 transition duration-200 bg-white"
                    placeholder={t('contact_placeholder_name')}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-sky-800 mb-2">
                    {t('contact_form_email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-gray-700 transition duration-200 bg-white"
                    placeholder={t('contact_placeholder_email')}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-sky-800 mb-2">
                    {t('contact_form_subject')} *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200 bg-white text-gray-700"
                  >
                    <option value="">{t('contact_placeholder_subject')}</option>
                    <option value="appointment">{t('contact_subj_appt')}</option>
                    <option value="prescription">{t('contact_subj_rx')}</option>
                    <option value="medical-records">{t('contact_subj_records')}</option>
                    <option value="billing">{t('contact_subj_billing')}</option>
                    <option value="referral">{t('contact_subj_referral')}</option>
                    <option value="general">{t('contact_subj_general')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-sky-800 mb-2">
                    {t('contact_form_message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition text-gray-700 duration-200 resize-none bg-white"
                    placeholder={t('contact_placeholder_message')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-sky-600 text-white py-4 px-6 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-50 transition duration-300 font-semibold"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('contact_sending')}
                    </span>
                  ) : (
                    t('contact_send_btn')
                  )}
                </button>
              </form>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              {/* Google Map - Embedded */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-sky-200">
                <h3 className="text-xl font-semibold text-sky-900 mb-4">{t('our_location')}</h3>
                <div className="rounded-lg overflow-hidden">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d65330892.70839294!2d-121.6671295229436!3d1.9611855444281743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce0541295cb737%3A0x3131f3ac0865135a!2sSt%20Mary%20Rideau%20Family%20Clinic!5e0!3m2!1sen!2sng!4v1776965870377!5m2!1sen!2sng" 
                    width="100%" 
                    height="350" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="St Mary Rideau Clinic Location"
                    className="w-full"
                  ></iframe>
                </div>
                <div className="mt-4 text-center">
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=158+Rideau+St+Ottawa+ON+K1N+9J9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sky-600 hover:text-sky-700 font-medium text-sm transition-colors"
                  >
                    {t('contact_get_directions')}
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Emergency Info */}
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-semibold text-red-800 mb-2">{t('contact_med_emergency')}</h3>
                    <p className="text-red-700 text-sm mb-3">
                      {t('contact_emergency_text')}
                    </p>
                    <div className="text-lg font-bold text-red-800">{t('contact_call_911')}</div>
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-sky-100 rounded-2xl p-6 border border-sky-200">
                <h3 className="text-lg font-semibold text-sky-900 mb-3">{t('contact_quick_contact')}</h3>
                <div className="space-y-2 text-sm text-sky-700">
                  <p className="flex items-center">
                    <span className="w-6">📞</span>
                    <span><span className="font-medium">{t('contact_lbl_appointments')}</span> (343) 887-3470</span>
                  </p>
                  <p className="flex items-center">
                    <span className="w-6">📠</span>
                    <span><span className="font-medium">{t('fax_label')}:</span> (888)-615-1221</span>
                  </p>
                  <p className="flex items-center">
                    <span className="w-6">📧</span>
                    <span><span className="font-medium">Email:</span> contact@stmaryrideauclinic.com</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}