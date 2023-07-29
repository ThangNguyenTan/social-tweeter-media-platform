import mongoose, { Document, Schema } from 'mongoose';
import { FollowDocument } from './follow.model';

export interface UserDocument extends Document {
  username: string;
  password?: string;
  profileImageURL?: string;
  profileBackgroundImageURL?: string;
  bio?: string;
  email?: string;
  googleId?: string;
  githubId?: string;
  followers: FollowDocument[];
  following: FollowDocument[];
}

const userSchema = new mongoose.Schema<UserDocument>({
  username: { type: String, required: true },
  email: { type: String, unique: true },
  bio: { type: String, default: 'Go to Settings to update your bio' },
  profileImageURL: {
    type: String,
    default: 'https://i.imgur.com/tQGfxmT.png',
  },
  profileBackgroundImageURL: {
    type: String,
    default: 'https://i.imgur.com/tQGfxmT.png',
  },
  password: { type: String },
  googleId: { type: String },
  githubId: { type: String },
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Follow',
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Follow',
    },
  ],
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
