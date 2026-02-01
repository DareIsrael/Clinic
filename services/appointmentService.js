import Appointment from '@/models/Appointment';
import AvailableSlot from '@/models/AvailableSlot';

// Helper function to parse date string to UTC midnight
const parseDateToUTC = (dateString) => {
  if (!dateString) return null;
  
  // If it's already a Date object, convert to UTC midnight
  if (dateString instanceof Date) {
    const year = dateString.getUTCFullYear();
    const month = dateString.getUTCMonth();
    const day = dateString.getUTCDate();
    return new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
  }
  
  // Parse YYYY-MM-DD string to UTC midnight
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
};

// Helper function to format date to YYYY-MM-DD
const formatDateToYYYYMMDD = (date) => {
  if (!date) return '';
  
  const d = date instanceof Date ? date : new Date(date);
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Get clinic schedule (static for display)
const getClinicSchedule = () => {
  return [
    { day: 'Monday', hours: 'By Appointment Only', isOpen: true },
    { day: 'Tuesday', hours: 'By Appointment Only', isOpen: true },
    { day: 'Wednesday', hours: 'By Appointment Only', isOpen: true },
    { day: 'Thursday', hours: 'By Appointment Only', isOpen: true },
    { day: 'Friday', hours: 'Closed', isOpen: false },
    { day: 'Saturday', hours: 'By Appointment Only', isOpen: true },
    { day: 'Sunday', hours: 'Closed', isOpen: false }
  ];
};

// Get available slots for a specific date (from admin-set slots)
const getAvailableSlots = async (dateString) => {
  try {
    const date = parseDateToUTC(dateString);
    
    const startOfDay = date;
    const endOfDay = new Date(date);
    endOfDay.setUTCDate(endOfDay.getUTCDate() + 1);
    endOfDay.setUTCHours(0, 0, 0, 0);

    // Get all slots for this date
    const slots = await AvailableSlot.find({
      date: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    }).sort({ time: 1 });

    // Return slots with availability status
    return slots.map(slot => ({
      time: slot.time,
      available: slot.isAvailable,
      slotId: slot._id
    }));
  } catch (error) {
    console.error('Error getting available slots:', error);
    return [];
  }
};

// Get next available dates (with at least one available slot)
const getAvailableDates = async () => {
  try {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    
    // Look 30 days ahead
    const futureDate = new Date(today);
    futureDate.setUTCDate(futureDate.getUTCDate() + 30);
    futureDate.setUTCHours(23, 59, 59, 999);

    // Get dates that have at least one available slot
    const slots = await AvailableSlot.aggregate([
      {
        $match: {
          date: { $gte: today, $lte: futureDate },
          isAvailable: true
        }
      },
      {
        $group: {
          _id: "$date",
          availableSlots: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // Format response
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    return slots.map(slot => {
      const date = new Date(slot._id);
      const now = new Date();
      now.setUTCHours(0, 0, 0, 0);
      
      const tomorrow = new Date(now);
      tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
      
      const dateString = formatDateToYYYYMMDD(date);
      const todayString = formatDateToYYYYMMDD(now);
      const tomorrowString = formatDateToYYYYMMDD(tomorrow);
      
      return {
        date: dateString,
        dayName: days[date.getUTCDay()],
        availableSlots: slot.availableSlots,
        isToday: dateString === todayString,
        isTomorrow: dateString === tomorrowString
      };
    });
  } catch (error) {
    console.error('Error getting available dates:', error);
    return [];
  }
};

// Book an appointment
const bookAppointment = async (patientData) => {
  const session = await Appointment.startSession();
  
  try {
    await session.withTransaction(async () => {
      // Parse appointment date to UTC
      const appointmentDate = parseDateToUTC(patientData.appointmentDate);
      
      // Check if slot exists and is available
      const slot = await AvailableSlot.findOne({
        date: appointmentDate,
        time: patientData.appointmentTime,
        isAvailable: true
      }).session(session);

      if (!slot) {
        throw new Error('This time slot is no longer available. Please choose another time.');
      }

      // Check if patient already has an appointment on the same day
      const startOfDay = appointmentDate;
      const endOfDay = new Date(appointmentDate);
      endOfDay.setUTCDate(endOfDay.getUTCDate() + 1);
      endOfDay.setUTCHours(0, 0, 0, 0);

      const existingAppointment = await Appointment.findOne({
        email: patientData.email,
        appointmentDate: {
          $gte: startOfDay,
          $lt: endOfDay
        },
        status: { $in: ['scheduled', 'confirmed'] }
      }).session(session);

      if (existingAppointment) {
        throw new Error('You already have an appointment scheduled for this date');
      }

      // Create the appointment
      const appointment = new Appointment({
        ...patientData,
        appointmentDate: appointmentDate, // Store as UTC
        slotId: slot._id,
        status: 'scheduled'
      });
      await appointment.save({ session });

      // Mark slot as unavailable
      slot.isAvailable = false;
      slot.bookedBy = appointment._id;
      await slot.save({ session });

      return {
        success: true,
        appointment,
        message: 'Appointment booked successfully!'
      };
    });
    
    return {
      success: true,
      message: 'Appointment booked successfully!'
    };
  } catch (error) {
    console.error('Error booking appointment:', error);
    
    return {
      success: false,
      message: error.message || 'Failed to book appointment. Please try again.'
    };
  } finally {
    await session.endSession();
  }
};

// Get appointment by email and date
const getAppointmentByEmailAndDate = async (email, appointmentDate, appointmentTime) => {
  try {
    const date = parseDateToUTC(appointmentDate);
    const startOfDay = date;
    const endOfDay = new Date(date);
    endOfDay.setUTCDate(endOfDay.getUTCDate() + 1);
    endOfDay.setUTCHours(0, 0, 0, 0);

    return await Appointment.findOne({
      email: email,
      appointmentDate: {
        $gte: startOfDay,
        $lt: endOfDay
      },
      appointmentTime: appointmentTime
    });
  } catch (error) {
    console.error('Error getting appointment:', error);
    return null;
  }
};

// Admin: Add available slots
const addAvailableSlots = async (dateString, times) => {
  try {
    const slots = [];
    const date = parseDateToUTC(dateString);

    for (const time of times) {
      const slot = new AvailableSlot({
        date: date,
        time: time,
        isAvailable: true,
        adminCreated: true
      });
      slots.push(slot);
    }

    await AvailableSlot.insertMany(slots, { ordered: false });
    
    return {
      success: true,
      message: 'Slots added successfully',
      count: slots.length
    };
  } catch (error) {
    // Handle duplicate slots gracefully
    if (error.code === 11000) {
      return {
        success: true,
        message: 'Some slots were already added',
        count: times.length - error.writeErrors?.length || times.length
      };
    }
    
    console.error('Error adding slots:', error);
    return {
      success: false,
      message: error.message || 'Failed to add slots'
    };
  }
};

// Admin: Update slot availability
const updateSlotAvailability = async (slotId, isAvailable) => {
  try {
    const slot = await AvailableSlot.findById(slotId);
    
    if (!slot) {
      throw new Error('Slot not found');
    }

    slot.isAvailable = isAvailable;
    if (isAvailable) {
      slot.bookedBy = null;
    }
    
    await slot.save();
    
    return {
      success: true,
      slot,
      message: `Slot marked as ${isAvailable ? 'available' : 'unavailable'}`
    };
  } catch (error) {
    console.error('Error updating slot:', error);
    return {
      success: false,
      message: error.message || 'Failed to update slot'
    };
  }
};

const getAllSlotsForAdmin = async (startDate, endDate) => {
  try {
    const start = parseDateToUTC(startDate);
    const end = parseDateToUTC(endDate);
    end.setUTCDate(end.getUTCDate() + 1); // Include the end date

    const slots = await AvailableSlot.find({
      date: {
        $gte: start,
        $lt: end
      }
    })
    .populate('bookedBy', 'firstName lastName email')
    .sort({ date: 1, time: 1 });

    return slots;
  } catch (error) {
    console.error('Error getting slots for admin:', error);
    return [];
  }
};

// Get appointments for admin
const getAppointmentsForAdmin = async (page = 1, limit = 10, search = '', status = '', date = '', filter = 'upcoming') => {
  const skip = (page - 1) * limit;
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  
  let query = {};
  
  // Apply filter
  if (filter === 'today') {
    const tomorrow = new Date(today);
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
    
    query.appointmentDate = {
      $gte: today,
      $lt: tomorrow
    };
  } else if (filter === 'upcoming') {
    query.appointmentDate = { $gte: today };
    query.status = { $in: ['scheduled', 'confirmed'] };
  } else if (filter === 'completed') {
    query.status = 'completed';
  } else if (filter === 'cancelled') {
    query.status = 'cancelled';
  } else if (filter === 'past') {
    query.appointmentDate = { $lt: today };
  }
  
  // Search by name, email, or phone
  if (search) {
    query.$or = [
      { firstName: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { cellPhone: { $regex: search, $options: 'i' } }
    ];
  }
  
  // Filter by status (overrides filter if specified)
  if (status && status !== 'all') {
    query.status = status;
  }
  
  // Filter by specific date
  if (date) {
    const startOfDay = parseDateToUTC(date);
    const endOfDay = new Date(startOfDay);
    endOfDay.setUTCDate(endOfDay.getUTCDate() + 1);
    
    query.appointmentDate = {
      $gte: startOfDay,
      $lt: endOfDay
    };
  }
  
  const total = await Appointment.countDocuments(query);
  
  const appointments = await Appointment.find(query)
    .sort({ appointmentDate: 1, appointmentTime: 1 })
    .skip(skip)
    .limit(limit);
  
  return {
    appointments,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

// Update appointment status
const updateAppointmentStatus = async (appointmentId, status) => {
  return await Appointment.findByIdAndUpdate(
    appointmentId,
    { 
      status,
      updatedAt: new Date()
    },
    { new: true }
  );
};

// Cancel appointment
const cancelAppointment = async (appointmentId, reason) => {
  const session = await Appointment.startSession();
  
  try {
    await session.withTransaction(async () => {
      const appointment = await Appointment.findById(appointmentId).session(session);
      
      if (!appointment) {
        throw new Error('Appointment not found');
      }

      // Update appointment
      appointment.status = 'cancelled';
      if (reason) {
        appointment.notes = reason;
      }
      await appointment.save({ session });

      // Make the slot available again
      if (appointment.slotId) {
        await AvailableSlot.findByIdAndUpdate(
          appointment.slotId,
          { 
            isAvailable: true,
            bookedBy: null
          },
          { session }
        );
      }

      return appointment;
    });

    return await Appointment.findById(appointmentId);
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    throw error;
  } finally {
    await session.endSession();
  }
};

// Export all functions as named exports
export const appointmentService = {
  getClinicSchedule,
  getAvailableSlots,
  getAvailableDates,
  bookAppointment,
  getAppointmentByEmailAndDate,
  addAvailableSlots,
  updateSlotAvailability,
  getAppointmentsForAdmin,
  getAllSlotsForAdmin,
  updateAppointmentStatus,
  cancelAppointment,
  parseDateToUTC,
  formatDateToYYYYMMDD
};