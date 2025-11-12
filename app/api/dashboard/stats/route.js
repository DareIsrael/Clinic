import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/utils/db';
import Appointment from '@/models/Appointment';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    // Use NextAuth session instead of protectRoute
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    await dbConnect();

    if (session.user.role === 'admin') {
      // Admin stats
      const [
        totalAppointments,
        totalUsers,
        pendingAppointments,
        completedAppointments,
        cancelledAppointments,
        upcomingAppointments,
        newPatientsThisMonth
      ] = await Promise.all([
        Appointment.countDocuments(),
        User.countDocuments({ role: 'patient' }),
        Appointment.countDocuments({ status: 'pending' }),
        Appointment.countDocuments({ status: 'completed' }),
        Appointment.countDocuments({ status: 'cancelled' }),
        Appointment.countDocuments({ 
          preferredDate: { $gte: new Date() },
          status: { $in: ['pending', 'confirmed'] }
        }),
        User.countDocuments({ 
          role: 'patient',
          createdAt: { 
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        })
      ]);

      return NextResponse.json({
        success: true,
        stats: {
          totalAppointments,
          totalUsers,
          pendingAppointments,
          completedAppointments,
          cancelledAppointments,
          upcomingAppointments,
          newPatientsThisMonth
        }
      });
    } else {
      // Patient stats - use session.user.id instead of user._id
      const [
        totalAppointments,
        upcomingAppointments,
        completedAppointments,
        cancelledAppointments
      ] = await Promise.all([
        Appointment.countDocuments({ user: session.user.id }),
        Appointment.countDocuments({ 
          user: session.user.id,
          preferredDate: { $gte: new Date() },
          status: { $in: ['pending', 'confirmed'] }
        }),
        Appointment.countDocuments({ 
          user: session.user.id,
          status: 'completed'
        }),
        Appointment.countDocuments({ 
          user: session.user.id,
          status: 'cancelled'
        })
      ]);

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