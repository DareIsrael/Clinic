'use client';
import Link from 'next/link';
import { Phone, Mail, Calendar, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xl font-bold text-white">{t('about_title')}</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {t('about_subtitle')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-sky-400 relative inline-block">
              {t('quick_contact')}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-500 rounded-full mt-1"></div>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-sky-400 transition-colors text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-sky-400 rounded-full"></span>
                  {t('nav_home')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-sky-400 transition-colors text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-sky-400 rounded-full"></span>
                  {t('nav_about')}
                </Link>
              </li>
              <li>
                <Link href="/book-appointment" className="text-gray-300 hover:text-sky-400 transition-colors text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-sky-400 rounded-full"></span>
                  {t('nav_book')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-sky-400 transition-colors text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-sky-400 rounded-full"></span>
                  {t('nav_contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-sky-400 relative inline-block">
              {t('policies_title')}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-500 rounded-full mt-1"></div>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/uninsured-services" className="text-gray-300 hover:text-sky-400 transition-colors text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-sky-400 rounded-full"></span>
                  {t('nav_uninsured')}
                </Link>
              </li>
              <li>
                <Link href="/policies" className="text-gray-300 hover:text-sky-400 transition-colors text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-sky-400 rounded-full"></span>
                  {t('nav_policy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-sky-400 relative inline-block">
              {t('contact_badge')}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-500 rounded-full mt-1"></div>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-300 text-sm">
                <Phone className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">{t('contact_call_us')}</p>
                  <a href="tel:+13438873470" className="hover:text-sky-400 transition-colors">{t('phone')}</a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-300 text-sm">
                <span className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0">📠</span>
                <div>
                  <p className="font-medium">{t('fax_label')}</p>
                  <p>{t('fax')}</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-300 text-sm">
                <Mail className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">{t('contact_email_us')}</p>
                  <a href={`mailto:${t('email')}`} className="hover:text-sky-400 transition-colors break-all">
                    {t('email')}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-300 text-sm">
                <MapPin className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">{t('our_location')}</p>
                  <p>{t('address')}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Hours Section */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-md font-semibold mb-3 text-sky-400 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {t('hours_title')}
              </h3>
              <div className="space-y-1 text-gray-300 text-sm">
                <div className="flex justify-between max-w-xs">
                  <span>{t('day_monday')} - {t('day_thursday')}:</span>
                  <span>{t('hours_mon_thu')}</span>
                </div>
                <div className="flex justify-between max-w-xs">
                  <span>{t('day_friday')}:</span>
                  <span>{t('hours_fri')}</span>
                </div>
                <div className="flex justify-between max-w-xs">
                  <span>{t('day_saturday')}:</span>
                  <span>{t('hours_sat')}</span>
                </div>
                <div className="flex justify-between max-w-xs">
                  <span>{t('day_sunday')}:</span>
                  <span className="text-red-400">{t('hours_closed')}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-md font-semibold mb-3 text-sky-400">{t('emergency_title')}</h3>
              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-3">
                <p className="text-gray-300 text-sm">
                  {t('emergency_text')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} {t('footer_rights')}
          </p>
          <p className="text-gray-500 text-xs mt-2">
            {t('footer_tagline')}
          </p>
        </div>
      </div>
    </footer>
  );
}
