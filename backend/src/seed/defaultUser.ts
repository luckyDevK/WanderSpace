// seed/defaultUser.ts
import bcrypt from 'bcrypt';
import User from '../models/user';
import { Types } from 'mongoose';

export interface IDefaultUser {
  userId: Types.ObjectId;
  username: string;
}

export async function seedDefaultUser(): Promise<IDefaultUser> {
  const existing = await User.findOne({ email: 'verylucky@example.com' });

  const hashedPassword = await bcrypt.hash('harimau229', 12);

  const user = await User.create({
    username: 'very289',
    email: 'verylucky@example.com',
    password: hashedPassword,
  });

  if (existing) {
    console.log('✅ Default user already exists');
    return {
      userId: user._id as Types.ObjectId,
      username: user.username,
    };
  }

  console.log('🌱 Default user created');
  return {
    userId: user._id as Types.ObjectId,
    username: user.username,
  };
}
