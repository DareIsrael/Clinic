'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/components/LanguageProvider';

export default function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, signOut } = useAuth();
  const { language, languages, setLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const bookingRef = useRef(null);
  const isAdmin = pathname.startsWith('/admin');

  useEffect(() => {
    const close = (event) => {
      if (bookingRef.current && !bookingRef.current.contains(event.target)) setBookingOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const closeMenu = () => { setMenuOpen(false); setBookingOpen(false); };
  const active = (href) => pathname === href ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-gray-700 hover:bg-sky-50 hover:text-sky-700';
  const bookingItems = <>
    <Link href="https://ocean.cognisantmd.com/online-booking/7b15e604-ee55-4d68-909f-a6b8d6039554" onClick={closeMenu} className="block rounded-lg px-3 py-2.5 hover:bg-sky-50"><span className="block text-sm font-medium text-gray-900">{t('For Rostered Patients Only')}</span><span className="block text-xs text-gray-500">{t('For existing patients')}</span></Link>
    <Link href="/book-appointment" onClick={closeMenu} className="block rounded-lg px-3 py-2.5 hover:bg-green-50"><span className="block text-sm font-medium text-gray-900">{t('Walk-In Care')}</span><span className="block text-xs text-gray-500">{t('For walk-in patients')}</span></Link>
  </>;
  const languageFlags = { en: '🇨🇦', fr: '🇫🇷', de: '🇩🇪', es: '🇪🇸' };
  const languageOptions = Object.entries(languages).map(([code, label]) => <option key={code} value={code}>{languageFlags[code]} {label}</option>);
  const languageSelect = <select value={language} onChange={(event) => setLanguage(event.target.value)} className="max-w-28 bg-transparent font-medium outline-none" aria-label={t('Language')}>{languageOptions}</select>;

  return <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm" aria-label="Primary navigation">
    {!isAdmin && <div className="hidden border-b border-sky-100 bg-sky-50 lg:block"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs text-slate-600 sm:px-6 lg:px-8"><address className="not-italic">158 Rideau Street, Ottawa, K1N 5X6</address><div className="flex items-center gap-4 whitespace-nowrap"><a className="font-semibold text-sky-800 hover:text-sky-950" href="tel:+13438873470">(343) 887-3470</a><span>{t('Call for appointments')}</span></div></div></div>}
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex min-h-16 items-center justify-between gap-3 py-2 md:hidden">
        <Link href="/" onClick={closeMenu} className="shrink-0" aria-label="St Mary Rideau Clinic home"><Image src="/St.MaryLOGO2.svg" alt="St Mary Rideau Clinic Logo" width={150} height={50} priority className="h-auto w-28" /></Link>
        {!isAdmin && <div className="min-w-0 text-right text-[11px] leading-tight text-slate-600"><address className="truncate not-italic">158 Rideau Street, Ottawa</address><a href="tel:+13438873470" className="mt-1 inline-block font-semibold text-sky-800">(343) 887-3470</a></div>}
      </div>
      <div className="flex min-h-12 items-center justify-between border-t border-gray-100 py-2 md:hidden">
        {!isAdmin ? <div className="flex items-center gap-2"><label className="rounded-lg border-2 border-sky-500 bg-sky-50 px-2.5 py-1.5 text-xs font-semibold text-sky-800 shadow-sm"><span className="sr-only">{t('Language')}</span>{languageSelect}</label><button type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={t('Menu')} className="inline-flex items-center rounded-lg border border-sky-200 bg-white p-2 text-sky-800 shadow-sm hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-500"><span className="text-lg leading-none" aria-hidden="true">{menuOpen ? '×' : '☰'}</span></button></div> : <button type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={t('Menu')} className="rounded-lg border border-sky-200 px-3 py-2 text-sky-800"><span className="text-lg leading-none" aria-hidden="true">{menuOpen ? '×' : '☰'}</span></button>}
      </div>
      <div className="hidden min-h-16 items-center justify-between gap-3 py-2 md:flex">
      <Link href="/" onClick={closeMenu} className="shrink-0" aria-label="St Mary Rideau Clinic home"><Image src="/St.MaryLOGO2.svg" alt="St Mary Rideau Clinic Logo" width={150} height={50} priority className="h-auto w-28 sm:w-36" /></Link>
      <div className="hidden min-w-0 flex-1 items-center justify-end gap-1 md:flex xl:gap-2">
        {!isAdmin && <label className="mr-1 flex items-center gap-1 rounded-lg border border-gray-200 px-2 py-1.5 text-xs text-gray-600"><span className="sr-only">{t('Language')}</span><span aria-hidden="true">🌐</span>{languageSelect}</label>}
        <Link href="/" className={`rounded-lg px-2.5 py-2 text-sm ${active('/')}`}>{t('Home')}</Link><Link href="/about" className={`rounded-lg px-2.5 py-2 text-sm ${active('/about')}`}>{t('About')}</Link><Link href="/contact" className={`rounded-lg px-2.5 py-2 text-sm ${active('/contact')}`}>{t('Contact')}</Link>
        {!isAdmin && <div ref={bookingRef} className="relative"><button type="button" onClick={() => setBookingOpen((open) => !open)} aria-expanded={bookingOpen} className="flex items-center gap-1 rounded-lg bg-sky-700 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-800">{t('Book Now')} <span aria-hidden="true">⌄</span></button>{bookingOpen && <div className="absolute right-0 mt-2 w-64 rounded-xl border border-gray-200 bg-white p-2 shadow-xl">{bookingItems}</div>}</div>}
        {isAuthenticated ? <>{(user?.role === 'admin' || user?.role === 'doctor') && <Link href="/admin" className={`rounded-lg px-2.5 py-2 text-sm ${active('/admin')}`}>{user.role === 'doctor' ? 'Doctor' : 'Admin'}</Link>}<button type="button" onClick={signOut} className="rounded-lg px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-50">{t('Sign out')}</button></> : !isAdmin && <Link href="/waitlist" className="rounded-lg bg-sky-700 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-800">{t('Join Waitlist')}</Link>}
      </div>
    </div>
      </div>
    {menuOpen && <div className="border-t border-gray-100 py-3 md:hidden"><div className="grid gap-1"><Link href="/" className={`rounded-lg px-3 py-2.5 text-sm ${active('/')}`} onClick={closeMenu}>{t('Home')}</Link><Link href="/about" className={`rounded-lg px-3 py-2.5 text-sm ${active('/about')}`} onClick={closeMenu}>{t('About')}</Link><Link href="/contact" className={`rounded-lg px-3 py-2.5 text-sm ${active('/contact')}`} onClick={closeMenu}>{t('Contact')}</Link>{!isAdmin && <><p className="mt-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-500">{t('Online Booking')}</p>{bookingItems}</>}{isAuthenticated ? <>{(user?.role === 'admin' || user?.role === 'doctor') && <Link href="/admin" className="rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-sky-50" onClick={closeMenu}>{user.role === 'doctor' ? 'Doctor' : 'Admin'}</Link>}<button type="button" onClick={() => { signOut(); closeMenu(); }} className="rounded-lg px-3 py-2.5 text-left text-sm text-gray-700 hover:bg-sky-50">{t('Sign out')}</button></> : !isAdmin && <Link href="/waitlist" className="mt-2 rounded-lg bg-sky-700 px-3 py-2.5 text-center text-sm font-semibold text-white" onClick={closeMenu}>{t('Join Waitlist')}</Link>}</div></div>}
  </nav>;
}
