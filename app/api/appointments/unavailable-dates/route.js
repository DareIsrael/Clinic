// import { NextResponse } from 'next/server';
// import { appointmentService } from '@/services/appointmentService';
// import dbConnect from '@/utils/db';

// export async function GET() {
//   try {
//     await dbConnect();
    
//     const unavailableDates = await appointmentService.getUnavailableDates();
    
//     return NextResponse.json({
//       success: true,
//       unavailableDates
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }