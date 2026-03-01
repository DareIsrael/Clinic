import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import jwt from 'jsonwebtoken';
import dbConnect from '@/utils/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';

// Simple in-memory rate limiter for login attempts
const loginAttempts = new Map();

// Clean up old entries every 15 minutes
setInterval(() => {
  const now = Date.now();
  const fifteenMinutes = 15 * 60 * 1000;

  for (const [ip, data] of loginAttempts.entries()) {
    if (now - data.firstAttempt > fifteenMinutes) {
      loginAttempts.delete(ip);
    }
  }
}, 15 * 60 * 1000);

// Rate limiting check function
function checkRateLimit(ip) {
  const now = Date.now();
  const fifteenMinutes = 15 * 60 * 1000;

  if (!loginAttempts.has(ip)) {
    loginAttempts.set(ip, {
      count: 1,
      firstAttempt: now
    });
    return { allowed: true, remaining: 2 };
  }

  const data = loginAttempts.get(ip);

  // Reset if 15 minutes have passed
  if (now - data.firstAttempt > fifteenMinutes) {
    loginAttempts.set(ip, {
      count: 1,
      firstAttempt: now
    });
    return { allowed: true, remaining: 2 };
  }

  // Check if limit exceeded
  if (data.count >= 3) {
    const timeLeft = Math.ceil((fifteenMinutes - (now - data.firstAttempt)) / 1000 / 60);
    return {
      allowed: false,
      remaining: 0,
      retryAfter: timeLeft
    };
  }

  // Increment count
  data.count++;
  return { allowed: true, remaining: 3 - data.count };
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        await dbConnect();

        // --- Admin login confirmation flow (via email link) ---
        if (credentials.loginToken) {
          try {
            const decoded = jwt.verify(credentials.loginToken, process.env.NEXTAUTH_SECRET);
            if (decoded.purpose !== 'admin-login-confirm') {
              throw new Error('Invalid login token');
            }
            const user = await User.findById(decoded.userId);
            if (!user || user.role !== 'admin') {
              throw new Error('Invalid login token');
            }
            return {
              id: user._id.toString(),
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              role: user.role,
              cellPhone: user.cellPhone,
              dateOfBirth: user.dateOfBirth,
              gender: user.gender,
              healthcareNumber: user.healthcareNumber,
              healthcareProvince: user.healthcareProvince,
              address: user.address,
              country: user.country,
              postalCode: user.postalCode,
            };
          } catch (err) {
            throw new Error('Invalid or expired confirmation. Please log in again.');
          }
        }

        // --- Normal password-based login flow ---
        // Get IP address for rate limiting
        const forwarded = req.headers?.['x-forwarded-for'];
        const ip = forwarded ? forwarded.split(',')[0] : req.headers?.['x-real-ip'] || 'unknown';

        // Check rate limit BEFORE attempting authentication
        const rateCheck = checkRateLimit(ip);
        if (!rateCheck.allowed) {
          throw new Error(`Too many login attempts. Please try again in ${rateCheck.retryAfter} minutes.`);
        }

        const { email, password } = credentials;

        // Find user
        const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+password');

        if (!user) {
          throw new Error('Invalid email or password');
        }

        // Check password
        const isPasswordCorrect = await user.correctPassword(password);
        if (!isPasswordCorrect) {
          throw new Error('Invalid email or password');
        }

        // Successful login - reset the rate limit for this IP
        loginAttempts.delete(ip);

        // Return complete user object for the dashboard
        return {
          id: user._id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          // Add all the fields needed for the dashboard
          cellPhone: user.cellPhone,
          dateOfBirth: user.dateOfBirth,
          gender: user.gender,
          healthcareNumber: user.healthcareNumber,
          healthcareProvince: user.healthcareProvince,
          address: user.address,
          country: user.country,
          postalCode: user.postalCode,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add user info to token on sign in
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.role = user.role;
        // Add all additional fields to token
        token.cellPhone = user.cellPhone;
        token.dateOfBirth = user.dateOfBirth;
        token.gender = user.gender;
        token.healthcareNumber = user.healthcareNumber;
        token.healthcareProvince = user.healthcareProvince;
        token.address = user.address;
        token.country = user.country;
        token.postalCode = user.postalCode;
      }
      return token;
    },
    async session({ session, token }) {
      // Add token info to session
      session.user.id = token.id;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.role = token.role;
      // Add all additional fields to session
      session.user.cellPhone = token.cellPhone;
      session.user.dateOfBirth = token.dateOfBirth;
      session.user.gender = token.gender;
      session.user.healthcareNumber = token.healthcareNumber;
      session.user.healthcareProvince = token.healthcareProvince;
      session.user.address = token.address;
      session.user.country = token.country;
      session.user.postalCode = token.postalCode;
      return session;
    }
  },
  pages: {
    signIn: '/login',
    signUp: '/register'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
