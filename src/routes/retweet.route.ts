import express from 'express';
import {
  createRetweet,
  deleteRetweet,
  getRetweets,
} from '../controllers/retweet.controller';

const router = express.Router();

router.get('/', getRetweets);
router.post('/', createRetweet);
router.delete('/:retweetId', deleteRetweet);

export default router;
