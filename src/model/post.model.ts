import { Document, Schema, model } from 'mongoose';
import { UserDocument } from './user.model';

export interface Post extends Document {
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: UserDocument['_id'];
  imageURL: string | null;
}

const postSchema = new Schema<Post>(
  {
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    imageURL: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

export const PostModel = model<Post>('Post', postSchema);
