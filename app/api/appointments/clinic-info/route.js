// import { NextResponse } from 'next/server';
// import { appointmentService } from '@/services/appointmentService';
// import dbConnect from '@/utils/db';

// export async function GET() {
//   try {
//     await dbConnect();
    
//     const clinicSchedule = appointmentService.getClinicSchedule();
    
//     // Get available dates (next 7 days as example)
//     const availableDates = [];
//     const today = new Date();
    
//     for (let i = 0; i < 7; i++) {
//       const date = new Date(today);
//       date.setDate(today.getDate() + i);
//       const dateString = date.toISOString().split('T')[0];
      
//       if (appointmentService.isClinicOpen(dateString)) {
//         const slots = await appointmentService.getAvailableSlots(dateString);
//         if (slots.length > 0) {
//           availableDates.push({
//             date: dateString,
//             dayName: appointmentService.getDayName(dateString),
//             availableSlots: slots.length,
//             isToday: i === 0,
//             isTomorrow: i === 1
//           });
//         }
//       }
//     }
    
//     return NextResponse.json({
//       success: true,
//       clinicSchedule,
//       availableDates
//     });
//   } catch (error) {
//     console.error('Error in clinic-info route:', error);
//     return NextResponse.json(
//       { 
//         success: false, 
//         message: 'Failed to load clinic information',
//         clinicSchedule: [],
//         availableDates: []
//       },
//       { status: 500 }
//     );
//   }
// }