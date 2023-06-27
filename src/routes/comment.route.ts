import express from 'express';
import {
  createComment,
  deleteComment,
  getMyComments,
} from '../controllers/comment.controller';

const router = express.Router();

router.get('/', getMyComments);
router.post('/', createComment);
router.delete('/:commentId', deleteComment);

export default router;
