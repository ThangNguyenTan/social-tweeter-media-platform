import express from 'express';
import {
  createBookmark,
  deleteBookmark,
  getBookmarks,
} from '../controllers/bookmark.controller';

const router = express.Router();

router.get('/', getBookmarks);
router.post('/', createBookmark);
router.delete('/:bookmarkId', deleteBookmark);

export default router;
