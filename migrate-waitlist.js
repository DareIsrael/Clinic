// // migrate-waitlist.js
// require('dotenv').config();

// const mongoose = require('mongoose');

// // Your MongoDB connection string
// const MONGODB_URI = process.env.MONGODB_URI;

// // Schemas (copy from your existing models)
// const userSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   email: String,
//   gender: String,
//   healthcareProvince: String,
//   healthcareNumber: String,
//   dateOfBirth: Date,
//   cellPhone: String,
//   address: String,
//   country: String,
//   postalCode: String,
//   status: String,
//   role: String,
//   createdAt: Date,
//   updatedAt: Date
// });

// const waitlistSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   email: String,
//   gender: String,
//   healthcareProvince: String,
//   healthcareNumber: String,
//   dateOfBirth: Date,
//   cellPhone: String,
//   address: String,
//   country: String,
//   postalCode: String,
//   status: String,
//   position: Number,
//   createdAt: Date,
//   updatedAt: Date
// });

// const User = mongoose.model('User', userSchema, 'users');
// const Waitlist = mongoose.model('Waitlist', waitlistSchema, 'waitlists');

// async function migrate() {
//   try {
//     console.log('🔗 Connecting to database...');
//     await mongoose.connect(MONGODB_URI);
//     console.log('✅ Connected to database');

//     // Get all patient users
//     console.log('📋 Finding patient users...');
//     const users = await User.find({ role: 'patient' });
//     console.log(`✅ Found ${users.length} patient users`);

//     // Get current waitlist count for positioning
//     const currentWaitlistCount = await Waitlist.countDocuments();
//     console.log(`📊 Current waitlist entries: ${currentWaitlistCount}`);

//     let migrated = 0;
//     let skipped = 0;

//     console.log('🚀 Starting migration...');
    
//     for (const user of users) {
//       // Check if user already exists in waitlist
//       const existing = await Waitlist.findOne({ email: user.email });
      
//       if (existing) {
//         console.log(`⏭️  Skipping ${user.email} - already in waitlist`);
//         skipped++;
//         continue;
//       }

//       // Create waitlist entry
//       await Waitlist.create({
//         firstName: user.firstName || '',
//         lastName: user.lastName || '',
//         email: user.email,
//         gender: user.gender || 'Other',
//         healthcareProvince: user.healthcareProvince || 'Not Provided',
//         healthcareNumber: user.healthcareNumber || 'Not Provided',
//         dateOfBirth: user.dateOfBirth || new Date('1990-01-01'),
//         cellPhone: user.cellPhone || 'Not Provided',
//         address: user.address || 'Not Provided',
//         country: user.country || 'Not Provided',
//         postalCode: user.postalCode || 'Not Provided',
//         status: user.status || 'Active',
//         position: currentWaitlistCount + migrated + 1,
//         createdAt: user.createdAt || new Date(),
//         updatedAt: user.updatedAt || new Date()
//       });

//       migrated++;
//       console.log(`✅ Migrated ${user.email}`);
//     }

//     console.log('\n🎉 Migration completed!');
//     console.log(`✅ Successfully migrated: ${migrated} users`);
//     console.log(`⏭️  Skipped: ${skipped} users (already in waitlist)`);
//     console.log(`📊 Total waitlist entries now: ${currentWaitlistCount + migrated}`);

//   } catch (error) {
//     console.error('❌ Migration failed:', error);
//   } finally {
//     await mongoose.disconnect();
//     console.log('🔌 Disconnected from database');
//     process.exit(0);
//   }
// }

// // Run the migration
// migrate();