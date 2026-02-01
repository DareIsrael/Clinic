import mongoose from 'mongoose';

const availableSlotSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'Date is required'],
    // Store as UTC midnight
    get: function(value) {
      if (!value) return null;
      const d = new Date(value);
      return d.toISOString().split('T')[0];
    }
  },
  time: {
    type: String,
    required: [true, 'Time is required'],
    match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:MM format']
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    default: null
  },
  adminCreated: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { getters: true, virtuals: true },
  toObject: { getters: true, virtuals: true }
});

// Pre-save middleware to ensure date is stored as UTC midnight
availableSlotSchema.pre('save', function(next) {
  if (this.isModified('date') && this.date) {
    const date = new Date(this.date);
    // Convert to UTC midnight
    const utcDate = new Date(Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0, 0, 0, 0
    ));
    this.date = utcDate;
  }
  next();
});

// Compound index for unique date-time combinations
availableSlotSchema.index({ date: 1, time: 1 }, { unique: true });

// Index for querying available slots
availableSlotSchema.index({ date: 1, isAvailable: 1 });

export default mongoose.models.AvailableSlot || mongoose.model('AvailableSlot', availableSlotSchema);