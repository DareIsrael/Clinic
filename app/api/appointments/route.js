
import { NextResponse } from 'next/server';
import { appointmentService } from '@/services/appointmentService';
import dbConnect from '@/utils/db';
import { sendEmail } from '@/utils/emailService';

// Updated email function - only sends confirmation email
async function sendAppointmentConfirmationEmail(appointment) {
  try {
    const appointmentDate = new Date(appointment.appointmentDate);
    const formattedDate = appointment.appointmentDate;

    const emailSubject = `Appointment Confirmed - ${appointment.firstName} ${appointment.lastName}`;
    
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #059669; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f0fdf4; padding: 30px; border-radius: 0 0 8px 8px; }
          .details { background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #bbf7d0; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
          .highlight { color: #059669; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Appointment Confirmed</h1>
          </div>
          <div class="content">
            <p>Dear <span class="highlight">${appointment.firstName} ${appointment.lastName}</span>,</p>
            
            <p>Your appointment has been confirmed. Here are your appointment details:</p>
            
            <div class="details">
              <p><strong>Appointment Date:</strong> ${formattedDate}</p>
              <p><strong>Appointment Time:</strong> ${appointment.appointmentTime}</p>
              <p><strong>Reason for Visit:</strong> ${appointment.reason}</p>
            </div>
            
            <p><strong>Location:</strong><br>
            St Mary Rideau Clinic<br>
            158 Rideau Street,<br>
            Ottawa, K1N 5X6</p>
            
            <p><strong>Important Reminders:</strong></p>
            <ul>
              <li>Please arrive <span class="highlight">15 minutes</span> before your scheduled appointment time</li>
              <li>Bring your healthcare card and photo ID</li>
              <li>Bring your provincial healthcare information</li>
              <li>Bring any relevant medical records or test results</li>
            </ul>
            
            <p>If you need to cancel or reschedule your appointment, please call us at least 24 hours in advance at <strong>(343) 887-3470</strong>.</p>
            
            <div class="footer">
              <p>We look forward to seeing you soon!</p>
              <p>Best regards,<br>The Healthcare Team</p>
              <p>St Mary Rideau Clinic<br>
              Phone: (343) 887-3470<br>
              Email: contact@stmaryrideauclinic.com</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send the email
    await sendEmail({
      to: appointment.email,
      subject: emailSubject,
      html: emailHtml
    });

    return true;
  } catch (error) {
    console.error('Error sending appointment email:', error);
    return false;
  }
}

// GET - Get available slots for a date or clinic info
export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    
    if (!date) {
      // Return clinic info if no date specified
      const schedule = appointmentService.getClinicSchedule();
      const availableDates = await appointmentService.getAvailableDates();
      
      return NextResponse.json({
        success: true,
        clinicSchedule: schedule,
        availableDates: availableDates
      });
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return NextResponse.json(
        { success: false, message: 'Date must be in YYYY-MM-DD format' },
        { status: 400 }
      );
    }

    const slots = await appointmentService.getAvailableSlots(date);
    
    return NextResponse.json({
      success: true,
      date,
      slots
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// POST - Book a new appointment
export async function POST(request) {
  try {
    await dbConnect();
    
    const data = await request.json();
    
    // Validate required fields (removed appointmentType)
    const requiredFields = [
      'firstName', 'lastName', 'email', 'gender', 'healthcareProvince',
      'healthcareNumber', 'dateOfBirth', 'cellPhone', 'address',
      'country', 'postalCode', 'appointmentDate', 'appointmentTime', 'reason'
    ];

    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }

    const result = await appointmentService.bookAppointment(data);
    
    if (result.success) {
      // Send booking confirmation email
      try {
        const appointment = await appointmentService.getAppointmentByEmailAndDate(
          data.email,
          data.appointmentDate,
          data.appointmentTime
        );
        
        if (appointment) {
          await sendAppointmentConfirmationEmail(appointment);
        }
      } catch (emailError) {
        console.error('Failed to send booking confirmation email:', emailError);
        // Don't fail the whole request if email fails
      }
      
      return NextResponse.json(result, { status: 201 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update appointment status (removed email notifications for status changes)
export async function PUT(request) {
  try {
    await dbConnect();
    
    const data = await request.json();
    const { appointmentId, status, reason } = data;
    
    if (!appointmentId || !status) {
      return NextResponse.json(
        { success: false, message: 'appointmentId and status are required' },
        { status: 400 }
      );
    }

    let updatedAppointment;
    
    if (status === 'cancelled') {
      updatedAppointment = await appointmentService.cancelAppointment(appointmentId, reason);
    } else {
      updatedAppointment = await appointmentService.updateAppointmentStatus(appointmentId, status);
    }
    
    if (!updatedAppointment) {
      return NextResponse.json(
        { success: false, message: 'Appointment not found' },
        { status: 404 }
      );
    }

    // NO EMAIL NOTIFICATIONS FOR STATUS CHANGES - Only send confirmation email on booking

    return NextResponse.json({
      success: true,
      appointment: updatedAppointment,
      message: 'Appointment updated successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}