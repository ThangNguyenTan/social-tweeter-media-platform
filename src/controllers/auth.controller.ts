import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

export const login = (req: Request, res: Response) => {
  passport.authenticate('local', { session: false }, (error, user) => {
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
