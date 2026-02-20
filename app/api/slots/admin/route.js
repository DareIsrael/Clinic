import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import AvailableSlot from '@/models/AvailableSlot';
import Appointment from '@/models/Appointment';

// GET - Get all slots within a date range
export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    
    // console.log('GET /api/slots/admin called with:', { startDate, endDate });
    
    let query = {};
    
    if (startDate && endDate) {
      // SIMPLE: Just use date strings directly
      query.date = {
        $gte: startDate,
        $lte: endDate
      };
    }
    
    const slots = await AvailableSlot.find(query)
      .populate('bookedBy', 'firstName lastName email')
      .sort({ date: 1, time: 1 });
    
    // console.log(`Found ${slots.length} slots in database`);
    
    // SIMPLE: Just return the slots as they are
    return NextResponse.json({
      success: true,
      slots: slots,
      count: slots.length
    });
  } catch (error) {
    console.error('Error getting slots:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to get slots' },
      { status: 500 }
    );
  }
}

// DELETE - Simple version
export async function DELETE(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const slotId = searchParams.get('slotId');
    const date = searchParams.get('date');
    
    if (date) {
      // console.log('Deleting slots for date:', date);
      
      // SIMPLE: Find slots by exact date string
      const slotsToDelete = await AvailableSlot.find({
        date: date
      });
      
      // Check if any slots are booked
      const bookedSlots = slotsToDelete.filter(slot => slot.bookedBy);
      
      if (bookedSlots.length > 0) {
        return NextResponse.json(
          { 
            success: false, 
            message: `Cannot delete date with booked appointments. ${bookedSlots.length} slot(s) are currently booked.` 
          },
          { status: 400 }
        );
      }
      
      // Delete the slots
      const result = await AvailableSlot.deleteMany({
        date: date
      });
      
      // console.log(`Deleted ${result.deletedCount} slots for ${date}`);
      
      return NextResponse.json({
        success: true,
        message: `Deleted all slots for ${date}`,
        deletedCount: result.deletedCount
      });
    } else if (slotId) {
      // Delete individual slot
      const slot = await AvailableSlot.findById(slotId);
      
      if (!slot) {
        return NextResponse.json(
          { success: false, message: 'Slot not found' },
          { status: 404 }
        );
      }
      
      if (slot.bookedBy) {
        return NextResponse.json(
          { success: false, message: 'Cannot delete a booked slot' },
          { status: 400 }
        );
      }
      
      await AvailableSlot.findByIdAndDelete(slotId);
      
      return NextResponse.json({
        success: true,
        message: 'Slot deleted successfully'
      });
    }
    
    // If no parameters provided, bad request
    return NextResponse.json(
      { success: false, message: 'Either slotId or date parameter is required' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error deleting slots:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to delete slots' },
      { status: 500 }
    );
  }
}