// 'use client';
// import Link from 'next/link';
// import Image from 'next/image';
// import { useState } from 'react';
// import { usePathname } from 'next/navigation';
// import { useAuth } from '@/hooks/useAuth';

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const pathname = usePathname();
//   const { user, isAuthenticated, signOut, loading } = useAuth();

//   const handleLogout = () => {
//     signOut();
//     setIsMenuOpen(false);
//   };

//   const closeMobileMenu = () => {
//     setIsMenuOpen(false);
//   };

//   const isActiveLink = (path) => {
//     return pathname === path ? 'text-sky-600 bg-sky-50' : 'text-gray-700 hover:text-sky-600 hover:bg-gray-50';
//   };

//   // Don't show navbar while checking auth status
//   if (loading) {
//     return (
//       <nav className="bg-white shadow-lg  sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between  items-center h-16">
//             <div className="flex items-center  justify-start">
//               <Link href="/" className="flex-shrink-0">
//                 <Image
//                   src="/St.Mary.png"
//                   alt="St Mary Rideau Clinic Logo"
//                   width={160}
//                   height={50}
//                   className="object-contain"
//                 />
//               </Link>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="animate-pulse bg-gray-200 h-8 w-8 rounded-full"></div>
//             </div>
//           </div>
//         </div>
//       </nav>
//     );
//   }

//   return (
//     <nav className="bg-white shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex items-center">
//             <Link href="/" className="flex-shrink-0 flex items-center space-x-2" onClick={closeMobileMenu}>
//               <Image
//                 src="/St.Mary.png"
//                 alt="St Mary Rideau Clinic Logo"
//                 width={180}
//                 height={50}
//                 className="object-contain cursor-pointer"
//               />
//             </Link>
//           </div>

//           <div className="hidden md:flex text-sky-600 items-center space-x-1">
//             St Mary Rideau Family Clinic 158 Rideau Street Ottawa, K1N5X6 Call : (343) 887-3470
//           </div>

          

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-1">
//             <Link 
//               href="/" 
//               className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${isActiveLink('/')}`}
//             >
//               Home
//             </Link>
//             <Link 
//               href="/about" 
//               className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${isActiveLink('/about')}`}
//             >
//               About
//             </Link>
//             <Link 
//               href="/contact" 
//               className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${isActiveLink('/contact')}`}
//             >
//               Contact
//             </Link>

//             <Link
//                     href="/book-appointment"
//                     className="block px-3 py-2 rounded-md text-base font-medium bg-sky-600 text-white hover:bg-sky-700 transition duration-300"
//                     onClick={closeMobileMenu}
//                   >
//                     Walk-In Care
//               </Link>
            
//             {isAuthenticated ? (
//               <>
                
//                 {user?.role === 'admin' && (
//                   <Link 
//                     href="/admin" 
//                     className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${isActiveLink('/admin')}`}
//                   >
//                     Admin
//                   </Link>
//                 )}
                
//                 <div className="relative group ml-2">
//                   <button className="flex items-center space-x-2 text-gray-700 hover:text-sky-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300">
//                     <div className="w-8 h-8 bg-sky-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
//                       {user?.firstName?.charAt(0)}
//                     </div>
//                     <span>▼</span>
//                   </button>
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
//                     <div className="px-4 py-2 text-sm text-gray-700 border-b">
//                       {user?.firstName} {user?.lastName}
//                     </div>
//                     <button
//                       onClick={handleLogout}
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-300"
//                     >
//                       Sign out
//                     </button>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <div className="flex items-center space-x-2 ml-4">
                
//                 <Link 
//                   href="/waitlist" 
//                   className="bg-sky-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-sky-700 transition duration-300"
//                 >
//                   Join the waitlist
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-sky-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500 transition duration-300"
//             >
//               <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
//                 {isMenuOpen ? (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 ) : (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-t">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               <Link
//                 href="/"
//                 className={`block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${isActiveLink('/')}`}
//                 onClick={closeMobileMenu}
//               >
//                 Home
//               </Link>
//               <Link
//                 href="/about"
//                 className={`block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${isActiveLink('/about')}`}
//                 onClick={closeMobileMenu}
//               >
//                 About
//               </Link>
//               <Link
//                 href="/contact"
//                 className={`block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${isActiveLink('/contact')}`}
//                 onClick={closeMobileMenu}
//               >
//                 Contact
//               </Link>

//               <Link
//                     href="/book-appointment"
//                     className="block px-3 py-2 rounded-md text-base font-medium bg-sky-600 text-white hover:bg-sky-700 transition duration-300"
//                     onClick={closeMobileMenu}
//                   >
//                     WALKIN-appointment
//               </Link>
              
//               {isAuthenticated ? (
//                 <>
                  
//                   {user?.role === 'admin' && (
//                     <Link
//                       href="/admin"
//                       className={`block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${isActiveLink('/admin')}`}
//                       onClick={closeMobileMenu}
//                     >
//                       Admin
//                     </Link>
//                   )}
                  
//                   <div className="border-t border-gray-200 pt-2">
//                     <div className="px-3 py-2 text-sm text-gray-500">
//                       Signed in as {user?.firstName} {user?.lastName}
//                     </div>
//                     <button
//                       onClick={handleLogout}
//                       className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-sky-600 hover:bg-gray-50 transition duration-300"
//                     >
//                       Sign out
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <>
                  
//                   <Link
//                     href="/signup"
//                     className="block px-3 py-2 rounded-md text-base font-medium bg-sky-600 text-white hover:bg-sky-700 transition duration-300"
//                     onClick={closeMobileMenu}
//                   >
//                     Join the waitlist
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOnlineBookingDropdownOpen, setIsOnlineBookingDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, signOut, loading } = useAuth();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOnlineBookingDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    signOut();
    setIsMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setIsOnlineBookingDropdownOpen(false);
  };

  const isActiveLink = (path) => {
    return pathname === path ? 'text-sky-600 bg-sky-50 font-semibold' : 'text-gray-700 hover:text-sky-600 hover:bg-gray-50';
  };

  // Don't show navbar while checking auth status
  if (loading) {
    return (
      <nav className="bg-white shadow-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center justify-start">
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/St_Mary.png"
                  alt="St Mary Rideau Clinic Logo"
                  width={140}
                  height={45}
                  className="object-contain"
                />
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="animate-pulse bg-gray-200 h-8 w-8 rounded-full"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Header - Always visible */}
        <div className="md:hidden py-3 border-b border-gray-100">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0" onClick={closeMobileMenu}>
              <Image
                src="/St.Mary2.png"
                alt="St Mary Rideau Clinic Logo"
                width={120}
                height={40}
                className="object-contain"
                priority
              />
            </Link>
            
            {/* Mobile Contact Info */}
            <div className="text-right">
              <div className="flex items-center justify-end space-x-1 mb-1">
                <svg className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a 
                  href="tel:3438873470" 
                  className="text-xs font-semibold text-sky-700 hover:text-sky-800 transition-colors"
                >
                  (343) 887-3470
                </a>
              </div>
              <div className="text-xs text-gray-600 leading-tight">
                158 Rideau St, Ottawa
              </div>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="flex justify-between items-center h-16">
          {/* Desktop Logo */}
          <div className="hidden md:flex items-center">
            <Link href="/" className="flex-shrink-0" onClick={closeMobileMenu}>
              <Image
                src="/St.Mary2.png"
                alt="St Mary Rideau Clinic Logo"
                width={150}
                height={50}
                className="object-contain cursor-pointer hover:opacity-90 transition-opacity"
                priority
              />
            </Link>
          </div>

          {/* Clinic Information - Desktop */}
          <div className="hidden lg:flex items-center space-x-4 mx-4">
            <div className="text-center">
              <div className="flex flex-col items-start">
                <div className="flex items-center space-x-2 text-gray-800">
                  <svg className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="text-sm text-gray-900 leading-tight whitespace-nowrap">
                    158 Rideau Street, Ottawa
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-6 w-px bg-gray-200"></div>
            
            <div className="text-center">
              <div className="flex items-center space-x-2">
                <svg className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a 
                  href="tel:3438873470" 
                  className="text-sm font-semibold text-sky-700 hover:text-sky-800 transition-colors whitespace-nowrap"
                >
                  (343) 887-3470
                </a>
              </div>
              <div className="text-xs text-gray-500 mt-0.5 whitespace-nowrap">
                Call for appointments
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex  items-center space-x-1">
            <Link 
              href="/" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActiveLink('/')} whitespace-nowrap`}
            >
              Home
            </Link>


          {/* Online Booking Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOnlineBookingDropdownOpen(!isOnlineBookingDropdownOpen)}
                className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-sky-600 to-sky-700 text-white hover:from-sky-700 hover:to-sky-800 transition-all duration-200 shadow-sm hover:shadow-md flex items-center space-x-1.5 whitespace-nowrap"
              >
                <span>Book Now</span>
                <svg 
                  className={`w-3 h-3 transition-transform duration-200 ${isOnlineBookingDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              {isOnlineBookingDropdownOpen && (
                <div className="absolute right-0 mt-1 w-56 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Book Appointment</div>
                    <div className="text-xs text-gray-600 mt-0.5">Select your appointment type</div>
                  </div>
                  
                  <Link
                    href="https://ocean.cognisantmd.com/online-booking/7b15e604-ee55-4d68-909f-a6b8d6039554"
                    className="flex items-center space-x-2 px-3 py-2.5 hover:bg-gray-50 transition-all duration-200 group"
                    onClick={() => setIsOnlineBookingDropdownOpen(false)}
                  >
                    <div className="w-8 h-8 bg-sky-50 rounded-lg flex items-center justify-center group-hover:bg-sky-100 transition-colors flex-shrink-0">
                      <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 ">For Rostered Patients Only</div>
                      <div className="text-xs text-gray-500 mt-0.5 ">For existing patients</div>
                    </div>
                    <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  
                  <div className="border-t border-gray-100 my-1"></div>
                  
                  <Link
                    href="/book-appointment"
                    className="flex items-center space-x-2 px-3 py-2.5 hover:bg-gray-50 transition-all duration-200 group"
                    onClick={() => setIsOnlineBookingDropdownOpen(false)}
                  >
                    <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors flex-shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">Walk-In Care</div>
                      <div className="text-xs text-gray-500 mt-0.5 ">For walk-in patients</div>
                    </div>
                    <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>

            <Link 
              href="/about" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActiveLink('/about')} whitespace-nowrap`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActiveLink('/contact')} whitespace-nowrap`}
            >
              Contact
            </Link>

            
            
            {isAuthenticated ? (
              <>
                {user?.role === 'admin' && (
                  <Link 
                    href="/admin" 
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActiveLink('/admin')} whitespace-nowrap`}
                  >
                    Admin
                  </Link>
                )}
                
                <div className="relative group ml-1">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-sky-600 px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 hover:bg-gray-50">
                    <div className="w-7 h-7 bg-gradient-to-br from-sky-500 to-sky-600 rounded-full flex items-center justify-center text-white font-semibold text-xs shadow-sm">
                      {user?.firstName?.charAt(0)}
                    </div>
                    <svg className="w-2.5 h-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <div className="text-xs font-medium text-gray-900 truncate">{user?.firstName} {user?.lastName}</div>
                      <div className="text-xs text-gray-500 mt-0.5 truncate">{user?.email}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:text-red-600"
                    >
                      <div className="flex items-center space-x-2">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Sign out</span>
                      </div>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2 ml-2">
                <Link 
                  href="/waitlist" 
                  className="px-3 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-sky-600 to-sky-700 text-white hover:from-sky-700 hover:to-sky-800 transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
                >
                  Join Waitlist
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button - Only shows on mobile */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Contact Info - Additional for consistency */}
            <div className="hidden sm:block text-right">
              <a 
                href="tel:3438873470" 
                className="text-xs font-semibold text-sky-700 hover:text-sky-800 transition-colors whitespace-nowrap"
              >
                (343) 887-3470
              </a>
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-sky-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all duration-200"
              aria-label="Menu"
            >
              <svg className="h-5 w-5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 animate-fadeIn z-50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className={`flex items-center space-x-2 px-3 py-2.5 rounded-lg mx-1 text-sm font-medium transition-all duration-200 ${isActiveLink('/')}`}
                onClick={closeMobileMenu}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Home</span>
              </Link>
              
              <Link
                href="/about"
                className={`flex items-center space-x-2 px-3 py-2.5 rounded-lg mx-1 text-sm font-medium transition-all duration-200 ${isActiveLink('/about')}`}
                onClick={closeMobileMenu}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>About</span>
              </Link>
              
              <Link
                href="/contact"
                className={`flex items-center space-x-2 px-3 py-2.5 rounded-lg mx-1 text-sm font-medium transition-all duration-200 ${isActiveLink('/contact')}`}
                onClick={closeMobileMenu}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Contact</span>
              </Link>

              {/* Online Booking Dropdown for Mobile */}
              <div className="px-1 pt-2">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-1">Online Booking</div>
                
                <Link
                  href="https://ocean.cognisantmd.com/online-booking/7b15e604-ee55-4d68-909f-a6b8d6039554"
                  className="flex items-center space-x-2 px-3 py-2.5 rounded-lg mx-1 text-sm font-medium bg-sky-50 text-sky-700 hover:bg-sky-100 transition-all duration-200"
                  onClick={closeMobileMenu}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Registered Patients</span>
                </Link>
                
                <Link
                  href="/book-appointment"
                  className="flex items-center space-x-2 px-3 py-2.5 rounded-lg mx-1 text-sm font-medium bg-green-50 text-green-700 hover:bg-green-100 transition-all duration-200 mt-1"
                  onClick={closeMobileMenu}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Walk-In Care</span>
                </Link>
              </div>
              
              {isAuthenticated ? (
                <>
                  {user?.role === 'admin' && (
                    <Link
                      href="/admin"
                      className={`flex items-center space-x-2 px-3 py-2.5 rounded-lg mx-1 text-sm font-medium transition-all duration-200 ${isActiveLink('/admin')}`}
                      onClick={closeMobileMenu}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>Admin</span>
                    </Link>
                  )}
                  
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <div className="px-3 py-2">
                      <div className="text-xs font-medium text-gray-900 truncate">{user?.firstName} {user?.lastName}</div>
                      <div className="text-xs text-gray-500 mt-0.5 truncate">{user?.email}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full text-left px-3 py-2.5 rounded-lg mx-1 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-all duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Sign out</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/waitlist"
                    className="flex items-center space-x-2 mx-1 px-3 py-2.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-sky-600 to-sky-700 text-white hover:from-sky-700 hover:to-sky-800 transition-all duration-200 shadow-sm"
                    onClick={closeMobileMenu}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13-5.197a6 6 0 00-9 5.197" />
                    </svg>
                    <span>Join Waitlist</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}