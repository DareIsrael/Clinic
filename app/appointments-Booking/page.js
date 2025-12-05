// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import BookingForm from '@/components/BookingForm';
// import { useAuth } from '@/hooks/useAuth';
// import ProtectedRoute from '@/components/ProtectedRoute';

// export default function BookPage() {
//   const { isAuthenticated, loading } = useAuth();
//   const router = useRouter();

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ProtectedRoute>
//       <div className="min-h-screen bg-gray-50 py-8">
//         <div className="max-w-4xl mx-auto px-4">
//           <BookingForm />
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }