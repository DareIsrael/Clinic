// import { register } from '@/controllers/authController';

// export async function POST(request) {
//   return register(request);
// }



import { NextResponse } from 'next/server';
import validator from 'validator';
import dbConnect from '@/utils/db';
import User from '@/models/User';
import { signToken } from '@/utils/auth';

export async function POST(request) {
  try {
    // console.log('📝 Register API route called');
    await dbConnect();
    
    const body = await request.json();
    
    const {
      firstName,
      lastName,
      email,
      gender,
      healthcareProvince,
      healthcareNumber,
      age,
      dateOfBirth,
      cellPhone,
      address,
      country,
      postalCode,
      password,
      confirmPassword
    } = body;

    // Trim all string inputs
    const trimmedFirstName = firstName?.trim();
    const trimmedLastName = lastName?.trim();
    const trimmedEmail = email?.trim().toLowerCase();
    const trimmedHealthcareProvince = healthcareProvince?.trim();
    const trimmedHealthcareNumber = healthcareNumber?.trim();
    const trimmedCellPhone = cellPhone?.trim();
    const trimmedAddress = address?.trim();
    const trimmedCountry = country?.trim();
    const trimmedPostalCode = postalCode?.trim();

    // Validation - Check all required fields
    if (!trimmedFirstName || !trimmedLastName || !trimmedEmail || !gender || 
        !trimmedHealthcareProvince || !trimmedHealthcareNumber || !age || 
        !dateOfBirth || !trimmedCellPhone || !trimmedAddress || !trimmedCountry || 
        !trimmedPostalCode || !password || !confirmPassword) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    if (!validator.isEmail(trimmedEmail)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Password validation
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: 'Passwords do not match' },
        { status: 400 }
      );
    }

    // Age validation
    const parsedAge = parseInt(age);
    if (isNaN(parsedAge) || parsedAge < 0 || parsedAge > 120) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid age between 0 and 120' },
        { status: 400 }
      );
    }

    // Date of birth validation
    const dob = new Date(dateOfBirth);
    if (isNaN(dob.getTime())) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid date of birth' },
        { status: 400 }
      );
    }

    // Check if date of birth is in the future
    const today = new Date();
    if (dob > today) {
      return NextResponse.json(
        { success: false, message: 'Date of birth cannot be in the future' },
        { status: 400 }
      );
    }

    // Gender validation
    if (!['Male', 'Female', 'Other'].includes(gender)) {
      return NextResponse.json(
        { success: false, message: 'Please select a valid gender' },
        { status: 400 }
      );
    }

    // Phone number validation (basic)
    if (!validator.isMobilePhone(trimmedCellPhone, 'any')) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid phone number' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: trimmedEmail });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'An account with this email already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const user = await User.create({
      firstName: trimmedFirstName,
      lastName: trimmedLastName,
      email: trimmedEmail,
      gender,
      healthcareProvince: trimmedHealthcareProvince,
      healthcareNumber: trimmedHealthcareNumber,
      age: parsedAge,
      dateOfBirth: dob,
      cellPhone: trimmedCellPhone,
      address: trimmedAddress,
      country: trimmedCountry,
      postalCode: trimmedPostalCode,
      password
    });

    // Generate JWT token
    const token = signToken(user._id);

    // Return success response with user data (excluding password)
    return NextResponse.json({
      success: true,
      message: 'Registration successful!',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        gender: user.gender,
        healthcareProvince: user.healthcareProvince,
        healthcareNumber: user.healthcareNumber,
        age: user.age,
        dateOfBirth: user.dateOfBirth,
        cellPhone: user.cellPhone,
        address: user.address,
        country: user.country,
        postalCode: user.postalCode,
        createdAt: user.createdAt
      }
    }, {
      status: 201
    });

  } catch (error) {
    console.error('💥 Registration error:', error);
    
    // Handle specific MongoDB errors
    if (error.name === 'MongoServerError' && error.code === 11000) {
      return NextResponse.json(
        { success: false, message: 'Email already exists. Please use a different email.' },
        { status: 400 }
      );
    }
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { success: false, message: errors.join(', ') },
        { status: 400 }
      );
    }

    // Handle general errors
    return NextResponse.json(
      { 
        success: false, 
        message: 'An error occurred during registration. Please try again.' 
      },
      { status: 500 }
    );
  }
}