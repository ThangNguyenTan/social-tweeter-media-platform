import { Document, Schema, model } from 'mongoose';

interface LikeDocument extends Document {
  user: Schema.Types.ObjectId;
  post: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const LikeSchema = new Schema<LikeDocument>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
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
});

const LikeModel = model<LikeDocument>('Like', LikeSchema);

export default LikeModel;
