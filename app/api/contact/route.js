import { NextResponse } from 'next/server';
import { sendEmail } from '@/utils/emailService';

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email content for admin
    const adminEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background: linear-gradient(135deg, #0369a1, #0ea5e9); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">New Contact Form Submission</h1>
        </div>
        
        <div style="padding: 30px; background: #f8fafc;">
          <p style="font-size: 18px; font-weight: bold; color: #0369a1; margin-bottom: 20px;">
            You have received a new message from your clinic website:
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #0369a1; margin: 20px 0;">
            <h3 style="color: #0369a1; margin-top: 0;">Contact Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5; font-weight: bold; width: 120px;">Name:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;">
                  <a href="mailto:${email}" style="color: #0369a1; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5; font-weight: bold;">Subject:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;">${subject}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message:</td>
                <td style="padding: 8px 0;">${message.replace(/\n/g, '<br>')}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: #e6f3ff; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0; color: #0369a1; font-size: 14px;">
              <strong>Submission Time:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="mailto:${email}" 
               style="background-color: #0369a1; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 6px; display: inline-block;
                      font-weight: bold; font-size: 16px;">
              Reply to ${name}
            </a>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;">
          
          <div style="text-align: center; color: #666; font-size: 14px;">
            <p>St Mary Rideau Clinic Contact Form<br>
            This is an automated message from your website contact form.</p>
          </div>
        </div>
      </div>
    `;

    // Send email to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'contact@stmaryrideauclinic.com', // Set this in your .env
      subject: `New Contact Form: ${subject} - From ${name}`,
      html: adminEmailContent,
    });

    // Optional: Send confirmation email to user
    const userEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background: linear-gradient(135deg, #0369a1, #0ea5e9); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Thank You for Contacting Us</h1>
        </div>
        
        <div style="padding: 30px; background: #f8fafc;">
          <p>Dear <strong>${name}</strong>,</p>
          
          <p>Thank you for reaching out to St Mary Rideau Clinic. We have received your message and will get back to you within 24 hours.</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #0369a1; margin: 20px 0;">
            <h3 style="color: #0369a1; margin-top: 0;">Your Message Summary:</h3>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong> ${message}</p>
          </div>
          
          <p>If this is a medical emergency, please call 911 or visit your nearest emergency department immediately.</p>
          
          <p>Best regards,<br>
          <strong>The St Mary Rideau Clinic Team</strong></p>
        </div>
      </div>
    `;

    // Send confirmation to user
    await sendEmail({
      to: email,
      subject: 'Thank You for Contacting St Mary Rideau Clinic',
      html: userEmailContent,
    });

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message' },
      { status: 500 }
    );
  }
}