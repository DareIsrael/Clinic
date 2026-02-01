import mongoose from 'mongoose';

const availableSlotSchema = new mongoose.Schema({
  date: {
    type: String,  // MUST BE String, NOT Date
    required: [true, 'Date is required'],
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
  timestamps: true
});

// REMOVE ALL pre-save hooks - they're converting strings to Date objects!
// availableSlotSchema.pre('save', function(next) {
//   ... REMOVE THIS ENTIRE FUNCTION ...
// });

availableSlotSchema.index({ date: 1, time: 1 }, { unique: true });
availableSlotSchema.index({ date: 1, isAvailable: 1 });

export default mongoose.models.AvailableSlot || mongoose.model('AvailableSlot', availableSlotSchema);