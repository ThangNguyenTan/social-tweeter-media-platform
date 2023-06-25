import express from 'express';
import {
  createBookmark,
  deleteBookmark,
} from '../controllers/bookmark.controller';

const router = express.Router();

router.post('/', createBookmark);
router.delete('/:bookmarkId', deleteBookmark);

export default router;
