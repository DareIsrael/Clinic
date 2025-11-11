import { protectRoute } from '@/utils/auth';
import Appointment from '@/models/Appointment';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const user = await protectRoute(req);

    if (user.role === 'admin') {
      // Admin stats
      const totalAppointments = await Appointment.countDocuments();
      const totalUsers = await User.countDocuments({ role: 'patient' });
      const pendingAppointments = await Appointment.countDocuments({ status: 'pending' });
      const completedAppointments = await Appointment.countDocuments({ status: 'completed' });

      // Calculate revenue (simplified)
      // const revenueData = await Appointment.aggregate([
      //   { $match: { status: 'completed' } },
      //   {
      //     $group: {
      //       _id: null,
      //       totalRevenue: { $sum: { $cond: [
      //         { $eq: ['$serviceType', 'Dental Care'] }, 150,
      //         { $cond: [
      //           { $eq: ['$serviceType', 'Eye Care'] }, 200,
      //           { $cond: [
      //             { $eq: ['$serviceType', 'General Checkup'] }, 100,
      //             80
      //           ]}
      //         ]}
      //       ]}}
      //     }
      //   }
      // ]);

      // const revenue = revenueData[0]?.totalRevenue || 0;

      return NextResponse.json({
        success: true,
        stats: {
          totalAppointments,
          totalUsers,
          pendingAppointments,
          completedAppointments
          // revenue
        }
      });
    } else {
      // Patient stats
      const totalAppointments = await Appointment.countDocuments({ user: user._id });
      const upcomingAppointments = await Appointment.countDocuments({ 
        user: user._id,
        preferredDate: { $gte: new Date() },
        status: { $in: ['pending', 'confirmed'] }
      });
      const completedAppointments = await Appointment.countDocuments({ 
        user: user._id,
        status: 'completed'
      });
      const cancelledAppointments = await Appointment.countDocuments({ 
        user: user._id,
        status: 'cancelled'
      });

      return NextResponse.json({
        success: true,
        stats: {
          totalAppointments,
          upcomingAppointments,
          completedAppointments,
          cancelledAppointments
        }
      });
    }

  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}