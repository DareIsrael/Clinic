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


import './globals.css';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/contexts/AuthContext';
import { Poppins } from 'next/font/google';

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
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <footer className="bg-gray-800 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p>&copy; 2025 St Mary Rideau. All rights reserved.</p>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
