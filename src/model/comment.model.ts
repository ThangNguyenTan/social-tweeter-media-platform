import mongoose, { Schema, Document } from 'mongoose';

// Define the Comment interface
export interface CommentDocument extends Document {
  comment: string;
  imageURL?: string;
  createdAt: Date;
  updatedAt: Date;
  post: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}

// Define the Comment schema
const commentSchema = new Schema<CommentDocument>(
  {
    comment: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Create the Comment model
const CommentModel = mongoose.model<CommentDocument>('Comment', commentSchema);

export default CommentModel;
