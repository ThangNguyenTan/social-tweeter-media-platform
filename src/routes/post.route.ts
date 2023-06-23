import express from 'express';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/post.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', getPosts);
router.get('/:postId', getPost);
router.post('/', authenticateToken, createPost);
router.patch('/:postId', authenticateToken, updatePost);
router.delete('/:postId', authenticateToken, deletePost);

export default router;
