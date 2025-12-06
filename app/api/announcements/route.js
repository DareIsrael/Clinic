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

// GET: Fetch all active announcements
export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get('admin') === 'true';
    
    let query = {};
    
    if (!isAdmin) {
      // For public/homepage: only active announcements that haven't expired
      query = {
        isActive: true,
        $or: [
          { endDate: { $exists: false } },
          { endDate: { $gt: new Date() } }
        ]
      };
    }
    
    const announcements = await Announcement.find(query)
      .sort({ priority: -1, createdAt: -1 })
      .populate('createdBy', 'firstName lastName email')
      .lean();
    
    return NextResponse.json({
      success: true,
      announcements
    });
    
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch announcements' },
      { status: 500 }
    );
  }
}

// POST: Create a new announcement
export async function POST(request) {
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
    
    const body = await request.json();
    const { title, content, type, priority, isActive, endDate } = body;
    
    // Validation
    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: 'Title and content are required' },
        { status: 400 }
      );
    }
    
    // Get user ID from session
    const userId = getUserIdFromSession(session);
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Unable to determine user ID from session' },
        { status: 400 }
      );
    }
    
    const announcement = await Announcement.create({
      title,
      content,
      type: type || 'info',
      priority: priority || 3,
      isActive: isActive !== undefined ? isActive : true,
      endDate: endDate ? new Date(endDate) : null,
      createdBy: userId
    });
    
    return NextResponse.json({
      success: true,
      message: 'Announcement created successfully',
      announcement
    });
    
  } catch (error) {
    console.error('Error creating announcement:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create announcement' },
      { status: 500 }
    );
  }
}