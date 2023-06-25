import express from 'express';
import { followUser, unFollowUser } from '../controllers/follow.controller';

const router = express.Router();

router.post('/', followUser);
router.delete('/:followId', unFollowUser);

export default router;
