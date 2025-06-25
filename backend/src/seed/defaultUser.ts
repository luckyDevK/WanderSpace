// seed/defaultUser.ts
import User from '../models/user'; // your user model
import bcrypt from 'bcrypt';

import { Types } from 'mongoose';

export async function seedDefaultUser(): Promise<Types.ObjectId> {
  const existingUser = await User.findOne({ username: 'very289' });

  if (existingUser) {
    console.log('👤 Default user already exists. Skipping...');
    return existingUser._id;
  }

  const password = await bcrypt.hash('your-password', 10);
  const newUser = await User.create({
    username: 'very289',
    email: 'very@example.com',
    password,
  });

  console.log('👤 Default user created');
  return newUser._id;
}
