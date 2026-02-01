// import { NextResponse } from 'next/server';
// import { appointmentService } from '@/services/appointmentService';
// import dbConnect from '@/utils/db';

// export async function GET() {
//   try {
//     await dbConnect();
    
//     const availableDates = await appointmentService.getAvailableDates();
//     const clinicSchedule = appointmentService.getClinicSchedule();
    
//     return NextResponse.json({
//       success: true,
//       availableDates,
//       clinicSchedule
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }