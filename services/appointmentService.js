import Appointment from '@/models/Appointment';
import AvailableSlot from '@/models/AvailableSlot';
import { sanitizeSearchInput } from '@/utils/sanitize';

// SIMPLE: Remove all timezone helper functions
// Get clinic schedule (static for display)
const getClinicSchedule = () => {
  return [
    { day: 'Monday', hours: 'By Appointment Only', isOpen: true },
    { day: 'Tuesday', hours: 'By Appointment Only', isOpen: true },
    { day: 'Wednesday', hours: 'By Appointment Only', isOpen: true },
    { day: 'Thursday', hours: 'By Appointment Only', isOpen: true },
    { day: 'Friday', hours: 'By Appointment Only', isOpen: true },
    { day: 'Saturday', hours: 'By Appointment Only', isOpen: true },
    { day: 'Sunday', hours: 'Closed', isOpen: false }
  ];
};

// Get available slots for a specific date
const getAvailableSlots = async (dateString) => {
  try {
    // SIMPLE: Just use the date string directly
    const slots = await AvailableSlot.find({
      date: dateString  // Exact match on date string
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

// Get next available dates
const getAvailableDates = async () => {
  try {
    const today = new Date();
    const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    // Get dates that have at least one available slot AND are today or in the future
    const slots = await AvailableSlot.aggregate([
      {
        $match: {
          isAvailable: true,
          date: { $gte: todayString } // ONLY include today and future dates
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

    // SIMPLE: Just use date strings directly
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return slots.map(slot => {
      const [year, month, day] = slot._id.split('-').map(Number);
      const dateObj = new Date(year, month - 1, day);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowString = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;

      return {
        date: slot._id,  // Use the date string directly
        dayName: days[dateObj.getDay()],
        availableSlots: slot.availableSlots,
        isToday: slot._id === todayString,
        isTomorrow: slot._id === tomorrowString
      };
    });
  } catch (error) {
    console.error('Error getting available dates:', error);
    return [];
  }
};

// Book an appointment - SIMPLE VERSION
const bookAppointment = async (patientData) => {
  const session = await Appointment.startSession();

  try {
    await session.withTransaction(async () => {
      // Get date and time from form
      const appointmentDateStr = patientData.appointmentDate;  // YYYY-MM-DD
      const appointmentTime = patientData.appointmentTime;     // HH:MM

      // SIMPLE: Check if slot exists using exact date string
      const slot = await AvailableSlot.findOne({
        date: appointmentDateStr,
        time: appointmentTime,
        isAvailable: true
      }).session(session);

      if (!slot) {
        throw new Error('This time slot is no longer available. Please choose another time.');
      }

      // Check if patient already has an appointment on the same day
      const existingAppointment = await Appointment.findOne({
        email: patientData.email,
        appointmentDate: appointmentDateStr,
        status: { $in: ['scheduled', 'confirmed'] }
      }).session(session);

      if (existingAppointment) {
        throw new Error('You already have an appointment scheduled for this date');
      }

      // Create the appointment with plain strings
      const appointment = new Appointment({
        ...patientData,
        appointmentDate: appointmentDateStr,  // Store as plain string
        appointmentTime: appointmentTime,     // Store as plain string
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
const getAppointmentByEmailAndDate = async (email, appointmentDateStr, appointmentTime) => {
  try {
    return await Appointment.findOne({
      email: email,
      appointmentDate: appointmentDateStr,
      appointmentTime: appointmentTime
    });
  } catch (error) {
    console.error('Error getting appointment:', error);
    return null;
  }
};

// Add available slots (Admin function) - SIMPLE VERSION
// Add available slots (Admin function) - SIMPLE VERSION
const addAvailableSlots = async (dateString, times) => {
  try {
    // console.log('Adding slots for date:', dateString);

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) {
      return { success: false, message: 'Invalid date format. Use YYYY-MM-DD' };
    }

    const createdSlots = [];
    const duplicateSlots = [];

    for (const time of times) {
      try {
        // Check if slot exists - use EXACT date string
        const existingSlot = await AvailableSlot.findOne({
          date: dateString,  // Use string directly
          time: time
        });

        if (existingSlot) {
          duplicateSlots.push(time);
          continue;
        }

        // Create new slot with plain strings
        const slot = new AvailableSlot({
          date: dateString,  // Store as STRING
          time: time,        // Store as STRING
          isAvailable: true,
          adminCreated: true
        });

        await slot.save();
        createdSlots.push(slot);

        // console.log('Slot created:', {
        //   date: dateString,
        //   time: time
        // });

      } catch (error) {
        console.error(`Error creating slot ${time}:`, error);
      }
    }

    return {
      success: true,
      message: `Created ${createdSlots.length} slot(s) for ${dateString}`,
      count: createdSlots.length,
      duplicates: duplicateSlots.length
    };

  } catch (error) {
    console.error('Error in addAvailableSlots:', error);
    return { success: false, message: error.message };
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
    // SIMPLE: Just query by date strings
    const slots = await AvailableSlot.find({
      date: {
        $gte: startDate,
        $lte: endDate
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

// Get appointments for admin - SIMPLE VERSION
const getAppointmentsForAdmin = async (page = 1, limit = 10, search = '', status = '', date = '', filter = 'upcoming') => {
  const skip = (page - 1) * limit;

  let query = {};

  // SIMPLE: Filter by date strings
  if (date) {
    query.appointmentDate = date;
  }

  // Search by name, email, or phone - SANITIZED to prevent NoSQL injection
  if (search) {
    // Sanitize search input to prevent NoSQL injection and ReDoS attacks
    const sanitizedSearch = sanitizeSearchInput(search, 100);

    // Only perform search if sanitized input is not empty
    if (sanitizedSearch.length > 0) {
      query.$or = [
        { firstName: { $regex: sanitizedSearch, $options: 'i' } },
        { lastName: { $regex: sanitizedSearch, $options: 'i' } },
        { email: { $regex: sanitizedSearch, $options: 'i' } },
        { cellPhone: { $regex: sanitizedSearch, $options: 'i' } }
      ];
    }
  }

  // Filter by status
  if (status && status !== 'all') {
    query.status = status;
  }

  // Apply filter
  if (filter === 'upcoming') {
    const today = new Date();
    const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    query.appointmentDate = { $gte: todayString };
    query.status = { $in: ['scheduled', 'confirmed', 'no_show'] }; // specific statuses for upcoming
  } else if (filter === 'today') {
    const today = new Date();
    const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    query.appointmentDate = todayString;
  } else if (filter === 'completed') {
    query.status = 'completed';
  } else if (filter === 'cancelled') {
    query.status = 'cancelled';
  } else if (filter === 'past') {
    const today = new Date();
    const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    query.appointmentDate = { $lt: todayString };
  }

  const [total, appointments] = await Promise.all([
    Appointment.countDocuments(query),
    Appointment.find(query)
      .sort({ appointmentDate: 1, appointmentTime: 1 })
      .skip(skip)
      .limit(limit)
  ]);

  // key statistics for badges
  const today = new Date();
  const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const [upcomingCount, todayCount, completedCount, cancelledCount, allCount] = await Promise.all([
    Appointment.countDocuments({
      appointmentDate: { $gte: todayString },
      status: { $in: ['scheduled', 'confirmed', 'no_show'] }
    }),
    Appointment.countDocuments({ appointmentDate: todayString }),
    Appointment.countDocuments({ status: 'completed' }),
    Appointment.countDocuments({ status: 'cancelled' }),
    Appointment.countDocuments({})
  ]);

  return {
    appointments,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    },
    counts: {
      upcoming: upcomingCount,
      today: todayCount,
      completed: completedCount,
      cancelled: cancelledCount,
      all: allCount
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

// Cleanup past date slots (optional - can be run as a cron job or manually)
const cleanupPastSlots = async () => {
  try {
    const today = new Date();
    const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    // Delete all slots with dates before today
    const result = await AvailableSlot.deleteMany({
      date: { $lt: todayString }
    });

    // console.log(`Cleaned up ${result.deletedCount} past date slots`);

    return {
      success: true,
      deletedCount: result.deletedCount,
      message: `Successfully removed ${result.deletedCount} past date slots`
    };
  } catch (error) {
    console.error('Error cleaning up past slots:', error);
    return {
      success: false,
      message: error.message
    };
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
  cleanupPastSlots  // NEW: Function to remove past date slots
  // REMOVED: parseDateToUTC, formatDateToYYYYMMDD
};