// seed/defaultUser.ts
import bcrypt from 'bcrypt';
import User from '../models/user';
import { Types } from 'mongoose';

export async function seedDefaultUser(): Promise<Types.ObjectId> {
  const existing = await User.findOne({ email: 'verylucky@example.com' });

  if (existing) {
    console.log('✅ Default user already exists');
    return existing._id as Types.ObjectId;
  }

  const hashedPassword = await bcrypt.hash('harimau229', 12);

  const user = await User.create({
    username: 'very289',
    email: 'verylucky@example.com',
    password: hashedPassword,
  });

  console.log('🌱 Default user created');
  return user._id as Types.ObjectId;
}
