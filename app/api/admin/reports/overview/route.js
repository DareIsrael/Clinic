// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import User from '@/models/User';
// import Appointment from '@/models/Appointment';
// import { NextResponse } from 'next/server';
// import dbConnect from '@/utils/db';

// export async function GET(request) {
//   try {
//     const session = await getServerSession(authOptions);
    
//     if (!session) {
//       return NextResponse.json(
//         { success: false, message: 'Authentication required' },
//         { status: 401 }
//       );
//     }

//     if (session.user.role !== 'admin') {
//       return NextResponse.json(
//         { success: false, message: 'Admin access required' },
//         { status: 403 }
//       );
//     }

//     await dbConnect();

//     // Get current month data
//     const now = new Date();
//     const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
//     const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

//     // Get previous month data
//     const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
//     const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

//     // Current month stats
//     const currentMonthPatients = await User.countDocuments({
//       role: 'patient',
//       createdAt: { $gte: currentMonthStart, $lte: currentMonthEnd }
//     });

//     const currentMonthAccepted = await User.countDocuments({
//       role: 'patient',
//       status: 'Accepted',
//       createdAt: { $gte: currentMonthStart, $lte: currentMonthEnd }
//     });

//     const currentMonthAppointments = await Appointment.countDocuments({
//       preferredDate: { $gte: currentMonthStart, $lte: currentMonthEnd }
//     });

//     // Previous month stats
//     const prevMonthPatients = await User.countDocuments({
//       role: 'patient',
//       createdAt: { $gte: prevMonthStart, $lte: prevMonthEnd }
//     });

//     const prevMonthAccepted = await User.countDocuments({
//       role: 'patient',
//       status: 'Accepted',
//       createdAt: { $gte: prevMonthStart, $lte: prevMonthEnd }
//     });

//     // Calculate trends
//     const patientTrend = prevMonthPatients > 0 ? 
//       Math.round(((currentMonthPatients - prevMonthPatients) / prevMonthPatients) * 100) : 
//       (currentMonthPatients > 0 ? 100 : 0);

//     const acceptanceTrend = prevMonthAccepted > 0 ? 
//       Math.round(((currentMonthAccepted - prevMonthAccepted) / prevMonthAccepted) * 100) : 
//       (currentMonthAccepted > 0 ? 100 : 0);

//     // Get yearly overview for chart
//     const yearlyData = await User.aggregate([
//       {
//         $match: {
//           role: 'patient',
//           createdAt: {
//             $gte: new Date(now.getFullYear(), 0, 1),
//             $lte: new Date(now.getFullYear(), 11, 31, 23, 59, 59)
//           }
//         }
//       },
//       {
//         $group: {
//           _id: { $month: '$createdAt' },
//           count: { $sum: 1 }
//         }
//       },
//       {
//         $sort: { '_id': 1 }
//       }
//     ]);

//     // Format yearly data for chart
//     const monthlyRegistrations = Array(12).fill(0);
//     yearlyData.forEach(item => {
//       monthlyRegistrations[item._id - 1] = item.count;
//     });

//     return NextResponse.json({
//       success: true,
//       overview: {
//         currentMonth: {
//           patients: currentMonthPatients,
//           accepted: currentMonthAccepted,
//           appointments: currentMonthAppointments,
//           acceptanceRate: currentMonthPatients > 0 ? 
//             Math.round((currentMonthAccepted / currentMonthPatients) * 100) : 0
//         },
//         trends: {
//           patients: patientTrend,
//           acceptance: acceptanceTrend
//         },
//         monthlyRegistrations,
//         currentYear: now.getFullYear()
//       }
//     });

//   } catch (error) {
//     console.error('Reports overview error:', error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to generate reports overview' },
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
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      );
    }

    await dbConnect();

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    // Current month stats - FIXED DATE RANGE
    const currentMonthStart = new Date(Date.UTC(currentYear, currentMonth - 1, 1));
    const currentMonthEnd = new Date(Date.UTC(currentYear, currentMonth, 0, 23, 59, 59));

    const currentMonthStats = await Waitlist.aggregate([
      {
        $match: {
          createdAt: { $gte: currentMonthStart, $lte: currentMonthEnd }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          byStatus: {
            $push: '$status'
          }
        }
      }
    ]);

    // Previous month stats
    const prevMonthStart = new Date(Date.UTC(currentYear, currentMonth - 2, 1));
    const prevMonthEnd = new Date(Date.UTC(currentYear, currentMonth - 1, 0, 23, 59, 59));

    const prevMonthStats = await Waitlist.aggregate([
      {
        $match: {
          createdAt: { $gte: prevMonthStart, $lte: prevMonthEnd }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          byStatus: {
            $push: '$status'
          }
        }
      }
    ]);

    // Process current month data
    const currentMonthData = currentMonthStats[0] || { total: 0, byStatus: [] };
    const currentStatusCounts = { Active: 0, Booked: 0, Accepted: 0, Rejected: 0 };
    currentMonthData.byStatus.forEach(status => {
      currentStatusCounts[status] = (currentStatusCounts[status] || 0) + 1;
    });

    // Process previous month data
    const prevMonthData = prevMonthStats[0] || { total: 0, byStatus: [] };
    const prevStatusCounts = { Active: 0, Booked: 0, Accepted: 0, Rejected: 0 };
    prevMonthData.byStatus.forEach(status => {
      prevStatusCounts[status] = (prevStatusCounts[status] || 0) + 1;
    });

    // Calculate growth
    const growthRate = prevMonthData.total ? 
      Math.round(((currentMonthData.total - prevMonthData.total) / prevMonthData.total) * 100) : 
      (currentMonthData.total > 0 ? 100 : 0);

    const overview = {
      currentMonth: {
        total: currentMonthData.total,
        byStatus: currentStatusCounts
      },
      previousMonth: {
        total: prevMonthData.total,
        byStatus: prevStatusCounts
      },
      growth: {
        rate: growthRate,
        absolute: currentMonthData.total - prevMonthData.total
      },
      performance: {
        trend: growthRate >= 0 ? 'up' : 'down',
        message: growthRate >= 0 ? 
          `Up ${growthRate}% from last month` : 
          `Down ${Math.abs(growthRate)}% from last month`
      }
    };

    return NextResponse.json({
      success: true,
      overview
    });

  } catch (error) {
    console.error('Error fetching reports overview:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch reports overview' },
      { status: 500 }
    );
  }
}