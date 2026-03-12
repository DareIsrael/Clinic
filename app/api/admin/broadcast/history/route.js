import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import BroadcastMessage from '@/models/BroadcastMessage';

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
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 15;
        const type = searchParams.get('type'); // 'waitlist' or 'appointment'

        const skip = (page - 1) * limit;

        const query = {};
        if (type && type !== 'all') {
            query.type = type;
        }

        const [messages, total] = await Promise.all([
            BroadcastMessage.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            BroadcastMessage.countDocuments(query),
        ]);

        return NextResponse.json({
            success: true,
            messages,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Broadcast history error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch broadcast history' },
            { status: 500 }
        );
    }
}
