// /app/api/dashboard/appointments/route.js
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/utils/db';
import Appointment from '@/models/Appointment';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    await dbConnect();

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit')) || 10;
    const page = parseInt(searchParams.get('page')) || 1;

    let appointments;
    let total;

    if (session.user.role === 'admin') {
      // Admin gets all appointments
      appointments = await Appointment.find()
        .populate('user', 'firstName lastName email')
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip((page - 1) * limit);

      total = await Appointment.countDocuments();
    } else {
      // Patient gets only their appointments
      appointments = await Appointment.find({ user: session.user.id })
        .populate('user', 'firstName lastName email')
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip((page - 1) * limit);

      total = await Appointment.countDocuments({ user: session.user.id });
    }

    return NextResponse.json({
      success: true,
      appointments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Dashboard appointments error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}