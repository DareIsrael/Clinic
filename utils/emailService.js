import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g., smtp.hostinger.com
  port: Number(process.env.SMTP_PORT) || 587, // 587 for TLS, 465 for SSL
  secure: Number(process.env.SMTP_PORT) === 465, // true for SSL
  // secure: false,
  auth: {
    user: process.env.EMAIL_USER, // e.g., info@yourdomain.com
    pass: process.env.EMAIL_PASSWORD, // your email password
  },
});

export async function sendEmail({ to, subject, html }) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'St Mary Rideau Clinic <info@yourdomain.com>',
      to,
      subject,
      html,
    };

    const result = await transporter.sendMail(mailOptions);
    // console.log('Email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
}
