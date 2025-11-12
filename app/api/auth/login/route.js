// import { login } from '@/controllers/authController';

// export async function POST(request) {
//   return login(request);
// }



import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import User from '@/models/User';
import { signToken } from '@/utils/auth';

export async function POST(request) {
  try {
    // console.log('🔐 Login API route called');
    await dbConnect();
    
    const { email, password } = await request.json();
    // console.log('📧 Login attempt for:', email);

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Find user and include password field
    const user = await User.findOne({ email: trimmedEmail }).select('+password');
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordCorrect = await user.correctPassword(password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate token
    const token = signToken(user._id);

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Login successful!',
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
    });

  } catch (error) {
    console.error('💥 Login error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'An error occurred during login. Please try again.' 
      },
      { status: 500 }
    );
  }
}

// import { NextResponse } from 'next/server';
// import { login } from '@/controllers/authController';

// export async function POST(request) {
//   try {
//     const credentials = await request.json();
//     const result = await login(credentials);

//     if (!result.success) {
//       return NextResponse.json(
//         { message: result.message },
//         { status: result.status }
//       );
//     }

//     return NextResponse.json(result.data);
//   } catch (error) {
//     console.error('Login route error:', error);
//     return NextResponse.json(
//       { message: 'Server error' },
//       { status: 500 }
//     );
//   }
// }