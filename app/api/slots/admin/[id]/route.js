import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import AvailableSlot from '@/models/AvailableSlot';
import Appointment from '@/models/Appointment';

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Slot ID is required' },
        { status: 400 }
      );
    }
    
    // Find the slot
    const slot = await AvailableSlot.findById(id);
    
    if (!slot) {
      return NextResponse.json(
        { success: false, message: 'Slot not found' },
        { status: 404 }
      );
    }
    
    // Check if slot is booked
    if (slot.bookedBy) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Cannot delete a booked slot. Cancel the appointment first.' 
        },
        { status: 400 }
      );
    }
    
    // Delete the slot
    await AvailableSlot.findByIdAndDelete(id);
    
    return NextResponse.json({
      success: true,
      message: 'Slot deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting slot:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to delete slot' },
      { status: 500 }
    );
  }
}