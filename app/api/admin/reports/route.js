import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import User from '@/models/User';
import Appointment from '@/models/Appointment';
import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';

export async function GET(request) {
  try {
    // Check authentication and admin role
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    if (session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      );
    }

    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const year = parseInt(searchParams.get('year')) || new Date().getFullYear();
    const month = parseInt(searchParams.get('month')) || new Date().getMonth() + 1;

    // Calculate date range for the month
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    console.log('Fetching reports for:', { year, month, startDate, endDate });

    // Get user registrations for the month
    const newPatients = await User.countDocuments({
      role: 'patient',
      createdAt: {
        $gte: startDate,
        $lte: endDate
      }
    });

    // Get users by status for the month
    const usersByStatus = await User.aggregate([
      {
        $match: {
          role: 'patient',
          createdAt: {
            $gte: startDate,
            $lte: endDate
          }
        }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Convert array to object for easier access
    const statusCounts = usersByStatus.reduce((acc, item) => {
      acc[item._id || 'Active'] = item.count;
      return acc;
    }, { Active: 0, Booked: 0, Accepted: 0, Rejected: 0 });

    // Get appointments for the month
    const monthlyAppointments = await Appointment.countDocuments({
      preferredDate: {
        $gte: startDate,
        $lte: endDate
      }
    });

    // Get appointments by status for the month
    const appointmentsByStatus = await Appointment.aggregate([
      {
        $match: {
          preferredDate: {
            $gte: startDate,
            $lte: endDate
          }
        }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const appointmentStatusCounts = appointmentsByStatus.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, { pending: 0, confirmed: 0, completed: 0, cancelled: 0 });

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return NextResponse.json({
      success: true,
      report: {
        period: {
          year,
          month,
          monthName: monthNames[month - 1]
        },
        newPatients,
        usersByStatus: {
          Active: statusCounts.Active || 0,
          Booked: statusCounts.Booked || 0,
          Accepted: statusCounts.Accepted || 0,
          Rejected: statusCounts.Rejected || 0
        },
        appointments: {
          total: monthlyAppointments,
          byStatus: appointmentStatusCounts
        },
        summary: {
          totalPatients: newPatients,
          acceptanceRate: newPatients > 0 ? 
            Math.round(((statusCounts.Accepted || 0) / newPatients) * 100) : 0,
          rejectionRate: newPatients > 0 ? 
            Math.round(((statusCounts.Rejected || 0) / newPatients) * 100) : 0
        }
      }
    });

  } catch (error) {
    console.error('Reports error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to generate reports' },
      { status: 500 }
    );
  }
}