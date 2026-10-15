import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import EmergencyTeaser from '@/models/EmergencyTeaser';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Helper to safely get user ID from session
const getUserIdFromSession = (session) => {
  return session?.user?.id || 
         session?.user?._id || 
         session?.user?.userId;
};

// Sanitise URLs — only allow http:// and https:// protocols
const sanitizeUrl = (url) => {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (trimmed === '') return '';
  try {
    const parsed = new URL(trimmed, 'https://placeholder.com');
    if (!['http:', 'https:'].includes(parsed.protocol)) return '';
    // If the input was a relative path (starts with /), keep it as-is
    if (trimmed.startsWith('/')) return trimmed;
    return parsed.href;
  } catch {
    // Allow relative paths like /appointment
    if (trimmed.startsWith('/')) return trimmed;
    return '';
  }
};

// GET: Fetch active emergency teasers (public) or all (admin)
export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get('admin') === 'true';
    
    let query = {};
    
    if (!isAdmin) {
      // For public: only active teasers that haven't expired
      query = {
        isActive: true,
        $or: [
          { endDate: { $exists: false } },
          { endDate: null },
          { endDate: { $gt: new Date() } }
        ]
      };
    }
    
    const teasers = await EmergencyTeaser.find(query)
      .sort({ priority: 1, createdAt: -1 })
      .populate('createdBy', 'firstName lastName email')
      .lean();
    
    return NextResponse.json({
      success: true,
      teasers
    });
    
  } catch (error) {
    console.error('Error fetching emergency teasers:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch emergency teasers' },
      { status: 500 }
    );
  }
}

// POST: Create a new emergency teaser
export async function POST(request) {
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
        { success: false, message: 'Admin or Doctor access required' },
        { status: 403 }
      );
    }
    
    await dbConnect();
    
    const body = await request.json();
    const { title, content, type, priority, isActive, endDate, buttonLabel, buttonUrl } = body;
    
    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: 'Title and content are required' },
        { status: 400 }
      );
    }

    // If a button label is provided, a URL must also be given
    if (buttonLabel && !buttonUrl) {
      return NextResponse.json(
        { success: false, message: 'Button URL is required when a button label is provided' },
        { status: 400 }
      );
    }
    
    const userId = getUserIdFromSession(session);
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Unable to determine user ID from session' },
        { status: 400 }
      );
    }
    
    const teaser = await EmergencyTeaser.create({
      title,
      content,
      type: type || 'emergency',
      priority: priority || 1,
      isActive: isActive !== undefined ? isActive : true,
      endDate: endDate ? new Date(endDate) : null,
      buttonLabel: buttonLabel ? String(buttonLabel).trim() : '',
      buttonUrl: sanitizeUrl(buttonUrl),
      createdBy: userId
    });
    
    return NextResponse.json({
      success: true,
      message: 'Emergency teaser created successfully',
      teaser
    });
    
  } catch (error) {
    console.error('Error creating emergency teaser:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create emergency teaser' },
      { status: 500 }
    );
  }
}

