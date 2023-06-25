import express from 'express';
import authRouter from './auth.route';
import profileRouter from './profile.route';
import postRouter from './post.route';
import retweetRouter from './retweet.route';
import commentRouter from './comment.route';
import followRouter from './follow.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/profile', profileRouter);
router.use('/posts', postRouter);
router.use('/retweets', authenticateToken, retweetRouter);
router.use('/comments', authenticateToken, commentRouter);
router.use('/follows', authenticateToken, followRouter);

export default router;
