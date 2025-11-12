// 'use client';
// import Link from 'next/link';
// import { useState } from 'react';
// import { usePathname } from 'next/navigation';
// import { useAuth } from '@/contexts/AuthContext';

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const pathname = usePathname();
//   const { user, isAuthenticated, logout, loading } = useAuth();

//   const handleLogout = () => {
//     logout();
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
//       <nav className="bg-white shadow-lg sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <Link href="/" className="flex-shrink-0">
//                 <h1 className="text-xl sm:text-2xl font-bold  text-sky-600">St Mary Rideau</h1>
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
//             <Link href="/" className="flex-shrink-0" onClick={closeMobileMenu}>
//               <h1 className="text-xl sm:text-2xl font-bold text-sky-600">St Mary Rideau</h1>
//             </Link>
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
//             {/* <Link 
//               href="/services" 
//               className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${isActiveLink('/services')}`}
//             >
//               Services
//             </Link> */}
//             <Link 
//               href="/contact" 
//               className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${isActiveLink('/contact')}`}
//             >
//               Contact
//             </Link>
            
//             {isAuthenticated ? (
//               <>
//                 <Link 
//                   href="/dashboard" 
//                   className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${isActiveLink('/dashboard')}`}
//                 >
//                   Dashboard
//                 </Link>
//                 {user?.role === 'admin' && (
//                   <Link 
//                     href="/admin" 
//                     className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${isActiveLink('/admin')}`}
//                   >
//                     Admin
//                   </Link>
//                 )}
//                 <Link 
//                   href="appointments-Booking" 
//                   className="bg-sky-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-sky-700 transition duration-300 ml-2"
//                 >
//                   Book Appointment
//                 </Link>
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
//                   href="/login" 
//                   className="text-gray-700 hover:text-sky-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
//                 >
//                   Login
//                 </Link>
//                 <Link 
//                   href="/signup" 
//                   className="bg-sky-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-sky-700 transition duration-300"
//                 >
//                   Sign Up
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
//               {/* <Link
//                 href="/services"
//                 className={`block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${isActiveLink('/services')}`}
//                 onClick={closeMobileMenu}
//               >
//                 Services
//               </Link> */}
//               <Link
//                 href="/contact"
//                 className={`block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${isActiveLink('/contact')}`}
//                 onClick={closeMobileMenu}
//               >
//                 Contact
//               </Link>
              
//               {isAuthenticated ? (
//                 <>
//                   <Link
//                     href="/dashboard"
//                     className={`block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${isActiveLink('/dashboard')}`}
//                     onClick={closeMobileMenu}
//                   >
//                     Dashboard
//                   </Link>
//                   {user?.role === 'admin' && (
//                     <Link
//                       href="/admin"
//                       className={`block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${isActiveLink('/admin')}`}
//                       onClick={closeMobileMenu}
//                     >
//                       Admin
//                     </Link>
//                   )}
//                   <Link
//                     href="appointments-Booking"
//                     className="block px-3 py-2 rounded-md text-base font-medium bg-sky-600 text-white hover:bg-sky-700 transition duration-300"
//                     onClick={closeMobileMenu}
//                   >
//                     Book Appointment
//                   </Link>
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
//                     href="/login"
//                     className={`block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${isActiveLink('/login')}`}
//                     onClick={closeMobileMenu}
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     href="/signup"
//                     className="block px-3 py-2 rounded-md text-base font-medium bg-sky-600 text-white hover:bg-sky-700 transition duration-300"
//                     onClick={closeMobileMenu}
//                   >
//                     Sign Up
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
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout, loading } = useAuth();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const isActiveLink = (path) => {
    return pathname === path ? 'text-sky-600 bg-sky-50' : 'text-gray-700 hover:text-sky-600 hover:bg-gray-50';
  };

  // Don't show navbar while checking auth status
  if (loading) {
    return (
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="St Mary Rideau Clinic Logo"
                  width={160}
                  height={50}
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
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center space-x-2" onClick={closeMobileMenu}>
              <Image
                src="/logo3.png"
                alt="St Mary Rideau Clinic Logo"
                width={260}
                height={150}
                className="object-contain cursor-pointer"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              href="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${isActiveLink('/')}`}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${isActiveLink('/about')}`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${isActiveLink('/contact')}`}
            >
              Contact
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  href="/dashboard" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${isActiveLink('/dashboard')}`}
                >
                  Dashboard
                </Link>
                {user?.role === 'admin' && (
                  <Link 
                    href="/admin" 
                    className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${isActiveLink('/admin')}`}
                  >
                    Admin
                  </Link>
                )}
                <Link 
                  href="appointments-Booking" 
                  className="bg-sky-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-sky-700 transition duration-300 ml-2"
                >
                  Book Appointment
                </Link>
                <div className="relative group ml-2">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-sky-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300">
                    <div className="w-8 h-8 bg-sky-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user?.firstName?.charAt(0)}
                    </div>
                    <span>▼</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      {user?.firstName} {user?.lastName}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-300"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2 ml-4">
                <Link 
                  href="/login" 
                  className="text-gray-700 hover:text-sky-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-sky-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-sky-700 transition duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-sky-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500 transition duration-300"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className={`block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${isActiveLink('/')}`}
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${isActiveLink('/about')}`}
                onClick={closeMobileMenu}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${isActiveLink('/contact')}`}
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    className={`block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${isActiveLink('/dashboard')}`}
                    onClick={closeMobileMenu}
                  >
                    Dashboard
                  </Link>
                  {user?.role === 'admin' && (
                    <Link
                      href="/admin"
                      className={`block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${isActiveLink('/admin')}`}
                      onClick={closeMobileMenu}
                    >
                      Admin
                    </Link>
                  )}
                  <Link
                    href="appointments-Booking"
                    className="block px-3 py-2 rounded-md text-base font-medium bg-sky-600 text-white hover:bg-sky-700 transition duration-300"
                    onClick={closeMobileMenu}
                  >
                    Book Appointment
                  </Link>
                  <div className="border-t border-gray-200 pt-2">
                    <div className="px-3 py-2 text-sm text-gray-500">
                      Signed in as {user?.firstName} {user?.lastName}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-sky-600 hover:bg-gray-50 transition duration-300"
                    >
                      Sign out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={`block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${isActiveLink('/login')}`}
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="block px-3 py-2 rounded-md text-base font-medium bg-sky-600 text-white hover:bg-sky-700 transition duration-300"
                    onClick={closeMobileMenu}
                  >
                    Sign Up
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
