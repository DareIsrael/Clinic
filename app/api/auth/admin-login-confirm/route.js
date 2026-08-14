import { NextResponse } from 'next/server';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dbConnect from '@/utils/db';
import User from '@/models/User';
import { createRateLimiter, getClientIp } from '@/utils/rateLimiter';

// 5 attempts per 15 minutes per IP
const limiter = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 5 });

export async function POST(request) {
    try {
        // --- Rate limiting ---
        const ip = getClientIp(request);
        const rateCheck = limiter.check(ip);
        if (!rateCheck.allowed) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Too many attempts. Please try again in ${rateCheck.retryAfterMinutes} minutes.`,
                },
                { status: 429 }
            );
        }

        await dbConnect();

        const { code, email } = await request.json();

        if (!code || !email) {
            return NextResponse.json(
                { success: false, message: 'Verification code and email are required.' },
                { status: 400 }
            );
        }

        // Validate that code is a 6-digit numeric string
        const trimmedCode = String(code).trim();
        if (!/^\d{6}$/.test(trimmedCode)) {
            return NextResponse.json(
                { success: false, message: 'Invalid verification code format.' },
                { status: 400 }
            );
        }

        // Hash the code to compare with the stored hash
        const hashedCode = crypto.createHash('sha256').update(trimmedCode).digest('hex');

        // Find user with matching hashed code and non-expired timestamp
        const user = await User.findOne({
            email: email.trim().toLowerCase(),
            adminLoginToken: hashedCode,
            adminLoginTokenExpires: { $gt: new Date() },
        });

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'Invalid or expired verification code. Please request a new one.' },
                { status: 401 }
            );
        }

        // Clear the code so it can't be reused
        user.adminLoginToken = undefined;
        user.adminLoginTokenExpires = undefined;
        await user.save({ validateBeforeSave: false });

        // Successful confirmation — reset rate limit
        limiter.reset(ip);

        // Generate a short-lived JWT that the client will use to
        // authenticate via the next-auth credentials provider
        const loginToken = jwt.sign(
            { userId: user._id.toString(), purpose: 'admin-login-confirm' },
            process.env.NEXTAUTH_SECRET,
            { expiresIn: '2m' }
        );

        return NextResponse.json({
            success: true,
            loginToken,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Admin login confirm error:', error);
        return NextResponse.json(
            { success: false, message: 'An error occurred. Please try again.' },
            { status: 500 }
        );
    }
}
