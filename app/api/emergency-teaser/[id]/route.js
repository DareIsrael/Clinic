import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import EmergencyTeaser from '@/models/EmergencyTeaser';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Sanitise URLs — only allow http:// and https:// protocols
const sanitizeUrl = (url) => {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (trimmed === '') return '';
  try {
    const parsed = new URL(trimmed, 'https://placeholder.com');
    if (!['http:', 'https:'].includes(parsed.protocol)) return '';
    if (trimmed.startsWith('/')) return trimmed;
    return parsed.href;
  } catch {
    if (trimmed.startsWith('/')) return trimmed;
    return '';
  }
};

// Whitelist of fields that may be updated via PUT
const ALLOWED_UPDATE_FIELDS = [
  'title', 'content', 'type', 'priority',
  'isActive', 'endDate', 'buttonLabel', 'buttonUrl'
];

// PUT: Update an emergency teaser
export async function PUT(request, { params }) {
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
    
    const { id } = await params;
    const body = await request.json();
    
    // Build a safe update object — only whitelisted fields
    const updateData = {};
    for (const key of ALLOWED_UPDATE_FIELDS) {
      if (body[key] !== undefined) {
        if (key === 'buttonUrl') {
          updateData[key] = sanitizeUrl(body[key]);
        } else if (key === 'buttonLabel') {
          updateData[key] = String(body[key]).trim();
        } else if (key === 'endDate') {
          updateData[key] = body[key] ? new Date(body[key]) : null;
        } else {
          updateData[key] = body[key];
        }
      }
    }

    // Validate: if buttonLabel is set, buttonUrl must also be present
    if (updateData.buttonLabel && !updateData.buttonUrl) {
      // Check whether buttonUrl already exists on the document
      const existing = await EmergencyTeaser.findById(id).lean();
      if (existing && !existing.buttonUrl) {
        return NextResponse.json(
          { success: false, message: 'Button URL is required when a button label is provided' },
          { status: 400 }
        );
      }
    }
    
    const teaser = await EmergencyTeaser.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate('createdBy', 'firstName lastName email');
    
    if (!teaser) {
      return NextResponse.json(
        { success: false, message: 'Emergency teaser not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Emergency teaser updated successfully',
      teaser
    });
    
  } catch (error) {
    console.error('Error updating emergency teaser:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update emergency teaser' },
      { status: 500 }
    );
  }
}

// DELETE: Delete an emergency teaser
export async function DELETE(request, { params }) {
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
    
    const { id } = await params;
    
    const teaser = await EmergencyTeaser.findByIdAndDelete(id);
    
    if (!teaser) {
      return NextResponse.json(
        { success: false, message: 'Emergency teaser not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Emergency teaser deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting emergency teaser:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete emergency teaser' },
      { status: 500 }
    );
  }
}
