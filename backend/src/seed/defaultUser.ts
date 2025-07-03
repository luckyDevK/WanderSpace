import User from '../models/user';
import bcrypt from 'bcrypt';

import { Types } from 'mongoose';

export async function seedDefaultUser(): Promise<Types.ObjectId> {
  const existingUser = await User.findOne({
    username: process.env.USERNAME_ADMIN!,
  });

  if (existingUser) {
    console.log('👤 Default user already exists. Skipping...');
    return existingUser._id;
  }

  const password = await bcrypt.hash(process.env.PASSWORD_ADMIN!, 10);
  const newUser = await User.create({
    username: process.env.USERNAME_ADMIN!,
    email: process.env.EMAIL_ADMIN!,
    password,
  });

  return newUser._id;
}
