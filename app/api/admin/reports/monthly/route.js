import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import User from '@/models/User';
import Appointment from '@/models/Appointment';
import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';

export async function GET(request) {
  try {
    console.log('Monthly reports API called');
    
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

    console.log('Fetching reports for:', { year, month });

    // Calculate date range for the month
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

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
    const statusCounts = { Active: 0, Booked: 0, Accepted: 0, Rejected: 0 };
    usersByStatus.forEach(item => {
      statusCounts[item._id || 'Active'] = item.count;
    });

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
        usersByStatus: statusCounts,
        summary: {
          totalPatients: newPatients,
          acceptanceRate: newPatients > 0 ? 
            Math.round((statusCounts.Accepted / newPatients) * 100) : 0,
          rejectionRate: newPatients > 0 ? 
            Math.round((statusCounts.Rejected / newPatients) * 100) : 0
        }
      }
    });

  } catch (error) {
    console.error('Monthly reports error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to generate monthly reports' },
      { status: 500 }
    );
  }
}