import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import Waitlist from '@/models/Waitlist';

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      gender,
      healthcareProvince,
      healthcareNumber,
      dateOfBirth,
      cellPhone,
      address,
      country,
      postalCode
    } = body;

    // Basic validation
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { success: false, message: 'First name, last name, and email are required' },
        { status: 400 }
      );
    }

    // Get current waitlist count for position
    const waitlistCount = await Waitlist.countDocuments({ status: 'Active' });

    // Create waitlist entry - Everyone starts as Active
    const waitlistEntry = await Waitlist.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      gender,
      healthcareProvince,
      healthcareNumber,
      dateOfBirth,
      cellPhone,
      address,
      country,
      postalCode,
    //   position: waitlistCount + 1,
      status: 'Active' // Everyone starts as Active
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully joined waitlist! We will contact you when spots become available.',
      data: {
        id: waitlistEntry._id,
        firstName: waitlistEntry.firstName,
        // position: waitlistEntry.position
      }
    });

  } catch (error) {
    console.error('Waitlist join error:', error);
    
    // Handle duplicate email error
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: 'This email is already on our waitlist!' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to join waitlist. Please try again.' },
      { status: 500 }
    );
  }
}