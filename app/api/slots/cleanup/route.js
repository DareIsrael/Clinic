import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { appointmentService } from '@/services/appointmentService';
import dbConnect from '@/utils/db';

// Admin endpoint to cleanup past date slots
export async function POST(request) {
    try {
        // Check authentication and admin role
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { success: false, message: 'Authentication required' },
                { status: 401 }
            );
        }

        if (session.user.role !== 'admin') {
            return NextResponse.json(
                { success: false, message: 'Admin access required' },
                { status: 403 }
            );
        }

        await dbConnect();

        // Run cleanup
        const result = await appointmentService.cleanupPastSlots();

        return NextResponse.json(result);

    } catch (error) {
        console.error('Cleanup error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to cleanup past slots' },
            { status: 500 }
        );
    }
}
