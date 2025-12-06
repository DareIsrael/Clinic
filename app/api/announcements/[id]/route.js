import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import Announcement from '@/models/Announcement';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Helper to safely get user ID from session
const getUserIdFromSession = (session) => {
  return session?.user?.id || 
         session?.user?._id || 
         session?.user?.userId;
};

// GET: Get single announcement (public)
export async function GET(request, { params }) {
  try {
    await dbConnect();
    
    // Correct way to get params in Next.js App Router
    const { id } = await params;
    
    const announcement = await Announcement.findById(id)
      .populate('createdBy', 'firstName lastName email')
      .lean();
    
    if (!announcement) {
      return NextResponse.json(
        { success: false, message: 'Announcement not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      announcement
    });
    
  } catch (error) {
    console.error('Error fetching announcement:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch announcement' },
      { status: 500 }
    );
  }
}

// PUT: Update an announcement
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check authentication
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check admin role
    if (session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      );
    }
    
    await dbConnect();
    
    // Correct way to get params in Next.js App Router
    const { id } = await params;
    const body = await request.json();
    
    const announcement = await Announcement.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    ).populate('createdBy', 'firstName lastName email');
    
    if (!announcement) {
      return NextResponse.json(
        { success: false, message: 'Announcement not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Announcement updated successfully',
      announcement
    });
    
  } catch (error) {
    console.error('Error updating announcement:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update announcement' },
      { status: 500 }
    );
  }
}

// DELETE: Delete an announcement
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check authentication
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check admin role
    if (session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      );
    }
    
    await dbConnect();
    
    // Correct way to get params in Next.js App Router
    const { id } = await params;
    
    const announcement = await Announcement.findByIdAndDelete(id);
    
    if (!announcement) {
      return NextResponse.json(
        { success: false, message: 'Announcement not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Announcement deleted successfully'
    });
    
  } catch (Error) {
    console.error('Error deleting announcement:', Error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete announcement' },
      { status: 500 }
    );
  }
}