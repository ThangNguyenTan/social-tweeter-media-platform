import express from 'express';
import {
  login,
  loginWithGoogle,
  loginWithGithub,
  googleCallback,
  githubCallback,
} from '../controllers/auth.controller';

const router = express.Router();

router.post('/login', login);
router.get('/google', loginWithGoogle);
router.get('/github', loginWithGithub);
router.get('/google/callback', googleCallback);
router.get('/github/callback', githubCallback);

export default router;
