// import { protectRoute, requireAdmin } from '@/utils/auth';
// import Appointment from '@/models/Appointment';
// import User from '@/models/User';

// export async function GET(req) {
//   try {
//     const user = await protectRoute(req);
//     const url = new URL(req.url);
//     const limit = parseInt(url.searchParams.get('limit')) || 10;
//     const page = parseInt(url.searchParams.get('page')) || 1;

//     let appointments;
//     let total;

//     if (user.role === 'admin') {
//       // Admin gets all appointments
//       appointments = await Appointment.find()
//         .populate('user', 'firstName lastName email')
//         .sort({ preferredDate: -1 })
//         .limit(limit)
//         .skip((page - 1) * limit);

//       total = await Appointment.countDocuments();
//     } else {
//       // Patient gets only their appointments
//       appointments = await Appointment.find({ user: user._id })
//         .populate('user', 'firstName lastName email')
//         .sort({ preferredDate: -1 })
//         .limit(limit)
//         .skip((page - 1) * limit);

//       total = await Appointment.countDocuments({ user: user._id });
//     }

//     return Response.json({
//       success: true,
//       appointments,
//       pagination: {
//         page,
//         limit,
//         total,
//         pages: Math.ceil(total / limit)
//       }
//     });

//   } catch (error) {
//     console.error('Dashboard appointments error:', error);
//     return Response.json(
//       { success: false, message: 'Failed to fetch appointments' },
//       { status: 500 }
//     );
//   }
// }



import { protectRoute } from '@/utils/auth';
import Appointment from '@/models/Appointment';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const user = await protectRoute(request);
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 10;
    const page = parseInt(searchParams.get('page')) || 1;

    let appointments;
    let total;

    if (user.role === 'admin') {
      // Admin gets all appointments
      appointments = await Appointment.find()
        .populate('user', 'firstName lastName email')
        .sort({ preferredDate: -1 })
        .limit(limit)
        .skip((page - 1) * limit);

      total = await Appointment.countDocuments();
    } else {
      // Patient gets only their appointments
      appointments = await Appointment.find({ user: user._id })
        .populate('user', 'firstName lastName email')
        .sort({ preferredDate: -1 })
        .limit(limit)
        .skip((page - 1) * limit);

      total = await Appointment.countDocuments({ user: user._id });
    }

    return NextResponse.json({
      success: true,
      appointments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Dashboard appointments error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}