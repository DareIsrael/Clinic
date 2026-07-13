import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import Waitlist from '@/models/Waitlist';

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    if (!['admin', 'doctor'].includes(session.user.role)) {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      );
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;

    // Build query
    let query = {};
    if (status && status !== 'all') {
      query.status = status;
    }
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { healthcareNumber: { $regex: search, $options: 'i' } }
      ];
    }

    const [waitlist, total, activeCount, bookedCount, acceptedCount, rejectedCount, calledCount, leftVoicemailCount, notReachableCount, allCount] = await Promise.all([
      Waitlist.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Waitlist.countDocuments(query),
      Waitlist.countDocuments({ status: 'Active' }),
      Waitlist.countDocuments({ status: 'Booked' }),
      Waitlist.countDocuments({ status: 'Accepted' }),
      Waitlist.countDocuments({ status: 'Rejected' }),
      Waitlist.countDocuments({ status: 'Called' }),
      Waitlist.countDocuments({ status: 'Left Voicemail' }),
      Waitlist.countDocuments({ status: 'Not Reachable' }),
      Waitlist.countDocuments({})
    ]);

    return NextResponse.json({
      success: true,
      waitlist,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      counts: {
        active: activeCount,
        booked: bookedCount,
        accepted: acceptedCount,
        rejected: rejectedCount,
        called: calledCount,
        leftVoicemail: leftVoicemailCount,
        notReachable: notReachableCount,
        all: allCount
      }
    });

  } catch (error) {
    console.error('Error fetching waitlist:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch waitlist' },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !['admin', 'doctor'].includes(session.user.role)) {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      );
    }

    await dbConnect();

    const body = await request.json();
    const { id, status } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Waitlist entry ID is required' },
        { status: 400 }
      );
    }

    const updateData = {};
    if (status) updateData.status = status;
    // if (position !== undefined) updateData.position = position;

    const updatedEntry = await Waitlist.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedEntry) {
      return NextResponse.json(
        { success: false, message: 'Waitlist entry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Waitlist entry updated successfully',
      waitlist: updatedEntry
    });

  } catch (error) {
    console.error('Error updating waitlist:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update waitlist entry' },
      { status: 500 }
    );
  }
}