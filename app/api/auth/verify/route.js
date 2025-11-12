import { NextResponse } from 'next/server';
import { verifyToken } from '@/utils/auth';

export async function GET(request) {
  try {
    const user = await verifyToken(request);
    
    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid token' },
      { status: 401 }
    );
  }
}