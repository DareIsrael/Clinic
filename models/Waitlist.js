import mongoose from 'mongoose';

const waitlistSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['Male', 'Female', 'Other']
  },
  healthcareProvince: {
    type: String,
    required: [true, 'Healthcare province is required'],
    trim: true
  },
  healthcareNumber: {
    type: String,
    required: [true, 'Healthcare number is required'],
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  cellPhone: {
    type: String,
    required: [true, 'Cell phone is required'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true
  },
  postalCode: {
    type: String,
    required: [true, 'Postal code is required'],
    trim: true
  },
  // FIXED: Updated enum values to match what you're using
  status: {
    type: String,
    enum: ['Active', 'Booked', 'Accepted', 'Rejected'],
    default: 'Active'
  }
//   position: {
//     type: Number,
//     default: 0
//   }
}, {
  timestamps: true
});

// Add index for better query performance
waitlistSchema.index({ createdAt: 1 });
waitlistSchema.index({ status: 1 });
// waitlistSchema.index({ email: 1 });

export default mongoose.models.Waitlist || mongoose.model('Waitlist', waitlistSchema);