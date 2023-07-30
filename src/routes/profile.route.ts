import express from 'express';
import {
  getUserProfile,
  getMyProfile,
  updateMyProfile,
} from '../controllers/profile.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.patch('/update', updateMyProfile);
router.get('/me', authenticateToken, getMyProfile);
router.get('/:profileId', getUserProfile);

export default router;
