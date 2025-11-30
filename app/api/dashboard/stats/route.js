// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import dbConnect from '@/utils/db';
// import Appointment from '@/models/Appointment';
// import User from '@/models/User';
// import { NextResponse } from 'next/server';

// export async function GET(req) {
//   try {
//     // Use NextAuth session instead of protectRoute
//     const session = await getServerSession(authOptions);
    
//     if (!session) {
//       return NextResponse.json(
//         { success: false, message: 'Authentication required' },
//         { status: 401 }
//       );
//     }

//     await dbConnect();

//     if (session.user.role === 'admin') {
//       // Admin stats
//       const [
//         totalAppointments,
//         totalUsers,
//         pendingAppointments,
//         completedAppointments,
//         cancelledAppointments,
//         upcomingAppointments,
//         newPatientsThisMonth
//       ] = await Promise.all([
//         Appointment.countDocuments(),
//         User.countDocuments({ role: 'patient' }),
//         Appointment.countDocuments({ status: 'pending' }),
//         Appointment.countDocuments({ status: 'completed' }),
//         Appointment.countDocuments({ status: 'cancelled' }),
//         Appointment.countDocuments({ 
//           preferredDate: { $gte: new Date() },
//           status: { $in: ['pending', 'confirmed'] }
//         }),
//         User.countDocuments({ 
//           role: 'patient',
//           createdAt: { 
//             $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
//           }
//         })
//       ]);

//       return NextResponse.json({
//         success: true,
//         stats: {
//           totalAppointments,
//           totalUsers,
//           pendingAppointments,
//           completedAppointments,
//           cancelledAppointments,
//           upcomingAppointments,
//           newPatientsThisMonth
//         }
//       });
//     } else {
//       // Patient stats - use session.user.id instead of user._id
//       const [
//         totalAppointments,
//         upcomingAppointments,
//         completedAppointments,
//         cancelledAppointments
//       ] = await Promise.all([
//         Appointment.countDocuments({ user: session.user.id }),
//         Appointment.countDocuments({ 
//           user: session.user.id,
//           preferredDate: { $gte: new Date() },
//           status: { $in: ['pending', 'confirmed'] }
//         }),
//         Appointment.countDocuments({ 
//           user: session.user.id,
//           status: 'completed'
//         }),
//         Appointment.countDocuments({ 
//           user: session.user.id,
//           status: 'cancelled'
//         })
//       ]);

//       return NextResponse.json({
//         success: true,
//         stats: {
//           totalAppointments,
//           upcomingAppointments,
//           completedAppointments,
//           cancelledAppointments
//         }
//       });
//     }

//   } catch (error) {
//     console.error('Dashboard stats error:', error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to fetch dashboard stats' },
//       { status: 500 }
//     );
//   }
// }

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import Waitlist from '@/models/Waitlist';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    await dbConnect();

    // Waitlist stats
    const [
      totalWaitlist,
      activeWaitlist,
      bookedWaitlist,
      acceptedWaitlist,
      rejectedWaitlist,
      newThisMonth,
      newThisWeek
    ] = await Promise.all([
      Waitlist.countDocuments(),
      Waitlist.countDocuments({ status: 'Active' }),
      Waitlist.countDocuments({ status: 'Booked' }),
      Waitlist.countDocuments({ status: 'Accepted' }),
      Waitlist.countDocuments({ status: 'Rejected' }),
      // New this month
      Waitlist.countDocuments({
        createdAt: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          $lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59)
        }
      }),
      // New this week
      Waitlist.countDocuments({
        createdAt: {
          $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
          $lte: new Date()
        }
      })
    ]);

    const stats = {
      // Waitlist counts
      totalWaitlist,
      activeWaitlist,
      bookedWaitlist,
      acceptedWaitlist,
      rejectedWaitlist,
      newPatientsThisMonth: newThisMonth,
      newThisWeek,
      
      // Calculated percentages
      acceptanceRate: totalWaitlist ? Math.round((acceptedWaitlist / totalWaitlist) * 100) : 0,
      rejectionRate: totalWaitlist ? Math.round((rejectedWaitlist / totalWaitlist) * 100) : 0,
      bookingRate: totalWaitlist ? Math.round((bookedWaitlist / totalWaitlist) * 100) : 0
    };

    return NextResponse.json({
      success: true,
      stats
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}