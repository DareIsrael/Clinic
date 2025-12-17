import Appointment from '@/models/Appointment';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/utils/db';
import { NextResponse } from 'next/server';

export async function createAppointment(req) {
  try {
    // Use NextAuth session instead of protectRoute
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Please log in to book an appointment' },
        { status: 401 }
      );
    }

    await dbConnect();
    
    const body = await req.json();
    
    const { serviceType, preferredDate, preferredTime, message } = body;

    if (!serviceType || !preferredDate || !preferredTime) {
      return NextResponse.json(
        { success: false, message: 'Service type, date, and time are required' },
        { status: 400 }
      );
    }

    // Check for duplicate appointment for this specific user
    const existingAppointment = await Appointment.findOne({
      user: session.user.id,
      preferredDate: new Date(preferredDate),
      preferredTime
    });

    if (existingAppointment) {
      return NextResponse.json(
        { success: false, message: 'You already have an appointment at this time' },
        { status: 400 }
      );
    }

    const appointment = await Appointment.create({
      user: session.user.id,
      serviceType,
      preferredDate: new Date(preferredDate),
      preferredTime,
      message: message || ''
    });

    // Populate user data for response
    await appointment.populate('user', 'firstName lastName email');

    return NextResponse.json({
      success: true,
      appointment
    });

  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error during booking' },
      { status: 500 }
    );
  }
}

export async function getUserAppointments(req) {
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
    
    const appointments = await Appointment.find({ user: session.user.id })
      .populate('user', 'firstName lastName email')
      .sort({ preferredDate: 1 });

    return NextResponse.json({
      success: true,
      appointments
    });

  } catch (error) {
    console.error('Get appointments error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}

export async function getAllAppointments(req) {
  try {
    // Use NextAuth session instead of protectRoute
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
    
    const appointments = await Appointment.find()
      .populate('user', 'firstName lastName email')
      .sort({ preferredDate: 1 });

    return NextResponse.json({
      success: false,
      appointments
    });

  } catch (error) {
    console.error('Get all appointments error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}