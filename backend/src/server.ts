import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js'; // ✅ must include `.js` if using `"type": "module"`
import { seedDefaultUser } from './seed/defaultUser.js'; // adjust paths as needed
import { seedBeautifulPlaces } from './seed/seedBeautifulPlaces.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI not defined in environment variables');
  process.exit(1);
}

const run = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // 🔁 Seeding logic goes here
    const user = await seedDefaultUser();
    await seedBeautifulPlaces({ userId: user.userId, username: user.username });
    console.log('🌱 Seed completed');

    // Start the app after DB + seeding
    app.listen(PORT, () => {
      console.log(`🚀 Server listening at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Initialization failed:', err);
    process.exit(1);
  }
};

run();
