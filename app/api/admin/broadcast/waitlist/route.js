import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import Waitlist from '@/models/Waitlist';
import BroadcastMessage from '@/models/BroadcastMessage';
import { createRateLimiter, getClientIp } from '@/utils/rateLimiter';
import { sendEmailsInBatches, escapeHtml, isValidEmail } from '@/utils/batchEmailSender';

// 5 broadcast requests per 15 minutes per IP
const limiter = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 5 });

export async function POST(request) {
    try {
        // Auth check
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json(
                { success: false, message: 'Admin access required' },
                { status: 403 }
            );
        }

        // Rate limit
        const ip = getClientIp(request);
        const rateCheck = limiter.check(ip);
        if (!rateCheck.allowed) {
            return NextResponse.json(
                { success: false, message: `Too many requests. Try again in ${rateCheck.retryAfterMinutes} minutes.` },
                { status: 429 }
            );
        }

        await dbConnect();

        const { subject, message, statusFilter, targetEmail } = await request.json();

        // --- Input validation ---
        if (!subject || !message) {
            return NextResponse.json(
                { success: false, message: 'Subject and message are required' },
                { status: 400 }
            );
        }

        if (subject.length > 200) {
            return NextResponse.json(
                { success: false, message: 'Subject must be 200 characters or less' },
                { status: 400 }
            );
        }

        if (message.length > 5000) {
            return NextResponse.json(
                { success: false, message: 'Message must be 5000 characters or less' },
                { status: 400 }
            );
        }

        if (targetEmail && !isValidEmail(targetEmail.trim())) {
            return NextResponse.json(
                { success: false, message: 'Invalid email address format' },
                { status: 400 }
            );
        }

        // --- Resolve recipients ---
        let recipientEmails = [];

        if (targetEmail) {
            const entry = await Waitlist.findOne({ email: targetEmail.trim().toLowerCase() }).lean();
            if (!entry) {
                return NextResponse.json(
                    { success: false, message: 'Email address not found in the waitlist' },
                    { status: 404 }
                );
            }
            recipientEmails = [entry.email];
        } else {
            const query = {};
            if (statusFilter && statusFilter !== 'all') {
                query.status = statusFilter;
            }
            const entries = await Waitlist.find(query).select('email').lean();
            recipientEmails = [...new Set(entries.map(e => e.email.toLowerCase()))];
        }

        if (recipientEmails.length === 0) {
            return NextResponse.json(
                { success: false, message: 'No recipients found matching your criteria' },
                { status: 404 }
            );
        }

        // --- Build sanitized email HTML ---
        const safeSubject = escapeHtml(subject);
        const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

        const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #0284c7; margin-bottom: 5px;">St Mary Rideau Clinic</h1>
        </div>
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px;">
          <h2 style="color: #1e293b; margin-top: 0;">${safeSubject}</h2>
          <div style="color: #475569; font-size: 15px; line-height: 1.7;">${safeMessage}</div>
        </div>
        <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 24px;">
          St Mary Rideau Clinic — This email was sent to you because you are on our waitlist.
        </p>
      </div>
    `;

        // --- Send in batches ---
        const emails = recipientEmails.map(email => ({
            to: email,
            subject,
            html: emailHtml,
        }));

        const result = await sendEmailsInBatches(emails);

        // --- Save to history ---
        await BroadcastMessage.create({
            type: 'waitlist',
            subject,
            message,
            statusFilter: statusFilter || 'all',
            targetEmail: targetEmail ? targetEmail.trim().toLowerCase() : undefined,
            recipientCount: recipientEmails.length,
            sent: result.sent,
            failed: result.failed,
            sentBy: session.user.email,
        });

        return NextResponse.json({
            success: true,
            message: `Email sent to ${result.sent} recipient(s)${result.failed > 0 ? `. ${result.failed} failed.` : '.'}`,
            sent: result.sent,
            failed: result.failed,
            total: recipientEmails.length,
        });
    } catch (error) {
        console.error('Waitlist broadcast error:', error);
        return NextResponse.json(
            { success: false, message: 'An error occurred while sending emails' },
            { status: 500 }
        );
    }
}

// GET: Preview recipient count
export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json(
                { success: false, message: 'Admin access required' },
                { status: 403 }
            );
        }

        await dbConnect();

        const { searchParams } = new URL(request.url);
        const statusFilter = searchParams.get('statusFilter');

        const query = {};
        if (statusFilter && statusFilter !== 'all') {
            query.status = statusFilter;
        }

        const count = await Waitlist.countDocuments(query);

        return NextResponse.json({ success: true, count });
    } catch (error) {
        console.error('Waitlist preview error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to preview recipients' },
            { status: 500 }
        );
    }
}
