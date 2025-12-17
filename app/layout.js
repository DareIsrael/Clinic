// import './globals.css';
// import Navbar from '@/components/Navbar';
// import { AuthProvider } from '@/contexts/AuthContext';
// import './globals.css';
// import { Poppins } from 'next/font/google';

// // Import Inter font
// const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600'], });

// export const metadata = {
//   title: 'St Mary Rideau - Your Health Partner',
//   description: 'Book appointments with healthcare professionals easily',
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={poppins.className}>
//         <AuthProvider>
//           <Navbar />
//           <main className="min-h-screen">{children}</main>
//           <footer className="bg-gray-800 text-white py-8">
//             <div className="max-w-7xl mx-auto px-4 text-center">
//               <p>&copy; 2025 St Mary Rideau. All rights reserved.</p>
//             </div>
//           </footer>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }





// import './globals.css';
// import Navbar from '@/components/Navbar';
// // import { AuthProvider } from '@/contexts/AuthContext';
// import { Poppins } from 'next/font/google';
// import SessionProvider from '@/components/SessionProvider';
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
//   <div className="max-w-7xl mx-auto px-4">
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
//       <div>
//         <h3 className="text-lg font-semibold mb-4 text-sky-300">Quick Links</h3>
//         <ul className="space-y-2">
//           <li><a href="/" className="hover:text-sky-300 transition-colors">Home</a></li>
//           <li><a href="/appointments" className="hover:text-sky-300 transition-colors">Book Appointment</a></li>
//           <li><a href="/contact" className="hover:text-sky-300 transition-colors">Contact Us</a></li>
//         </ul>
//       </div>
//       <div>
//         <h3 className="text-lg font-semibold mb-4 text-sky-300">Information</h3>
//         <ul className="space-y-2">
//           <li><a href="/uninsured-services" className="hover:text-sky-300 transition-colors">Uninsured Services & Fees</a></li>
//           <li><a href="/policies" className="hover:text-sky-300 transition-colors">Patient Information & Policies</a></li>
//           <li><a href="/privacy" className="hover:text-sky-300 transition-colors">Privacy Policy</a></li>
//         </ul>
//       </div>
//       <div>
//         <h3 className="text-lg font-semibold mb-4 text-sky-300">Contact Info</h3>
//         <ul className="space-y-2">
//           <li className="flex items-center gap-2">
//             <Phone className="w-4 h-4" />
//             <span>Phone: (XXX) XXX-XXXX</span>
//           </li>
//           <li className="flex items-center gap-2">
//             <Mail className="w-4 h-4" />
//             <span>Email: info@stmaryrideau.ca</span>
//           </li>
//           <li className="flex items-center gap-2">
//             <Calendar className="w-4 h-4" />
//             <span>Mon-Fri: 9am-5pm</span>
//           </li>
//         </ul>
//       </div>
//     </div>
//     <div className="border-t border-gray-700 pt-6 text-center">
//       <p>&copy; 2025 St Mary Rideau Family Clinic. All rights reserved.</p>
//       <p className="text-gray-400 text-sm mt-2">Committed to your health and wellbeing</p>
//     </div>
//   </div>
// </footer>
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
import { Phone, Mail, Calendar } from 'lucide-react'; // Added import

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
          <footer className="bg-gray-800 text-white py-8">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-sky-300">Quick Links</h3>
                  <ul className="space-y-2">
                    <li><a href="/" className="hover:text-sky-300 transition-colors mx-auto text-sm sm:text-base  leading-relaxed">Home</a></li>
                    
                    <li><a href="/contact" className="hover:text-sky-300 transition-colors mx-auto text-sm sm:text-base  leading-relaxed">Contact Us</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-sky-300">Information</h3>
                  <ul className="space-y-2">
                    <li><a href="/uninsured-services" className="hover:text-sky-300 transition-colors mx-auto text-sm sm:text-base  leading-relaxed">Uninsured Services & Fees</a></li>
                    <li><a href="/policies" className="hover:text-sky-300 transition-colors mx-auto text-sm sm:text-base  leading-relaxed" >Patient Information & Policies</a></li>
                    
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-sky-300">Contact Info</h3>
                  <ul className="space-y-2 mx-auto text-sm sm:text-base leading-relaxed">
                    <li className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>Phone: (613) 301-8805</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>Email: contact@stmaryrideauclinic.com</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Monday - Friday: 10:00 AM - 7:00 PM</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Saturday: 10:00 AM - 3:00 PM</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-700 pt-6 text-center mx-auto text-sm sm:text-base  leading-relaxed">
                <p>&copy; 2025 St Mary Rideau Family Clinic. All rights reserved.</p>
                <p className="text-gray-400 mt-2 mx-auto text-sm sm:text-base  leading-relaxed">Committed to your health and wellbeing</p>
              </div>
            </div>
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}