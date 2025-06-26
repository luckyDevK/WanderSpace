import { Document, model, Schema } from 'mongoose';

import { IUser } from '../types/auth';

type IUserDoc = IUser & Document;

const userSchema = new Schema<IUserDoc>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = model<IUser>('User', userSchema);

export default User;
