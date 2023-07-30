import express from 'express';
import {
  signup,
  login,
  loginWithGoogle,
  loginWithGithub,
  googleCallback,
  githubCallback,
} from '../controllers/auth.controller';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/google', loginWithGoogle);
router.get('/github', loginWithGithub);
router.get('/google/callback', googleCallback);
router.get('/github/callback', githubCallback);

export default router;
