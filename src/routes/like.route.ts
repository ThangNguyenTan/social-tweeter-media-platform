import express from 'express';
import { getLikes, likePost, unLikePost } from '../controllers/like.controller';

const router = express.Router();

router.get('/', getLikes);
router.post('/', likePost);
router.delete('/:likeId', unLikePost);

export default router;
