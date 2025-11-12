import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';

export async function GET(request) {
  try {
    // Check authentication and admin role using NextAuth
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
    const limit = parseInt(searchParams.get('limit')) || 10;
    const page = parseInt(searchParams.get('page')) || 1;

    // Select ALL user fields except password
    const users = await User.find({ role: 'patient' })
      .select('-password') // Exclude password field
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await User.countDocuments({ role: 'patient' });

    return NextResponse.json({
      success: true,
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Admin users error:', error);
    
    // Handle specific error cases
    if (error.message?.includes('Admin access required') || error.message?.includes('Authentication required')) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: error.message.includes('Authentication required') ? 401 : 403 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}