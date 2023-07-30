import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../model/user.model';
import bcrypt from 'bcrypt';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(StatusCodes.CONFLICT).json({
      statusMessage: ReasonPhrases.CONFLICT,
      message: 'This user is already existed',
      success: false,
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const username = email.split('@')[0];
  await new User({ username, email, password: hashedPassword }).save();

  res.status(StatusCodes.CREATED).json({
    statusMessage: ReasonPhrases.CREATED,
    message: 'You have successfully signed up',
    success: true,
  });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', { session: false }, (error, user) => {
    if (error || !user) {
      res
        .status(401)
        .json({ message: 'Authentication failed', success: false });
    } else {
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || '',
      );
      res.json({ token, message: 'Successfully logged in', success: true });
    }
  })(req, res, next);
};

export const loginWithGoogle = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate('google', { session: false })(req, res, next);
};

export const loginWithGithub = (req: Request, res: Response) => {
  passport.authenticate('github', { session: false })(req, res);
};

export const googleCallback = (req: Request, res: Response) => {
  passport.authenticate('google', { session: false }, (error, user) => {
    if (error || !user) {
      res.status(401).json({ message: 'Authentication failed' });
    } else {
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || '',
      );
      res.json({ token });
    }
  })(req, res);
};

export const githubCallback = (req: Request, res: Response) => {
  passport.authenticate('github', { session: false }, (error, user) => {
    if (error || !user) {
      res.status(401).json({ message: 'Authentication failed' });
    } else {
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || '',
      );
      res.json({ token });
    }
  })(req, res);
};
