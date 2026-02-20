import { NextResponse } from 'next/server';
import { appointmentService } from '@/services/appointmentService';
import dbConnect from '@/utils/db';

// GET - Get appointments for admin dashboard
export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const date = searchParams.get('date') || '';
    const filter = searchParams.get('filter') || 'upcoming';
    
    const result = await appointmentService.getAppointmentsForAdmin(
      page,
      limit,
      search,
      status,
      date,
      filter
    );
    
    return NextResponse.json({
      success: true,
      ...result
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// POST - Add new available slots (Admin only)
export async function POST(request) {
  try {
    await dbConnect();
    
    const data = await request.json();
    const { date, times } = data;
    
    if (!date || !times || !Array.isArray(times) || times.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Date and times array are required' },
        { status: 400 }
      );
    }
    
    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return NextResponse.json(
        { success: false, message: 'Date must be in YYYY-MM-DD format' },
        { status: 400 }
      );
    }
    
    // Validate times format (HH:MM)
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    const invalidTimes = times.filter(time => !timeRegex.test(time));
    if (invalidTimes.length > 0) {
      return NextResponse.json(
        { success: false, message: `Invalid time format: ${invalidTimes.join(', ')}. Use HH:MM format.` },
        { status: 400 }
      );
    }
    
    // console.log('Adding slots for date:', date, 'times:', times);
    
    const result = await appointmentService.addAvailableSlots(date, times);
    
    if (result.success) {
      return NextResponse.json(result, { status: 201 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error) {
    console.error('Error in POST /api/appointments/admin:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to add slots' },
      { status: 500 }
    );
  }
}

// PUT - Update slot availability (Admin only)
export async function PUT(request) {
  try {
    await dbConnect();
    
    const data = await request.json();
    const { slotId, isAvailable } = data;
    
    if (!slotId || typeof isAvailable !== 'boolean') {
      return NextResponse.json(
        { success: false, message: 'slotId and isAvailable are required' },
        { status: 400 }
      );
    }
    
    const result = await appointmentService.updateSlotAvailability(slotId, isAvailable);
    
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}