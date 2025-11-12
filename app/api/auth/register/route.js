import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import User from '@/models/User';
import { sendEmail } from '@/utils/emailService';

export async function POST(req) {
  try {
    await dbConnect();
    
    const { 
      firstName, 
      lastName, 
      email, 
      password, 
      cellPhone, 
      dateOfBirth, 
      gender, 
      healthcareNumber, 
      healthcareProvince, 
      address, 
      country, 
      postalCode 
    } = await req.json();

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'First name, last name, email, and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User already exists with this email' },
        { status: 400 }
      );
    }

    // Calculate age from date of birth
    const calculateAge = (birthDate) => {
      if (!birthDate) return null;
      const today = new Date();
      const birth = new Date(birthDate);
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      return age;
    };

    const age = calculateAge(dateOfBirth);

    // FIX: Remove manual hashing - let the User model handle it
    // Create user with plain password - the pre('save') hook will hash it
    const user = await User.create({
      firstName,
      lastName,
      email: email.trim().toLowerCase(),
      password: password, // Pass plain password - model will hash it
      cellPhone,
      dateOfBirth,
      gender,
      healthcareNumber,
      healthcareProvince,
      address,
      country,
      postalCode,
      age,
      role: 'patient'
    });

    console.log('🆕 New user created - Password automatically hashed by model');
    console.log('📧 Email:', user.email);
    console.log('🔐 Hashed password stored:', user.password.substring(0, 20) + '...');

    // Send welcome email (don't await to avoid blocking response)
    sendWelcomeEmail(user).catch(error => {
      console.error('Failed to send welcome email:', error);
    });

    return NextResponse.json({
      success: true,
      message: 'Registration successful! Welcome email sent.',
      user: {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error during registration' },
      { status: 500 }
    );
  }
}

// Welcome email function (keep your existing one)
async function sendWelcomeEmail(user) {
  try {
    const welcomeEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background: linear-gradient(135deg, #0369a1, #0ea5e9); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to St Mary Rideau Clinic!</h1>
        </div>
        
        <div style="padding: 30px; background: #f8fafc;">
          <p>Dear <strong>${user.firstName} ${user.lastName}</strong>,</p>
          
          <p>Welcome to St Mary Rideau Clinic! We're thrilled to have you as our new patient.</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #0369a1; margin: 20px 0;">
            <h3 style="color: #0369a1; margin-top: 0;">Your Account Details:</h3>
            <p><strong>Name:</strong> ${user.firstName} ${user.lastName}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Account Created:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          
          <p>With your patient portal account, you can:</p>
          <ul>
            <li>Book appointments online</li>
            <li>Follow up your appointments</li>
          </ul>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXTAUTH_URL}/login" 
               style="background-color: #0369a1; color: white; padding: 14px 28px; 
                      text-decoration: none; border-radius: 6px; display: inline-block;
                      font-weight: bold; font-size: 16px;">
              Login to Your Patient Portal
            </a>
          </div>
          
          <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
          
          <p>Best regards,<br>
          <strong>The St Mary Rideau Clinic Team</strong></p>
          
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;">
          
          <div style="text-align: center; color: #666; font-size: 14px;">
            <p>St Mary Rideau Clinic<br>
             158 Rideau Street, Ottawa K1N5X6<br>
            Phone: (613) 301-8805 | Email: contact@stmaryrideauclinic.com</p>
            
            <p style="font-size: 12px; color: #999;">
              This is an automated message. Please do not reply to this email.
            </p>
          </div>
        </div>
      </div>
    `;

    await sendEmail({
      to: user.email,
      subject: `Welcome to St Mary Rideau Clinic, ${user.firstName}!`,
      html: welcomeEmailContent,
    });
    
    console.log('Welcome email sent successfully to:', user.email);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
}