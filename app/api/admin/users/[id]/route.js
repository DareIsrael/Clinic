import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';

export async function PATCH(request, { params }) {
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
    
    // AWAIT the params promise
    const { id } = await params;
    const { status } = await request.json();

    console.log('Updating user status:', { id, status }); // Debug log

    // Validate status
    const validStatuses = ['Active', 'Booked', 'Accepted', 'Rejected'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status' },
        { status: 400 }
      );
    }

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User status updated successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error('Update user status error:', error);
    
    if (error.message?.includes('Admin access required') || error.message?.includes('Authentication required')) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: error.message.includes('Authentication required') ? 401 : 403 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: 'Failed to update user status' },
      { status: 500 }
    );
  }
}

// Optional: Add GET method to fetch single user details
export async function GET(request, { params }) {
  try {
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
    
    // AWAIT the params promise here too
    const { id } = await params;

    const user = await User.findById(id).select('-password');

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}