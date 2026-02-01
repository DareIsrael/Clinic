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
    
    let query = {};
    
    if (startDate && endDate) {
      // Get slots within date range
      const start = new Date(startDate);
      start.setUTCHours(0, 0, 0, 0);
      
      const end = new Date(endDate);
      end.setUTCDate(end.getUTCDate() + 1);
      end.setUTCHours(0, 0, 0, 0);
      
      query.date = {
        $gte: start,
        $lt: end
      };
    } else {
      // Default to next 30 days
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      
      const futureDate = new Date(today);
      futureDate.setUTCDate(futureDate.getUTCDate() + 30);
      futureDate.setUTCHours(23, 59, 59, 999);
      
      query.date = {
        $gte: today,
        $lte: futureDate
      };
    }
    
    const slots = await AvailableSlot.find(query)
      .populate('bookedBy', 'firstName lastName email')
      .sort({ date: 1, time: 1 });
    
    return NextResponse.json({
      success: true,
      slots,
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

// DELETE - Delete slot by ID or all slots for a date
export async function DELETE(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const slotId = searchParams.get('slotId');
    const date = searchParams.get('date');
    
    if (slotId) {
      // Delete individual slot
      const slot = await AvailableSlot.findById(slotId);
      
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
      
      await AvailableSlot.findByIdAndDelete(slotId);
      
      return NextResponse.json({
        success: true,
        message: 'Slot deleted successfully'
      });
    }
    
    if (date) {
      // Delete all slots for a specific date
      const start = new Date(date);
      start.setUTCHours(0, 0, 0, 0);
      
      const end = new Date(date);
      end.setUTCDate(end.getUTCDate() + 1);
      end.setUTCHours(0, 0, 0, 0);
      
      // Find slots to be deleted
      const slotsToDelete = await AvailableSlot.find({
        date: {
          $gte: start,
          $lt: end
        }
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
      await AvailableSlot.deleteMany({
        date: {
          $gte: start,
          $lt: end
        }
      });
      
      return NextResponse.json({
        success: true,
        message: `Deleted all slots for ${date}`,
        deletedCount: slotsToDelete.length
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



