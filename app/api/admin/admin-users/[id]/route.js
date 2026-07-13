import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';

// PATCH - Activate/Deactivate an admin user (doctor only)
export async function PATCH(request, { params }) {
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
    
    const { id } = await params;
    const { action } = await request.json();

    // Prevent self-modification
    if (id === session.user.id) {
      return NextResponse.json(
        { success: false, message: 'You cannot modify your own account' },
        { status: 400 }
      );
    }

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    if (user.role === 'doctor') {
      return NextResponse.json(
        { success: false, message: 'Cannot modify the doctor account' },
        { status: 400 }
      );
    }

    if (user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'User is not an admin' },
        { status: 400 }
      );
    }

    if (action === 'activate') {
      user.status = 'Active';
    } else if (action === 'deactivate') {
      user.status = 'Deactivated';
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid action. Use "activate" or "deactivate"' },
        { status: 400 }
      );
    }

    await user.save({ validateBeforeSave: false });

    return NextResponse.json({
      success: true,
      message: `Admin ${user.firstName} ${user.lastName} has been ${action}d`,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        status: user.status,
      }
    });
  } catch (error) {
    console.error('Error updating admin status:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update admin status' },
      { status: 500 }
    );
  }
}

// DELETE - Remove admin access (demote to patient) or delete user (doctor only)
export async function DELETE(request, { params }) {
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
    
    const { id } = await params;

    // Prevent self-deletion
    if (id === session.user.id) {
      return NextResponse.json(
        { success: false, message: 'You cannot delete your own account' },
        { status: 400 }
      );
    }

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    if (user.role === 'doctor') {
      return NextResponse.json(
        { success: false, message: 'Cannot delete the doctor account' },
        { status: 400 }
      );
    }

    if (user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'User is not an admin' },
        { status: 400 }
      );
    }

    // Demote to patient instead of deleting the user entirely
    user.role = 'patient';
    user.status = 'Active';
    await user.save({ validateBeforeSave: false });

    return NextResponse.json({
      success: true,
      message: `Admin access removed for ${user.firstName} ${user.lastName}. User demoted to patient.`,
    });
  } catch (error) {
    console.error('Error removing admin:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to remove admin' },
      { status: 500 }
    );
  }
}
