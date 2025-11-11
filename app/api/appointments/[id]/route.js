// import { protectRoute, requireAdmin } from '@/utils/auth';
// import Appointment from '@/models/Appointment';

// export async function DELETE(req, { params }) {
//   try {
//     const user = await protectRoute(req);
//     const { id } = params;

//     const appointment = await Appointment.findById(id);
    
//     if (!appointment) {
//       return Response.json(
//         { success: false, message: 'Appointment not found' },
//         { status: 404 }
//       );
//     }

//     // Check if user owns the appointment or is admin
//     if (appointment.user.toString() !== user._id.toString() && user.role !== 'admin') {
//       return Response.json(
//         { success: false, message: 'Not authorized to cancel this appointment' },
//         { status: 403 }
//       );
//     }

//     await Appointment.findByIdAndUpdate(id, { status: 'cancelled' });

//     return Response.json({
//       success: true,
//       message: 'Appointment cancelled successfully'
//     });

//   } catch (error) {
//     console.error('Error cancelling appointment:', error);
//     return Response.json(
//       { success: false, message: 'Server error' },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(req, { params }) {
//   try {
//     const user = await requireAdmin(req);
//     const { id } = params;
//     const body = await req.json();

//     const appointment = await Appointment.findByIdAndUpdate(
//       id,
//       { status: body.status },
//       { new: true }
//     ).populate('user', 'firstName lastName email');

//     if (!appointment) {
//       return Response.json(
//         { success: false, message: 'Appointment not found' },
//         { status: 404 }
//       );
//     }

//     return Response.json({
//       success: true,
//       appointment
//     });

//   } catch (error) {
//     console.error('Error updating appointment:', error);
//     return Response.json(
//       { success: false, message: 'Server error' },
//       { status: 500 }
//     );
//   }
// }



import { protectRoute, requireAdmin } from '@/utils/auth';
import Appointment from '@/models/Appointment';
import dbConnect from '@/utils/db';
import { NextResponse } from 'next/server';

// App Router syntax - params is passed as an object
export async function DELETE(req, { params }) {
  try {
    const user = await protectRoute(req);
    await dbConnect();
    
    // Correct way to get params in App Router
    const { id } = await params; // ✅ Add 'await'
    
    console.log('Deleting appointment ID:', id); // Debug log

    const appointment = await Appointment.findById(id);
    
    if (!appointment) {
      return NextResponse.json(
        { success: false, message: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Check if user owns the appointment or is admin
    if (appointment.user.toString() !== user._id.toString() && user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Not authorized to cancel this appointment' },
        { status: 403 }
      );
    }

    await Appointment.findByIdAndUpdate(id, { status: 'cancelled' });

    return NextResponse.json({
      success: true,
      message: 'Appointment cancelled successfully'
    });

  } catch (error) {
    console.error('Error cancelling appointment:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const user = await requireAdmin(req);
    await dbConnect();
    
    // Correct way to get params in App Router
    const { id } = await params; // ✅ Add 'await'
    
    console.log('Updating appointment ID:', id); // Debug log

    const body = await req.json();

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true }
    ).populate('user', 'firstName lastName email');

    if (!appointment) {
      return NextResponse.json(
        { success: false, message: 'Appointment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      appointment
    });

  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}