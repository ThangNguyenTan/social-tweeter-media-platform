import express from 'express';
import { followUser, unFollowUser } from '../controllers/follow.controller';

const router = express.Router();

router.post('/', followUser);
router.delete('/:followedUserId', unFollowUser);

export default router;
