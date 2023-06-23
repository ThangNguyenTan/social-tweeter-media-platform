import express from 'express';
import {
  createRetweet,
  deleteRetweet,
} from '../controllers/retweet.controller';

const router = express.Router();

router.post('/', createRetweet);
router.delete('/:retweetId', deleteRetweet);

export default router;
