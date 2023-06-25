import express from 'express';
import { likePost, unLikePost } from '../controllers/like.controller';

const router = express.Router();

router.post('/', likePost);
router.delete('/:followId', unLikePost);

export default router;
