import jwt from 'jsonwebtoken';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export function signToken(id) {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

export async function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    return user;
  } catch (error) {
    return null;
  }
}

export async function protectRoute(req) {
  const authHeader = req.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Not authorized, no token');
  }

  const token = authHeader.split(' ')[1];
  const user = await verifyToken(token);

  if (!user) {
    throw new Error('Not authorized, token failed');
  }

  return user;
}

export async function requireAdmin(req) {
  const user = await protectRoute(req);
  
  if (user.role !== 'admin') {
    throw new Error('Admin access required');
  }

  return user;
}





// import { verifyToken } from './jwt';
// import dbConnect from './db';
// import User from '@/models/User';

// export async function authenticate(request) {
//   try {
//     const authHeader = request.headers.get('authorization');
    
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return null;
//     }

//     const token = authHeader.slice(7); // Remove 'Bearer ' prefix
    
//     if (!token) {
//       return null;
//     }

//     const decoded = verifyToken(token);
    
//     if (!decoded || !decoded.userId) {
//       return null;
//     }

//     await dbConnect();
    
//     const user = await User.findById(decoded.userId).select('-password');
    
//     if (!user) {
//       return null;
//     }

//     return user;
//   } catch (error) {
//     console.error('Authentication error:', error);
//     return null;
//   }
// }

// export async function protectRoute(request) {
//   const user = await authenticate(request);
  
//   if (!user) {
//     throw new Error('Not authorized, token failed');
//   }

//   return user;
// }

// export async function requireAdmin(request) {
//   const user = await protectRoute(request);
  
//   if (user.role !== 'admin') {
//     throw new Error('Admin access required');
//   }

//   return user;
// }



// import jwt from 'jsonwebtoken';
// import User from '@/models/User';
// import dbConnect from '@/utils/db';

// const JWT_SECRET = process.env.JWT_SECRET;
// const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// if (!JWT_SECRET) {
//   throw new Error('JWT_SECRET environment variable is required');
// }

// export function signToken(id) {
//   return jwt.sign({ id }, JWT_SECRET, {
//     expiresIn: JWT_EXPIRES_IN,
//   });
// }

// export async function verifyToken(token) {
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     await dbConnect();
//     const user = await User.findById(decoded.id).select('-password');
//     return user;
//   } catch (error) {
//     console.error('Token verification error:', error.message);
//     return null;
//   }
// }

// export async function protectRoute(req) {
//   try {
//     const authHeader = req.headers.get('authorization');
    
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       throw new Error('Not authorized, no token');
//     }

//     const token = authHeader.split(' ')[1];
    
//     if (!token) {
//       throw new Error('Not authorized, no token');
//     }

//     const user = await verifyToken(token);

//     if (!user) {
//       throw new Error('Not authorized, token failed');
//     }

//     return user;
//   } catch (error) {
//     console.error('Protect route error:', error.message);
//     throw error;
//   }
// }

// export async function requireAdmin(req) {
//   const user = await protectRoute(req);
  
//   if (user.role !== 'admin') {
//     throw new Error('Admin access required');
//   }

//   return user;
// }