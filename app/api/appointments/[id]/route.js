import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Appointment from '@/models/Appointment';
import dbConnect from '@/utils/db';
import { NextResponse } from 'next/server';

// App Router syntax - params is passed as an object
export async function DELETE(req, { params }) {
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
    
    // Correct way to get params in App Router
    const { id } = await params;
    
    // console.log('Deleting appointment ID:', id); // Debug log

    const appointment = await Appointment.findById(id);
    
    if (!appointment) {
      return NextResponse.json(
        { success: false, message: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Check if user owns the appointment or is admin
    // Use session.user.id instead of user._id
    if (appointment.user.toString() !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Not authorized to cancel this appointment' },
        { status: 403 }
      );
    }

    await Appointment.findByIdAndUpdate(id, { status: 'cancelled' });

    return NextResponse.json({
      success: true,
      message: 'Appointment cancelled successfully'
    });

  } catch (error) {
    console.error('Error cancelling appointment:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    // Use NextAuth session instead of requireAdmin
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check if user is admin
    if (session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      );
    }

    await dbConnect();
    
    // Correct way to get params in App Router
    const { id } = await params;
    
    // console.log('Updating appointment ID:', id); // Debug log

    const body = await req.json();

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true }
    ).populate('user', 'firstName lastName email');

    if (!appointment) {
      return NextResponse.json(
        { success: false, message: 'Appointment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      appointment
    });

  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}