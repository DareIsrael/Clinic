import mongoose from 'mongoose';

const emergencyTeaserSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
    maxlength: [2000, 'Content cannot exceed 2000 characters']
  },
  type: {
    type: String,
    enum: ['emergency', 'warning', 'info', 'update', 'success'],
    default: 'emergency'
  },
  priority: {
    type: Number,
    min: 1,
    max: 5,
    default: 1
  },
  isActive: {
    type: Boolean,
    default: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: false
  },
  buttonLabel: {
    type: String,
    trim: true,
    maxlength: [100, 'Button label cannot exceed 100 characters'],
    default: ''
  },
  buttonUrl: {
    type: String,
    trim: true,
    maxlength: [500, 'Button URL cannot exceed 500 characters'],
    default: ''
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for active teasers
emergencyTeaserSchema.index({ isActive: 1, startDate: -1 });
emergencyTeaserSchema.index({ endDate: 1 });

export default mongoose.models.EmergencyTeaser || mongoose.model('EmergencyTeaser', emergencyTeaserSchema);
