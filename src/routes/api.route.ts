import express from 'express';
import authRouter from './auth.route';
import profileRouter from './profile.route';
import postRouter from './post.route';
import retweetRouter from './retweet.route';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/profile', profileRouter);
router.use('/posts', postRouter);
router.use('/retweets', authenticateToken, retweetRouter);

export default router;
