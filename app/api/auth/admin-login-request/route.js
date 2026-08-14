import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/utils/db';
import User from '@/models/User';
import { sendEmail } from '@/utils/emailService';
import { createRateLimiter, getClientIp } from '@/utils/rateLimiter';

// 3 attempts per 15 minutes per IP (same policy as the main login)
const limiter = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 3 });

export async function POST(request) {
  try {
    // --- Rate limiting ---
    const ip = getClientIp(request);
    const rateCheck = limiter.check(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many login attempts. Please try again in ${rateCheck.retryAfterMinutes} minutes.`,
        },
        { status: 429 }
      );
    }

    await dbConnect();

    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Find user with password field
    const user = await User.findOne({ email: trimmedEmail }).select('+password');

    if (!user) {
      // Return a generic message — don't reveal whether the account exists
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordCorrect = await user.correctPassword(password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Successful credential check — reset rate limit for this IP
    limiter.reset(ip);

    // If NOT an admin, tell the client to proceed with normal login.
    // IMPORTANT: The response shape is identical to the admin case
    // so an attacker can't distinguish admin from non-admin accounts.
    if (!['admin', 'doctor'].includes(user.role)) {
      return NextResponse.json({
        success: true,
        requiresConfirmation: false,
      });
    }

    // --- Admin flow: generate a secure 6-digit verification code ---
    const rawCode = crypto.randomInt(100000, 999999).toString();
    const hashedCode = crypto.createHash('sha256').update(rawCode).digest('hex');

    // Save hashed code and 10-minute expiry
    user.adminLoginToken = hashedCode;
    user.adminLoginTokenExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save({ validateBeforeSave: false });

    // Send verification code email
    await sendEmail({
      to: trimmedEmail,
      subject: 'Your Login Verification Code — St Mary Rideau Clinic',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0284c7; margin-bottom: 5px;">St Mary Rideau Clinic</h1>
            <p style="color: #6b7280; font-size: 14px;">Admin Login Verification</p>
          </div>
          
          <div style="background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
            <p style="color: #1e293b; font-size: 16px; margin-bottom: 16px;">
              Hello <strong>${user.firstName}</strong>,
            </p>
            <p style="color: #475569; font-size: 14px; margin-bottom: 20px;">
              A login attempt was made to the admin dashboard. If this was you, enter the verification code below to complete your login.
            </p>
            <div style="text-align: center; margin: 24px 0;">
              <div style="background-color: #ffffff; border: 2px solid #0284c7; border-radius: 12px; padding: 20px 32px; display: inline-block;">
                <span style="font-family: 'Courier New', monospace; font-size: 36px; font-weight: 700; letter-spacing: 12px; color: #0284c7;">
                  ${rawCode}
                </span>
              </div>
            </div>
            <p style="color: #94a3b8; font-size: 12px; text-align: center;">
              This code expires in <strong>10 minutes</strong>.
            </p>
          </div>

          <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <p style="color: #991b1b; font-size: 13px; margin: 0;">
              ⚠️ If you did not attempt to log in, please ignore this email. Your account is still secure.
            </p>
          </div>
          
          <p style="color: #94a3b8; font-size: 12px; text-align: center;">
            Do not share this code with anyone. St Mary Rideau Clinic staff will never ask for your verification code.
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      requiresConfirmation: true,
      message: 'A verification code has been sent to your email.',
    });
  } catch (error) {
    console.error('Admin login request error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
