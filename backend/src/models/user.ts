import { model, Schema } from 'mongoose';

import { IUser } from '../types/auth';

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true, minlength: 4 },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = model<IUser>('User', userSchema);

export default User;
