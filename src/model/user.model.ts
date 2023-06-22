import mongoose, { Document } from 'mongoose';

export interface UserDocument extends Document {
  username: string;
  password?: string;
  profileImageURL?: string;
  bio?: string;
  email?: string;
  googleId?: string;
  githubId?: string;
}

const userSchema = new mongoose.Schema<UserDocument>({
  username: { type: String, required: true },
  email: { type: String, unique: true },
  bio: { type: String, default: 'Go to Settings to update your bio' },
  profileImageURL: {
    type: String,
    default: 'https://i.imgur.com/tQGfxmT.png',
  },
  password: { type: String },
  googleId: { type: String },
  githubId: { type: String },
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
