// import validator from 'validator';
// import User from '@/models/User';
// import { signToken } from '@/utils/auth';
// import dbConnect from '@/utils/db';

// export async function register(req) {
//   try {
//     // Connect to database first
//     await dbConnect();
    
//     const body = await req.json();
    
//     const {
//       firstName,
//       lastName,
//       email,
//       gender,
//       healthcareProvince,
//       healthcareNumber,
//       age,
//       dateOfBirth,
//       cellPhone,
//       address,
//       country,
//       postalCode,
//       password,
//       confirmPassword
//     } = body;

//     // Validation
//     if (!firstName || !lastName || !email || !gender || !healthcareProvince || 
//         !healthcareNumber || !age || !dateOfBirth || !cellPhone || !address || 
//         !country || !postalCode || !password || !confirmPassword) {
//       return Response.json(
//         { success: false, message: 'All fields are required' },
//         { status: 400 }
//       );
//     }

//     if (!validator.isEmail(email)) {
//       return Response.json(
//         { success: false, message: 'Please provide a valid email' },
//         { status: 400 }
//       );
//     }

//     if (password !== confirmPassword) {
//       return Response.json(
//         { success: false, message: 'Passwords do not match' },
//         { status: 400 }
//       );
//     }

//     if (password.length < 8) {
//       return Response.json(
//         { success: false, message: 'Password must be at least 8 characters long' },
//         { status: 400 }
//       );
//     }

//     // Check if user exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return Response.json(
//         { success: false, message: 'User already exists with this email' },
//         { status: 400 }
//       );
//     }

//     // Create user - first user becomes admin
//     const userCount = await User.countDocuments();
//     const role = userCount === 0 ? 'admin' : 'patient';

//     const user = await User.create({
//       firstName,
//       lastName,
//       email,
//       gender,
//       healthcareProvince,
//       healthcareNumber,
//       age,
//       dateOfBirth: new Date(dateOfBirth),
//       cellPhone,
//       address,
//       country,
//       postalCode,
//       password,
//       role
//     });

//     // Generate token
//     const token = signToken(user._id);

//     return Response.json({
//       success: true,
//       token,
//       user: {
//         id: user._id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         role: user.role
//       }
//     });

//   } catch (error) {
//     console.error('Registration error:', error);
    
//     // More specific error messages
//     if (error.name === 'MongoServerError' && error.code === 11000) {
//       return Response.json(
//         { success: false, message: 'Email already exists' },
//         { status: 400 }
//       );
//     }
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(err => err.message);
//       return Response.json(
//         { success: false, message: errors.join(', ') },
//         { status: 400 }
//       );
//     }

//     return Response.json(
//       { success: false, message: 'Server error during registration: ' + error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function login(req) {
//   try {
//     // Connect to database first
//     await dbConnect();
    
//     const body = await req.json();
//     const { email, password } = body;

//     if (!email || !password) {
//       return Response.json(
//         { success: false, message: 'Email and password are required' },
//         { status: 400 }
//       );
//     }

//     // Find user and include password
//     const user = await User.findOne({ email }).select('+password');
    
//     if (!user) {
//       return Response.json(
//         { success: false, message: 'No user found with this email' },
//         { status: 401 }
//       );
//     }

//     if (!(await user.correctPassword(password, user.password))) {
//       return Response.json(
//         { success: false, message: 'Invalid password' },
//         { status: 401 }
//       );
//     }

//     // Generate token
//     const token = signToken(user._id);

//     return Response.json({
//       success: true,
//       token,
//       user: {
//         id: user._id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         role: user.role
//       }
//     });

//   } catch (error) {
//     console.error('Login error:', error);
//     return Response.json(
//       { success: false, message: 'Server error during login: ' + error.message },
//       { status: 500 }
//     );
//   }
// }







// working///////////


// import validator from 'validator';
// import User from '@/models/User';
// import { signToken } from '@/utils/auth';
// import dbConnect from '@/utils/db';
// import { NextResponse } from 'next/server';

// export async function register(req) {
//   try {
//     // Connect to database first
//     await dbConnect();
    
//     const body = await req.json();
    
//     const {
//       firstName,
//       lastName,
//       email,
//       gender,
//       healthcareProvince,
//       healthcareNumber,
//       age,
//       dateOfBirth,
//       cellPhone,
//       address,
//       country,
//       postalCode,
//       password,
//       confirmPassword
//     } = body;

//     // Trim all string inputs
//     const trimmedFirstName = firstName?.trim();
//     const trimmedLastName = lastName?.trim();
//     const trimmedEmail = email?.trim().toLowerCase();
//     const trimmedHealthcareProvince = healthcareProvince?.trim();
//     const trimmedHealthcareNumber = healthcareNumber?.trim();
//     const trimmedCellPhone = cellPhone?.trim();
//     const trimmedAddress = address?.trim();
//     const trimmedCountry = country?.trim();
//     const trimmedPostalCode = postalCode?.trim();

//     // Validation - Check all required fields
//     if (!trimmedFirstName || !trimmedLastName || !trimmedEmail || !gender || 
//         !trimmedHealthcareProvince || !trimmedHealthcareNumber || !age || 
//         !dateOfBirth || !trimmedCellPhone || !trimmedAddress || !trimmedCountry || 
//         !trimmedPostalCode || !password || !confirmPassword) {
//       return NextResponse.json(
//         { success: false, message: 'All fields are required' },
//         { status: 400 }
//       );
//     }

//     // Email validation
//     if (!validator.isEmail(trimmedEmail)) {
//       return NextResponse.json(
//         { success: false, message: 'Please provide a valid email address' },
//         { status: 400 }
//       );
//     }

//     // Password validation
//     if (password.length < 8) {
//       return NextResponse.json(
//         { success: false, message: 'Password must be at least 8 characters long' },
//         { status: 400 }
//       );
//     }

//     if (password !== confirmPassword) {
//       return NextResponse.json(
//         { success: false, message: 'Passwords do not match' },
//         { status: 400 }
//       );
//     }

//     // Age validation
//     const parsedAge = parseInt(age);
//     if (isNaN(parsedAge) || parsedAge < 0 || parsedAge > 120) {
//       return NextResponse.json(
//         { success: false, message: 'Please provide a valid age between 0 and 120' },
//         { status: 400 }
//       );
//     }

//     // Date of birth validation
//     const dob = new Date(dateOfBirth);
//     if (isNaN(dob.getTime())) {
//       return NextResponse.json(
//         { success: false, message: 'Please provide a valid date of birth' },
//         { status: 400 }
//       );
//     }

//     // Check if date of birth is in the future
//     const today = new Date();
//     if (dob > today) {
//       return NextResponse.json(
//         { success: false, message: 'Date of birth cannot be in the future' },
//         { status: 400 }
//       );
//     }

//     // Gender validation
//     if (!['Male', 'Female', 'Other'].includes(gender)) {
//       return NextResponse.json(
//         { success: false, message: 'Please select a valid gender' },
//         { status: 400 }
//       );
//     }

//     // Phone number validation (basic)
//     if (!validator.isMobilePhone(trimmedCellPhone, 'any')) {
//       return NextResponse.json(
//         { success: false, message: 'Please provide a valid phone number' },
//         { status: 400 }
//       );
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email: trimmedEmail });
//     if (existingUser) {
//       return NextResponse.json(
//         { success: false, message: 'An account with this email already exists' },
//         { status: 400 }
//       );
//     }

//     // Create new user
//     const user = await User.create({
//       firstName: trimmedFirstName,
//       lastName: trimmedLastName,
//       email: trimmedEmail,
//       gender,
//       healthcareProvince: trimmedHealthcareProvince,
//       healthcareNumber: trimmedHealthcareNumber,
//       age: parsedAge,
//       dateOfBirth: dob,
//       cellPhone: trimmedCellPhone,
//       address: trimmedAddress,
//       country: trimmedCountry,
//       postalCode: trimmedPostalCode,
//       password
//       // Role will automatically be 'patient' from schema default
//     });

//     // Generate JWT token
//     const token = signToken(user._id);

//     // Return success response with user data (excluding password)
//     return NextResponse.json({
//       success: true,
//       message: 'Registration successful!',
//       token,
//       user: {
//         id: user._id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         role: user.role,
//         gender: user.gender,
//         healthcareProvince: user.healthcareProvince,
//         healthcareNumber: user.healthcareNumber,
//         age: user.age,
//         dateOfBirth: user.dateOfBirth,
//         cellPhone: user.cellPhone,
//         address: user.address,
//         country: user.country,
//         postalCode: user.postalCode,
//         createdAt: user.createdAt
//       }
//     }, {
//       status: 201
//     });

//   } catch (error) {
//     console.error('Registration error:', error);
    
//     // Handle specific MongoDB errors
//     if (error.name === 'MongoServerError' && error.code === 11000) {
//       return NextResponse.json(
//         { success: false, message: 'Email already exists. Please use a different email.' },
//         { status: 400 }
//       );
//     }
    
//     // Handle Mongoose validation errors
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(err => err.message);
//       return NextResponse.json(
//         { success: false, message: errors.join(', ') },
//         { status: 400 }
//       );
//     }

//     // Handle general errors
//     return NextResponse.json(
//       { 
//         success: false, 
//         message: 'An error occurred during registration. Please try again.' 
//       },
//       { status: 500 }
//     );
//   }
// }


// export async function login(req) {
//   try {
//     // Connect to database first
//     await dbConnect();
    
//     const body = await req.json();
//     const { email, password } = body;

//     // Validation
//     if (!email || !password) {
//       return NextResponse.json( // ✅ Fixed: Use NextResponse
//         { success: false, message: 'Email and password are required' },
//         { status: 400 }
//       );
//     }

//     const trimmedEmail = email.trim().toLowerCase();

//     // Find user and include password field
//     const user = await User.findOne({ email: trimmedEmail }).select('+password');
    
//     if (!user) {
//       return NextResponse.json( // ✅ Fixed: Use NextResponse
//         { success: false, message: 'Invalid email or password' },
//         { status: 401 }
//       );
//     }

//     // Check password - FIX THIS METHOD CALL
//     const isPasswordCorrect = await user.correctPassword(password, user.password);
//     if (!isPasswordCorrect) {
//       return NextResponse.json( // ✅ Fixed: Use NextResponse
//         { success: false, message: 'Invalid email or password' },
//         { status: 401 }
//       );
//     }

//     // Generate token
//     const token = signToken(user._id);

//     // Return success response
//     return NextResponse.json({
//       success: true,
//       message: 'Login successful!',
//       token,
//       user: {
//         id: user._id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         role: user.role,
//         gender: user.gender,
//         healthcareProvince: user.healthcareProvince,
//         healthcareNumber: user.healthcareNumber,
//         age: user.age,
//         dateOfBirth: user.dateOfBirth,
//         cellPhone: user.cellPhone,
//         address: user.address,
//         country: user.country,
//         postalCode: user.postalCode,
//         createdAt: user.createdAt
//       }
//     });

//   } catch (error) {
//     console.error('Login error:', error);
//     return NextResponse.json(
//       { 
//         success: false, 
//         message: 'An error occurred during login. Please try again.' 
//       },
//       { status: 500 }
//     );
//   }
// }











// export async function login(req) {
//   try {
//     // Connect to database first
//     await dbConnect();
    
//     const body = await req.json();
//     const { email, password } = body;

//     // Validation
//     if (!email || !password) {
//       return NextResponse.json(
//         { success: false, message: 'Email and password are required' },
//         { status: 400 }
//       );
//     }

//     const trimmedEmail = email.trim().toLowerCase();

//     // Find user and include password field
//     const user = await User.findOne({ email: trimmedEmail }).select('+password');
    
//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: 'Invalid email or password' },
//         { status: 401 }
//       );
//     }

//     // Check password
//     if (!(await user.correctPassword(password, user.password))) {
//       return Response.json(
//         { success: false, message: 'Invalid email or password' },
//         { status: 401 }
//       );
//     }

//     // Generate token
//     const token = signToken(user._id);

//     // Return success response
//     return NextResponse.json({
//       success: true,
//       message: 'Login successful!',
//       token,
//       user: {
//         id: user._id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         role: user.role,
//         gender: user.gender,
//         healthcareProvince: user.healthcareProvince,
//         healthcareNumber: user.healthcareNumber,
//         age: user.age,
//         dateOfBirth: user.dateOfBirth,
//         cellPhone: user.cellPhone,
//         address: user.address,
//         country: user.country,
//         postalCode: user.postalCode,
//         createdAt: user.createdAt
//       }
//     });

//   } catch (error) {
//     console.error('Login error:', error);
//     return NextResponse.json(
//       { 
//         success: false, 
//         message: 'An error occurred during login. Please try again.' 
//       },
//       { status: 500 }
//     );
//   }
// }








// import validator from 'validator';
// import User from '@/models/User';
// import { signToken } from '@/utils/auth';
// import dbConnect from '@/utils/db';

// export async function register(req) {
//   try {
//     await dbConnect();
    
//     const body = await req.json();
    
//     const {
//       firstName,
//       lastName,
//       email,
//       gender,
//       healthcareProvince,
//       healthcareNumber,
//       age,
//       dateOfBirth,
//       cellPhone,
//       address,
//       country,
//       postalCode,
//       password,
//       confirmPassword
//     } = body;

//     // Validation
//     if (!firstName || !lastName || !email || !gender || !healthcareProvince || 
//         !healthcareNumber || !age || !dateOfBirth || !cellPhone || !address || 
//         !country || !postalCode || !password || !confirmPassword) {
//       return Response.json(
//         { success: false, message: 'All fields are required' },
//         { status: 400 }
//       );
//     }

//     if (!validator.isEmail(email)) {
//       return Response.json(
//         { success: false, message: 'Please provide a valid email' },
//         { status: 400 }
//       );
//     }

//     if (password !== confirmPassword) {
//       return Response.json(
//         { success: false, message: 'Passwords do not match' },
//         { status: 400 }
//       );
//     }

//     if (password.length < 8) {
//       return Response.json(
//         { success: false, message: 'Password must be at least 8 characters long' },
//         { status: 400 }
//       );
//     }

//     // Check if user exists
//     const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
//     if (existingUser) {
//       return Response.json(
//         { success: false, message: 'User already exists with this email' },
//         { status: 400 }
//       );
//     }

//     // Create user - ALL new users are patients by default
//     const user = await User.create({
//       firstName: firstName.trim(),
//       lastName: lastName.trim(),
//       email: email.toLowerCase().trim(),
//       gender,
//       healthcareProvince: healthcareProvince.trim(),
//       healthcareNumber: healthcareNumber.trim(),
//       age: parseInt(age),
//       dateOfBirth: new Date(dateOfBirth),
//       cellPhone: cellPhone.trim(),
//       address: address.trim(),
//       country: country.trim(),
//       postalCode: postalCode.trim(),
//       password
//     });

//     // Generate token
//     const token = signToken(user._id);

//     return Response.json({
//       success: true,
//       token,
//       user: {
//         id: user._id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         role: user.role
//       }
//     });

//   } catch (error) {
//     console.error('Registration error:', error);
    
//     if (error.name === 'MongoServerError' && error.code === 11000) {
//       return Response.json(
//         { success: false, message: 'Email already exists' },
//         { status: 400 }
//       );
//     }
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(err => err.message);
//       return Response.json(
//         { success: false, message: errors.join(', ') },
//         { status: 400 }
//       );
//     }

//     return Response.json(
//       { success: false, message: 'Server error during registration' },
//       { status: 500 }
//     );
//   }
// }

// export async function login(req) {
//   try {
//     await dbConnect();
    
//     const body = await req.json();
//     const { email, password } = body;

//     if (!email || !password) {
//       return Response.json(
//         { success: false, message: 'Email and password are required' },
//         { status: 400 }
//       );
//     }

//     // Find user and include password
//     const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
    
//     if (!user) {
//       return Response.json(
//         { success: false, message: 'Invalid email or password' },
//         { status: 401 }
//       );
//     }

//     if (!(await user.correctPassword(password, user.password))) {
//       return Response.json(
//         { success: false, message: 'Invalid email or password' },
//         { status: 401 }
//       );
//     }

//     // Generate token
//     const token = signToken(user._id);

//     return Response.json({
//       success: true,
//       token,
//       user: {
//         id: user._id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         role: user.role
//       }
//     });

//   } catch (error) {
//     console.error('Login error:', error);
//     return Response.json(
//       { success: false, message: 'Server error during login' },
//       { status: 500 }
//     );
//   }
// }