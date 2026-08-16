
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
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
// import { AuthProvider } from '@/contexts/AuthContext';
import { Poppins } from 'next/font/google';
import SessionProvider from '@/components/SessionProvider';
import AdminInactivityTracker from '@/components/AdminInactivityTracker';
import { Phone, Mail, Calendar, MapPin, Clock, Heart, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';

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
        <link rel="icon" href="/St.MaryLOGO.png" />

        {/* <!-- Google Tag Manager --> */}
<Script
  id="google-tag-manager"
  strategy="afterInteractive"
>
  {`
    (function(w,d,s,l,i){w[l]=w[l]||[];
    w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
    var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),
    dl=l!='dataLayer'?'&l='+l:'';
    j.async=true;
    j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
    f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-KSQBJ9PK');
  `}
</Script>
{/* <!-- End Google Tag Manager --> */}

      </head>
      <body className={poppins.className}>

        {/* <!-- Google Tag Manager (noscript) --> */}

<noscript>
  <iframe
    src="https://www.googletagmanager.com/ns.html?id=GTM-KSQBJ9PK"
    height="0"
    width="0"
    style={{ display: 'none', visibility: 'hidden' }}
  />
</noscript>
{/* <!-- End Google Tag Manager (noscript) --> */}

        <SessionProvider>
          <LanguageProvider>
            <AdminInactivityTracker />

            <Navbar />
            <main className="min-h-screen">{children}</main>
            
            {/* Modern Footer */}
            <Footer />
          </LanguageProvider>
        </SessionProvider>
      </body>
    </html>
  );
}