import express from 'express';
import {
  getUserProfile,
  getMyProfile,
  updateMyProfile,
} from '../controllers/profile.controller';

const router = express.Router();

router.patch('/update', updateMyProfile);
router.get('/me', getMyProfile);
router.get('/:profileId', getUserProfile);

export default router;
