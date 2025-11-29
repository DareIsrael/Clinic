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

    // Get ALL patients count
    const totalPatients = await User.countDocuments({
      role: 'patient'
    });

    // FIXED: Count users by status - this handles old users with no status
    const activeCount = await User.countDocuments({
      role: 'patient',
      $or: [
        { status: 'Active' },
        { status: null },
        { status: { $exists: false } }
      ]
    });

    const bookedCount = await User.countDocuments({
      role: 'patient',
      status: 'Booked'
    });

    const acceptedCount = await User.countDocuments({
      role: 'patient',
      status: 'Accepted'
    });

    const rejectedCount = await User.countDocuments({
      role: 'patient',
      status: 'Rejected'
    });

    // Get new patient registrations for the month
    const newPatientsThisMonth = await User.countDocuments({
      role: 'patient',
      createdAt: {
        $gte: startDate,
        $lte: endDate
      }
    });

    // NEW: Get monthly registration trends for the entire year
    const monthlyRegistrations = await User.aggregate([
      {
        $match: {
          role: 'patient',
          createdAt: {
            $gte: new Date(year, 0, 1), // Start of year
            $lte: new Date(year, 11, 31, 23, 59, 59) // End of year
          }
        }
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // NEW: Get monthly status breakdown for the entire year
    const monthlyStatusBreakdown = await User.aggregate([
      {
        $match: {
          role: 'patient',
          createdAt: {
            $gte: new Date(year, 0, 1),
            $lte: new Date(year, 11, 31, 23, 59, 59)
          }
        }
      },
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' },
            status: {
              $cond: {
                if: { $in: ['$status', ['Active', 'Booked', 'Accepted', 'Rejected']] },
                then: '$status',
                else: 'Active' // Treat null/undefined/other as Active
              }
            }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.month': 1, '_id.status': 1 }
      }
    ]);

    // Format monthly registration data for chart
    const monthlyRegistrationsData = Array(12).fill(0);
    monthlyRegistrations.forEach(item => {
      monthlyRegistrationsData[item._id - 1] = item.count;
    });

    // Format monthly status data
    const monthlyStatusData = {};
    monthlyStatusBreakdown.forEach(item => {
      const month = item._id.month;
      const status = item._id.status;
      const count = item.count;
      
      if (!monthlyStatusData[month]) {
        monthlyStatusData[month] = { Active: 0, Booked: 0, Accepted: 0, Rejected: 0 };
      }
      monthlyStatusData[month][status] = count;
    });

    // Get appointment statistics for the month
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

    // Calculate active patients (patients with appointments in the last 90 days)
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    const activePatientsCount = await Appointment.distinct('user', {
      preferredDate: {
        $gte: ninetyDaysAgo,
        $lte: new Date()
      }
    }).then(users => users.length);

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
        patients: {
          total: totalPatients,
          active: activePatientsCount,
          newThisMonth: newPatientsThisMonth,
          byStatus: {
            Active: activeCount,
            Booked: bookedCount,
            Accepted: acceptedCount,
            Rejected: rejectedCount
          }
        },
        appointments: {
          total: monthlyAppointments,
          byStatus: appointmentStatusCounts
        },
        // NEW: Monthly trends data
        trends: {
          year: year,
          monthlyRegistrations: monthlyRegistrationsData,
          monthlyStatusBreakdown: monthlyStatusData
        },
        summary: {
          totalPatients: totalPatients,
          activePatients: activePatientsCount,
          newPatients: newPatientsThisMonth,
          acceptanceRate: totalPatients > 0 ? 
            Math.round((acceptedCount / totalPatients) * 100) : 0,
          rejectionRate: totalPatients > 0 ? 
            Math.round((rejectedCount / totalPatients) * 100) : 0,
          activityRate: totalPatients > 0 ?
            Math.round((activePatientsCount / totalPatients) * 100) : 0
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