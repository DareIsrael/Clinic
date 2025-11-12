import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/utils/db';
import User from '@/models/User';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        await dbConnect();

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
          age: user.age
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
        token.age = user.age;
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
      session.user.age = token.age;
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




