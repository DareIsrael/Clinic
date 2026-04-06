
// import './globals.css';
// import Navbar from '@/components/Navbar';
// // import { AuthProvider } from '@/contexts/AuthContext';
// import { Poppins } from 'next/font/google';
// import SessionProvider from '@/components/SessionProvider';
// import { Phone, Mail, Calendar } from 'lucide-react'; // Added import

// // Import Poppins font
// const poppins = Poppins({
//   subsets: ['latin'],
//   weight: ['300', '400', '500', '600'],
// });

// // Metadata
// export const metadata = {
//   title: 'St Mary Rideau - Your Health Partner',
//   description: 'Book appointments with healthcare professionals easily',
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <head>
//         {/* Favicon */}
//         <link rel="icon" href="/logo1.png" />
//       </head>
//       <body className={poppins.className}>
//         <SessionProvider>
//           <Navbar />
//           <main className="min-h-screen">{children}</main>
//           <footer className="bg-gray-800 text-white py-8">
//             <div className="max-w-7xl mx-auto px-4">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
//                 <div>
//                   <h3 className="text-lg font-semibold mb-4 text-sky-300">Quick Links</h3>
//                   <ul className="space-y-2">
//                     <li><a href="/" className="hover:text-sky-300 transition-colors mx-auto text-sm sm:text-base  leading-relaxed">Home</a></li>
                    
//                     <li><a href="/contact" className="hover:text-sky-300 transition-colors mx-auto text-sm sm:text-base  leading-relaxed">Contact Us</a></li>
//                   </ul>
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold mb-4 text-sky-300">Information</h3>
//                   <ul className="space-y-2">
//                     <li><a href="/uninsured-services" className="hover:text-sky-300 transition-colors mx-auto text-sm sm:text-base  leading-relaxed">Uninsured Services & Fees</a></li>
//                     <li><a href="/policies" className="hover:text-sky-300 transition-colors mx-auto text-sm sm:text-base  leading-relaxed" >Patient Information & Policies</a></li>
                    
//                   </ul>
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold mb-4 text-sky-300">Contact Info</h3>
//                   <ul className="space-y-2 mx-auto text-sm sm:text-base leading-relaxed">
//                     <li className="flex items-center gap-2">
//                       <Phone className="w-4 h-4" />
//                       <span>Phone: (343) 887-3470</span>
//                     </li>
//                     <p className="flex items-center">
//                     <span className="w-6">📠</span>
//                     <span><span className="font-medium">Fax:</span> (888)-615-1221</span>
//                   </p>
//                     <li className="flex items-center gap-2">
//                       <Mail className="w-4 h-4" />
//                       <span>Email: contact@stmaryrideauclinic.com</span>
//                     </li>
//                     <li className="flex items-center gap-2">
//                       <Calendar className="w-4 h-4" />
//                       <span>Monday to Thursday: 10am-7pm</span>
//                     </li>
//                     <li className="flex items-center gap-2">
//                       <Calendar className="w-4 h-4" />
//                       <span>Friday: 10am-5pm</span>
//                     </li>
//                     <li className="flex items-center gap-2">
//                       <Calendar className="w-4 h-4" />
//                       <span>Saturday: 10am-3pm</span>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//               <div className="border-t border-gray-700 pt-6 text-center mx-auto text-sm sm:text-base  leading-relaxed">
//                 <p>&copy; 2026 St Mary Rideau Family Clinic. All rights reserved.</p>
//                 <p className="text-gray-400 mt-2 mx-auto text-sm sm:text-base  leading-relaxed">Committed to your health and wellbeing</p>
//               </div>
//             </div>
//           </footer>
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }



import './globals.css';
import Navbar from '@/components/Navbar';
// import { AuthProvider } from '@/contexts/AuthContext';
import { Poppins } from 'next/font/google';
import SessionProvider from '@/components/SessionProvider';
import { Phone, Mail, Calendar, MapPin, Clock, Heart, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

// Import Poppins font
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
});

// Metadata
export const metadata = {
  title: 'St Mary Rideau - Your Health Partner',
  description: 'Book appointments with healthcare professionals easily',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/logo1.png" />
      </head>
      <body className={poppins.className}>
        <SessionProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          
          {/* Modern Footer */}
          <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                
                {/* About Section */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    {/* <Heart className="w-6 h-6 text-sky-400" /> */}
                    <h3 className="text-xl font-bold text-white">St Mary Rideau Clinic</h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    Providing compassionate, comprehensive family medicine to the Ottawa community with personalized care from experienced physicians.
                  </p>
                  {/* <div className="flex gap-3">
                    <a href="#" className="bg-gray-700 hover:bg-sky-600 p-2 rounded-full transition-all duration-200">
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a href="#" className="bg-gray-700 hover:bg-sky-600 p-2 rounded-full transition-all duration-200">
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a href="#" className="bg-gray-700 hover:bg-sky-600 p-2 rounded-full transition-all duration-200">
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a href="#" className="bg-gray-700 hover:bg-sky-600 p-2 rounded-full transition-all duration-200">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div> */}
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-sky-400 relative inline-block">
                    Quick Links
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-500 rounded-full mt-1"></div>
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/" className="text-gray-300 hover:text-sky-400 transition-colors text-sm flex items-center gap-2">
                        <span className="w-1 h-1 bg-sky-400 rounded-full"></span>
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/about" className="text-gray-300 hover:text-sky-400 transition-colors text-sm flex items-center gap-2">
                        <span className="w-1 h-1 bg-sky-400 rounded-full"></span>
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/appointment" className="text-gray-300 hover:text-sky-400 transition-colors text-sm flex items-center gap-2">
                        <span className="w-1 h-1 bg-sky-400 rounded-full"></span>
                        Book Appointment
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="text-gray-300 hover:text-sky-400 transition-colors text-sm flex items-center gap-2">
                        <span className="w-1 h-1 bg-sky-400 rounded-full"></span>
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-sky-400 relative inline-block">
                    Information
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-500 rounded-full mt-1"></div>
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/uninsured-services" className="text-gray-300 hover:text-sky-400 transition-colors text-sm flex items-center gap-2">
                        <span className="w-1 h-1 bg-sky-400 rounded-full"></span>
                        Uninsured Services & Fees
                      </Link>
                    </li>
                    <li>
                      <Link href="/policies" className="text-gray-300 hover:text-sky-400 transition-colors text-sm flex items-center gap-2">
                        <span className="w-1 h-1 bg-sky-400 rounded-full"></span>
                        Patient Information & Policies
                      </Link>
                    </li>
                    
                  </ul>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-sky-400 relative inline-block">
                    Contact Info
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-500 rounded-full mt-1"></div>
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-gray-300 text-sm">
                      <Phone className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <a href="tel:+13438873470" className="hover:text-sky-400 transition-colors">(343) 887-3470</a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300 text-sm">
                      <span className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0">📠</span>
                      <div>
                        <p className="font-medium">Fax</p>
                        <p>(888) 615-1221</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300 text-sm">
                      <Mail className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Email</p>
                        <a href="mailto:contact@stmaryrideauclinic.com" className="hover:text-sky-400 transition-colors break-all">
                          contact@stmaryrideauclinic.com
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300 text-sm">
                      <MapPin className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p>Ottawa, Ontario, Canada</p>
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
                      Clinic Hours
                    </h3>
                    <div className="space-y-1 text-gray-300 text-sm">
                      <div className="flex justify-between max-w-xs">
                        <span>Monday - Thursday:</span>
                        <span>10:00 AM - 7:00 PM</span>
                      </div>
                      <div className="flex justify-between max-w-xs">
                        <span>Friday:</span>
                        <span>10:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between max-w-xs">
                        <span>Saturday:</span>
                        <span>10:00 AM - 3:00 PM</span>
                      </div>
                      <div className="flex justify-between max-w-xs">
                        <span>Sunday:</span>
                        <span className="text-red-400">Closed</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-semibold mb-3 text-sky-400">Emergency Care</h3>
                    <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-3">
                      <p className="text-gray-300 text-sm">
                        For medical emergencies, please call <span className="font-bold text-red-400">911</span> or visit your nearest hospital emergency department immediately.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="border-t border-gray-700 pt-8 mb-8">
                <div className="max-w-md mx-auto text-center">
                  <h3 className="text-lg font-semibold mb-2 text-sky-400">Stay Updated</h3>
                  <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for health tips and clinic updates</p>
                  <form className="flex gap-2">
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-sky-500 text-sm"
                    />
                    <button 
                      type="submit" 
                      className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-lg font-semibold transition-all duration-200 text-sm"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>

              {/* Copyright */}
              <div className="border-t border-gray-700 pt-6 text-center">
                <p className="text-gray-400 text-sm">
                  &copy; {new Date().getFullYear()} St Mary Rideau Family Clinic. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs mt-2">
                  Committed to your health and wellbeing
                </p>
              </div>
            </div>
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}