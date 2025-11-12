// 'use client';
// import { useSession, signIn, signOut } from 'next-auth/react';
// import { useRouter } from 'next/navigation';

// export function useAuth() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   return {
//     user: session?.user,
//     isAuthenticated: status === 'authenticated',
//     loading: status === 'loading',

//     signIn: async (email, password) => {
//       const result = await signIn('credentials', {
//         email,
//         password,
//         redirect: false
//       });
//       if (result?.ok) router.push('/dashboard');
//       return result;
//     },

//     signOut: () => signOut({ redirect: true, callbackUrl: '/login' }),

//     register: async (userData) => {
//       try {
//         const response = await fetch('/api/auth/register', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(userData)
//         });
//         const data = await response.json();
//         if (!response.ok) throw new Error(data.message || 'Registration failed');
//         return data;
//       } catch (error) {
//         console.error('Registration error:', error);
//         return { success: false, message: error.message };
//       }
//     }
//   };
// }


'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return {
    user: session?.user,
    isAuthenticated: status === 'authenticated',
    loading: status === 'loading',

    signIn: async (email, password) => {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      });
      if (result?.ok) router.push('/dashboard');
      return result;
    },

    signOut: () => signOut({ redirect: true, callbackUrl: '/login' }),

    register: async (userData) => {
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Registration failed');
        return data;
      } catch (error) {
        console.error('Registration error:', error);
        throw error; // Change this line - throw instead of return
      }
    }
  };
}