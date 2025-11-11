// import Appointment from '@/models/Appointment';
// import { protectRoute } from '@/utils/auth';
// import dbConnect from '@/utils/db';

// export async function createAppointment(req) {
//   try {
//     const user = await protectRoute(req);
//     await dbConnect();
    
//     const body = await req.json();
    
//     const { serviceType, preferredDate, preferredTime, message } = body;

//     if (!serviceType || !preferredDate || !preferredTime) {
//       return Response.json(
//         { success: false, message: 'Service type, date, and time are required' },
//         { status: 400 }
//       );
//     }

//     // Check for duplicate appointment
//     const existingAppointment = await Appointment.findOne({
//       preferredDate: new Date(preferredDate),
//       preferredTime
//     });

//     if (existingAppointment) {
//       return Response.json(
//         { success: false, message: 'This time slot is already booked' },
//         { status: 400 }
//       );
//     }

//     const appointment = await Appointment.create({
//       user: user._id,
//       serviceType,
//       preferredDate: new Date(preferredDate),
//       preferredTime,
//       message
//     });

//     // Populate user data for response
//     await appointment.populate('user', 'firstName lastName email');

//     return Response.json({
//       success: true,
//       appointment
//     });

//   } catch (error) {
//     console.error('Booking error:', error);
//     if (error.message.includes('Not authorized')) {
//       return Response.json(
//         { success: false, message: 'Please log in to book an appointment' },
//         { status: 401 }
//       );
//     }
//     return Response.json(
//       { success: false, message: 'Server error during booking' },
//       { status: 500 }
//     );
//   }
// }

// export async function getUserAppointments(req) {
//   try {
//     const user = await protectRoute(req);
    
//     const appointments = await Appointment.find({ user: user._id })
//       .populate('user', 'firstName lastName email')
//       .sort({ preferredDate: 1 });

//     return Response.json({
//       success: true,
//       appointments
//     });

//   } catch (error) {
//     console.error('Get appointments error:', error);
//     return Response.json(
//       { success: false, message: 'Failed to fetch appointments' },
//       { status: 500 }
//     );
//   }
// }

// export async function getAllAppointments(req) {
//   try {
//     const user = await protectRoute(req);
    
//     if (user.role !== 'admin') {
//       return Response.json(
//         { success: false, message: 'Admin access required' },
//         { status: 403 }
//       );
//     }

//     const appointments = await Appointment.find()
//       .populate('user', 'firstName lastName email')
//       .sort({ preferredDate: 1 });

//     return Response.json({
//       success: true,
//       appointments
//     });

//   } catch (error) {
//     console.error('Get all appointments error:', error);
//     return Response.json(
//       { success: false, message: 'Failed to fetch appointments' },
//       { status: 500 }
//     );
//   }
// }



import Appointment from '@/models/Appointment';
import { protectRoute } from '@/utils/auth';
import dbConnect from '@/utils/db';
import { NextResponse } from 'next/server';

export async function createAppointment(req) {
  try {
    const user = await protectRoute(req);
    await dbConnect();
    
    const body = await req.json();
    
    const { serviceType, preferredDate, preferredTime, message } = body;

    if (!serviceType || !preferredDate || !preferredTime) {
      return NextResponse.json(
        { success: false, message: 'Service type, date, and time are required' },
        { status: 400 }
      );
    }

    // Check for duplicate appointment for this specific user
    const existingAppointment = await Appointment.findOne({
      user: user._id,
      preferredDate: new Date(preferredDate),
      preferredTime
    });

    if (existingAppointment) {
      return NextResponse.json(
        { success: false, message: 'You already have an appointment at this time' },
        { status: 400 }
      );
    }

    const appointment = await Appointment.create({
      user: user._id,
      serviceType,
      preferredDate: new Date(preferredDate),
      preferredTime,
      message: message || ''
    });

    // Populate user data for response
    await appointment.populate('user', 'firstName lastName email');

    return NextResponse.json({
      success: true,
      appointment
    });

  } catch (error) {
    console.error('Booking error:', error);
    if (error.message.includes('Not authorized')) {
      return NextResponse.json(
        { success: false, message: 'Please log in to book an appointment' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Server error during booking' },
      { status: 500 }
    );
  }
}

export async function getUserAppointments(req) {
  try {
    const user = await protectRoute(req);
    await dbConnect();
    
    const appointments = await Appointment.find({ user: user._id })
      .populate('user', 'firstName lastName email')
      .sort({ preferredDate: 1 });

    return NextResponse.json({
      success: true,
      appointments
    });

  } catch (error) {
    console.error('Get appointments error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}

export async function getAllAppointments(req) {
  try {
    const user = await protectRoute(req);
    await dbConnect();
    
    if (user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      );
    }

    const appointments = await Appointment.find()
      .populate('user', 'firstName lastName email')
      .sort({ preferredDate: 1 });

    return NextResponse.json({
      success: true,
      appointments
    });

  } catch (error) {
    console.error('Get all appointments error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}