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

        const { token, email } = await request.json();

        if (!token || !email) {
            return NextResponse.json(
                { success: false, message: 'Invalid confirmation link.' },
                { status: 400 }
            );
        }

        // Hash the raw token to compare with the stored hash
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        // Find user with matching token and non-expired timestamp
        const user = await User.findOne({
            email: email.trim().toLowerCase(),
            adminLoginToken: hashedToken,
            adminLoginTokenExpires: { $gt: new Date() },
        });

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'Invalid or expired confirmation link. Please log in again.' },
                { status: 401 }
            );
        }

        // Clear the token so it can't be reused
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
