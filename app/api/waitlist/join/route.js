// import { NextResponse } from 'next/server';
// import dbConnect from '@/utils/db';
// import Waitlist from '@/models/Waitlist';

// export async function POST(request) {
//   try {
//     await dbConnect();

//     const body = await request.json();
//     const {
//       firstName,
//       lastName,
//       email,
//       gender,
//       healthcareProvince,
//       healthcareNumber,
//       dateOfBirth,
//       cellPhone,
//       address,
//       country,
//       postalCode
//     } = body;

//     // Basic validation
//     if (!firstName || !lastName || !email) {
//       return NextResponse.json(
//         { success: false, message: 'First name, last name, and email are required' },
//         { status: 400 }
//       );
//     }

//     // Get current waitlist count for position
//     const waitlistCount = await Waitlist.countDocuments({ status: 'Active' });

//     // Create waitlist entry
//     const waitlistEntry = await Waitlist.create({
//       firstName: firstName.trim(),
//       lastName: lastName.trim(),
//       email: email.toLowerCase().trim(),
//       gender,
//       healthcareProvince,
//       healthcareNumber,
//       dateOfBirth,
//       cellPhone,
//       address,
//       country,
//       postalCode,
//       position: waitlistCount + 1
//     });

//     return NextResponse.json({
//       success: true,
//       message: 'Successfully joined waitlist! We will contact you when spots become available.',
//       data: {
//         id: waitlistEntry._id,
//         firstName: waitlistEntry.firstName,
//         position: waitlistEntry.position
//       }
//     });

//   } catch (error) {
//     console.error('Waitlist join error:', error);
    
//     // Handle duplicate email error
//     if (error.code === 11000) {
//       return NextResponse.json(
//         { success: false, message: 'This email is already on our waitlist!' },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(
//       { success: false, message: 'Failed to join waitlist. Please try again.' },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from 'next/server';
// import dbConnect from '@/utils/db';
// import Waitlist from '@/models/Waitlist';
// import { sendEmail } from '@/utils/emailService';

// export async function POST(request) {
//   try {
//     await dbConnect();

//     const body = await request.json();
//     const {
//       firstName,
//       lastName,
//       email,
//       gender,
//       healthcareProvince,
//       healthcareNumber,
//       dateOfBirth,
//       cellPhone,
//       address,
//       country,
//       postalCode
//     } = body;

//     // Basic validation
//     if (!firstName || !lastName || !email) {
//       return NextResponse.json(
//         { success: false, message: 'First name, last name, and email are required' },
//         { status: 400 }
//       );
//     }

//     const userEmail = email.toLowerCase().trim();

//     // Check if email already exists in waitlist
//     const existingWaitlist = await Waitlist.findOne({ email: userEmail })
//       .sort({ createdAt: -1 }); // Get most recent entry

//     if (existingWaitlist) {
//       // Calculate if 30 days have passed since last join
//       const lastJoinDate = new Date(existingWaitlist.createdAt);
//       const currentDate = new Date();
//       const daysSinceLastJoin = Math.floor((currentDate - lastJoinDate) / (1000 * 60 * 60 * 24));
      
//       if (daysSinceLastJoin < 30) {
//         const daysLeft = 30 - daysSinceLastJoin;
//         return NextResponse.json(
//           { 
//             success: false, 
//             message: `You can only join the waitlist once per month. Please try again in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}.` 
//           },
//           { status: 400 }
//         );
//       }
//     }

//     // Get total count of people in waitlist (for informational purposes)
//     const totalWaitlistCount = await Waitlist.countDocuments({ status: 'Active' });

//     // Create waitlist entry (no position field)
//     const waitlistEntry = await Waitlist.create({
//       firstName: firstName.trim(),
//       lastName: lastName.trim(),
//       email: userEmail,
//       gender,
//       healthcareProvince,
//       healthcareNumber,
//       dateOfBirth,
//       cellPhone,
//       address,
//       country,
//       postalCode,
//       status: 'Active'
//       // No position field - removed
//     });

//     const isReturningUser = !!existingWaitlist;

//     // Send welcome email
//     sendWaitlistWelcomeEmail(waitlistEntry, isReturningUser, totalWaitlistCount + 1).catch(error => {
//       console.error('Failed to send waitlist welcome email:', error);
//     });

//     return NextResponse.json({
//       success: true,
//       message: isReturningUser 
//         ? 'Welcome back! You have been added to the waitlist again.' 
//         : 'Successfully joined waitlist! We will contact you when spots become available.',
//       data: {
//         id: waitlistEntry._id,
//         firstName: waitlistEntry.firstName,
//         waitlistCount: totalWaitlistCount + 1
//       }
//     });

//   } catch (error) {
//     console.error('Waitlist join error:', error);
    
//     // Handle duplicate email error (shouldn't happen with our logic, but just in case)
//     if (error.code === 11000) {
//       return NextResponse.json(
//         { success: false, message: 'This email is already on our waitlist!' },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(
//       { success: false, message: 'Failed to join waitlist. Please try again.' },
//       { status: 500 }
//     );
//   }
// }

// // Updated email function - removed position references
// async function sendWaitlistWelcomeEmail(waitlistEntry, isReturningUser = false, waitlistCount = 0) {
//   try {
//     const subject = isReturningUser 
//       ? `Welcome back to St Mary Rideau Clinic Waitlist, ${waitlistEntry.firstName}!`
//       : `Welcome to St Mary Rideau Clinic Waitlist, ${waitlistEntry.firstName}!`;

//     const greeting = isReturningUser 
//       ? `Welcome back, ${waitlistEntry.firstName}!`
//       : `Thank you for joining our waitlist, ${waitlistEntry.firstName}!`;

//     const mainMessage = isReturningUser
//       ? `We've added you to our waitlist again. Our team will contact you when spots become available.`
//       : `We have received your information.`;

//     const welcomeEmailContent = `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
//         <div style="background: linear-gradient(135deg, #0369a1, #0ea5e9); padding: 30px; text-align: center;">
//           <h1 style="color: white; margin: 0; font-size: 28px;">${isReturningUser ? 'Welcome Back!' : 'Welcome to St Mary Rideau Clinic Waitlist!'}</h1>
//         </div>
        
//         <div style="padding: 30px; background: #f8fafc;">
//           <p>Dear <strong>${waitlistEntry.firstName} ${waitlistEntry.lastName}</strong>,</p>
          
//           <p>${greeting}</p>
          
//           <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #0369a1; margin: 20px 0;">
//             <h3 style="color: #0369a1; margin-top: 0;">Your Waitlist Details:</h3>
//             <p><strong>Name:</strong> ${waitlistEntry.firstName} ${waitlistEntry.lastName}</p>
//             <p><strong>Email:</strong> ${waitlistEntry.email}</p>
//             <p><strong>Date Joined:</strong> ${new Date().toLocaleDateString()}</p>
//             <p><strong>Status:</strong> Active</p>
//           </div>
          
//           <p>${mainMessage}</p>
          
//           ${isReturningUser ? `
//           <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px; margin: 20px 0;">
//             <p style="margin: 0; color: #856404;"><strong>Note:</strong> You can join our waitlist once every 30 days. This helps us manage our queue fairly for all patients.</p>
//           </div>
//           ` : ''}
          
//           <p><strong>What happens next?</strong></p>
//           <ul>
//             <li>Our team will contact you as soon as spots become available</li>
//             <li>You will be notified by email when we can schedule your appointment</li>
//             <li>Average wait times vary based on availability</li>
//           </ul>
          
//           <p><strong>Important:</strong> Please ensure your contact information remains up to date.</p>
          
//           <p>We appreciate your patience and look forward to serving you soon!</p>
          
//           <p>Best regards,<br>
//           <strong>The St Mary Rideau Clinic Team</strong></p>
          
//           <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;">
          
//           <div style="text-align: center; color: #666; font-size: 14px;">
//             <p>St Mary Rideau Clinic<br>
//              158 Rideau Street, Ottawa K1N5X6<br>
//             Phone: (613) 301-8805 | Email: contact@stmaryrideauclinic.com</p>
            
//             <p style="font-size: 12px; color: #999;">
//               This is an automated message. Please do not reply to this email.
//             </p>
//           </div>
//         </div>
//       </div>
//     `;

//     await sendEmail({
//       to: waitlistEntry.email,
//       subject: subject,
//       html: welcomeEmailContent,
//     });
    
//     // console.log(`Waitlist welcome email sent successfully to: ${waitlistEntry.email} (Returning: ${isReturningUser}, Count: ${waitlistCount})`);
//   } catch (error) {
//     console.error('Error sending waitlist welcome email:', error);
//     throw error;
//   }
// }




import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import Waitlist from '@/models/Waitlist';
import { sendEmail } from '@/utils/emailService';

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

    const userEmail = email.toLowerCase().trim();

    // Check if email already exists in waitlist
    const existingWaitlist = await Waitlist.findOne({ email: userEmail })
      .sort({ createdAt: -1 }); // Get most recent entry

    if (existingWaitlist) {
      // Calculate if 30 days have passed since last join
      const lastJoinDate = new Date(existingWaitlist.createdAt);
      const currentDate = new Date();
      const daysSinceLastJoin = Math.floor((currentDate - lastJoinDate) / (1000 * 60 * 60 * 24));
      
      if (daysSinceLastJoin < 30) {
        const daysLeft = 30 - daysSinceLastJoin;
        return NextResponse.json(
          { 
            success: false, 
            message: `You can only join the waitlist once per month. Please try again in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}.` 
          },
          { status: 400 }
        );
      }
    }

    // Get total count of people in waitlist (for informational purposes)
    const totalWaitlistCount = await Waitlist.countDocuments({ status: 'Active' });

    // Create waitlist entry (no position field)
    const waitlistEntry = await Waitlist.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: userEmail,
      gender,
      healthcareProvince,
      healthcareNumber,
      dateOfBirth,
      cellPhone,
      address,
      country,
      postalCode,
      status: 'Active'
      // No position field - removed
    });

    const isReturningUser = !!existingWaitlist;

    // ✅ FIXED: Send welcome email with proper await and error handling
    try {
      await sendWaitlistWelcomeEmail(waitlistEntry, isReturningUser);
      console.log('Waitlist welcome email sent successfully to:', waitlistEntry.email);
    } catch (emailError) {
      console.error('Failed to send waitlist welcome email:', emailError);
      // Don't fail the entire request if email fails, just log it
      // The user is still successfully added to waitlist
    }

    return NextResponse.json({
      success: true,
      message: isReturningUser 
        ? 'Welcome back! You have been added to the waitlist again.' 
        : 'Successfully joined waitlist! We will contact you when spots become available.',
      data: {
        id: waitlistEntry._id,
        firstName: waitlistEntry.firstName,
        waitlistCount: totalWaitlistCount + 1
      }
    });

  } catch (error) {
    console.error('Waitlist join error:', error);
    
    // Handle duplicate email error (shouldn't happen with our logic, but just in case)
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

// Updated email function - removed waitlistCount parameter and references
async function sendWaitlistWelcomeEmail(waitlistEntry, isReturningUser = false) {
  try {
    const subject = isReturningUser 
      ? `Welcome back to St Mary Rideau Clinic Waitlist, ${waitlistEntry.firstName}!`
      : `Welcome to St Mary Rideau Clinic Waitlist, ${waitlistEntry.firstName}!`;

    const greeting = isReturningUser 
      ? `Welcome back, ${waitlistEntry.firstName}!`
      : `Thank you for joining our waitlist, ${waitlistEntry.firstName}!`;

    const mainMessage = isReturningUser
      ? `We've added you to our waitlist again. Our team will contact you when spots become available.`
      : `We have received your information and you have been added to our waitlist.`;

    const welcomeEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background: linear-gradient(135deg, #0369a1, #0ea5e9); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">${isReturningUser ? 'Welcome Back!' : 'Welcome to St Mary Rideau Clinic Waitlist!'}</h1>
        </div>
        
        <div style="padding: 30px; background: #f8fafc;">
          <p>Dear <strong>${waitlistEntry.firstName} ${waitlistEntry.lastName}</strong>,</p>
          
          <p>${greeting}</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #0369a1; margin: 20px 0;">
            <h3 style="color: #0369a1; margin-top: 0;">Your Waitlist Details:</h3>
            <p><strong>Name:</strong> ${waitlistEntry.firstName} ${waitlistEntry.lastName}</p>
            <p><strong>Email:</strong> ${waitlistEntry.email}</p>
            <p><strong>Date Joined:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Status:</strong> Active</p>
          </div>
          
          <p>${mainMessage}</p>
          
          ${isReturningUser ? `
          <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #856404;"><strong>Note:</strong> You can join our waitlist once every 30 days. This helps us manage our queue fairly for all patients.</p>
          </div>
          ` : ''}
          
          <p><strong>What happens next?</strong></p>
          <ul>
            <li>Our team will contact you as soon as spots become available</li>
            <li>You will be notified by email when we can schedule your appointment</li>
            <li>Average wait times vary based on availability</li>
          </ul>
          
          <p><strong>Important:</strong> Please ensure your contact information remains up to date.</p>
          
          <p>We appreciate your patience and look forward to serving you soon!</p>
          
          <p>Best regards,<br>
          <strong>The St Mary Rideau Clinic Team</strong></p>
          
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;">
          
          <div style="text-align: center; color: #666; font-size: 14px;">
            <p>St Mary Rideau Clinic<br>
             158 Rideau Street, Ottawa K1N5X6<br>
            Phone: (613) 301-8805 | Email: contact@stmaryrideauclinic.com</p>
            
            <p style="font-size: 12px; color: #999;">
              This is an automated message. Please do not reply to this email.
            </p>
          </div>
        </div>
      </div>
    `;

    // ✅ FIXED: Return the promise from sendEmail
    return await sendEmail({
      to: waitlistEntry.email,
      subject: subject,
      html: welcomeEmailContent,
    });
    
  } catch (error) {
    console.error('Error sending waitlist welcome email:', error);
    throw error; // Re-throw to be caught by the caller
  }
}