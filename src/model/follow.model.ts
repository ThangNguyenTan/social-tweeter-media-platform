import { Document, Schema, model } from 'mongoose';

interface FollowDocument extends Document {
  follower: Schema.Types.ObjectId;
  followed: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const FollowSchema = new Schema<FollowDocument>(
  {
    follower: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    followed: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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
  },
  { timestamps: true },
);

const FollowModel = model<FollowDocument>('Follow', FollowSchema);

export default FollowModel;
