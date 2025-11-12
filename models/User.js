// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = new mongoose.Schema({
//   firstName: {
//     type: String,
//     required: [true, 'First name is required'],
//     trim: true
//   },
//   lastName: {
//     type: String,
//     required: [true, 'Last name is required'],
//     trim: true
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//     lowercase: true,
//     trim: true
//   },
//   gender: {
//     type: String,
//     required: [true, 'Gender is required'],
//     enum: ['Male', 'Female', 'Other']
//   },
//   healthcareProvince: {
//     type: String,
//     required: [true, 'Healthcare province is required'],
//     trim: true
//   },
//   healthcareNumber: {
//     type: String,
//     required: [true, 'Healthcare number is required'],
//     trim: true
//   },
//   age: {
//     type: Number,
//     required: [true, 'Age is required'],
//     min: [0, 'Age cannot be negative']
//   },
//   dateOfBirth: {
//     type: Date,
//     required: [true, 'Date of birth is required']
//   },
//   cellPhone: {
//     type: String,
//     required: [true, 'Cell phone is required'],
//     trim: true
//   },
//   address: {
//     type: String,
//     required: [true, 'Address is required'],
//     trim: true
//   },
//   country: {
//     type: String,
//     required: [true, 'Country is required'],
//     trim: true
//   },
//   postalCode: {
//     type: String,
//     required: [true, 'Postal code is required'],
//     trim: true
//   },
//   password: {
//     type: String,
//     required: [true, 'Password is required'],
//     minlength: [8, 'Password must be at least 8 characters long']
//   },
//   role: {
//     type: String,
//     enum: ['patient', 'admin', 'doctor'],
//     default: 'patient'
//   }
// }, {
//   timestamps: true
// });

// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

// export default mongoose.models.User || mongoose.model('User', userSchema);




import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
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
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [0, 'Age cannot be negative']
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
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long']
  },
  role: {
    type: String,
    enum: ['patient', 'admin', 'doctor'],
    default: 'patient'
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model('User', userSchema);