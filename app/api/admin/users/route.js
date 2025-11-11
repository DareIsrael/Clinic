// import { requireAdmin } from '@/utils/auth';
// import User from '@/models/User';

// export async function GET(req) {
//   try {
//     await requireAdmin(req);
//     const url = new URL(req.url);
//     const limit = parseInt(url.searchParams.get('limit')) || 10;
//     const page = parseInt(url.searchParams.get('page')) || 1;

//     const users = await User.find({ role: 'patient' })
//       .select('firstName lastName email createdAt')
//       .sort({ createdAt: -1 })
//       .limit(limit)
//       .skip((page - 1) * limit);

//     const total = await User.countDocuments({ role: 'patient' });

//     return Response.json({
//       success: true,
//       users,
//       pagination: {
//         page,
//         limit,
//         total,
//         pages: Math.ceil(total / limit)
//       }
//     });

//   } catch (error) {
//     console.error('Admin users error:', error);
//     if (error.message.includes('Admin access required')) {
//       return Response.json(
//         { success: false, message: 'Admin access required' },
//         { status: 403 }
//       );
//     }
//     return Response.json(
//       { success: false, message: 'Failed to fetch users' },
//       { status: 500 }
//     );
//   }
// }


import { requireAdmin } from '@/utils/auth';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Pass the request to requireAdmin
    await requireAdmin(request);
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 10;
    const page = parseInt(searchParams.get('page')) || 1;

    const users = await User.find({ role: 'patient' })
      .select('firstName lastName email createdAt')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await User.countDocuments({ role: 'patient' });

    return NextResponse.json({
      success: true,
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Admin users error:', error);
    if (error.message.includes('Admin access required')) {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}