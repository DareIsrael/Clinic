// import mongoose from 'mongoose';

// const appointmentSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: [true, 'User is required']
//   },
//   serviceType: {
//     type: String,
//     required: [true, 'Service type is required'],
//     enum: ['Dental Care', 'Eye Care', 'General Checkup', 'Cardiology', 'Dermatology', 'Pediatrics'] // ✅ FIXED: Changed 'Dental' to 'Dental Care'
//   },
//   preferredDate: {
//     type: Date,
//     required: [true, 'Preferred date is required']
//   },
//   preferredTime: {
//     type: String,
//     required: [true, 'Preferred time is required']
//   },
//   message: {
//     type: String,
//     trim: true,
//     maxlength: [500, 'Message cannot exceed 500 characters']
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'confirmed', 'cancelled', 'completed'],
//     default: 'pending'
//   }
// }, {
//   timestamps: true
// });

// // Remove or modify this unique index - it's causing conflicts
// // appointmentSchema.index({ preferredDate: 1, preferredTime: 1 }, { unique: true });

// export default mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);



import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  serviceType: {
    type: String,
    required: [true, 'Service type is required'],
    enum: ['Dental Care', 'Eye Care', 'General Checkup', 'Cardiology', 'Dermatology', 'Pediatrics']
  },
  preferredDate: {
    type: Date,
    required: [true, 'Preferred date is required']
  },
  preferredTime: {
    type: String,
    required: [true, 'Preferred time is required']
  },
  message: {
    type: String,
    trim: true,
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  lastVisit: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

export default mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);