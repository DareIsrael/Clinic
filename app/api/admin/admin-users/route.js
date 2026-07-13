import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';

// GET - List all admin users (doctor only)
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    if (session.user.role !== 'doctor') {
      return NextResponse.json(
        { success: false, message: 'Doctor access required' },
        { status: 403 }
      );
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';

    let query = { role: 'admin' };

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const admins = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .lean();

    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const activeAdmins = await User.countDocuments({ role: 'admin', status: { $ne: 'Deactivated' } });
    const deactivatedAdmins = await User.countDocuments({ role: 'admin', status: 'Deactivated' });

    return NextResponse.json({
      success: true,
      admins,
      counts: {
        total: totalAdmins,
        active: activeAdmins,
        deactivated: deactivatedAdmins,
      }
    });
  } catch (error) {
    console.error('Error fetching admin users:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch admin users' },
      { status: 500 }
    );
  }
}

// POST - Grant admin access to a patient (doctor only)
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    if (session.user.role !== 'doctor') {
      return NextResponse.json(
        { success: false, message: 'Doctor access required' },
        { status: 403 }
      );
    }

    await dbConnect();

    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    if (user.role === 'admin') {
      return NextResponse.json(
        { success: false, message: 'User is already an admin' },
        { status: 400 }
      );
    }

    if (user.role === 'doctor') {
      return NextResponse.json(
        { success: false, message: 'Cannot modify the doctor account' },
        { status: 400 }
      );
    }

    user.role = 'admin';
    user.status = 'Active';
    await user.save({ validateBeforeSave: false });

    return NextResponse.json({
      success: true,
      message: `${user.firstName} ${user.lastName} has been granted admin access`,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
      }
    });
  } catch (error) {
    console.error('Error granting admin access:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to grant admin access' },
      { status: 500 }
    );
  }
}
