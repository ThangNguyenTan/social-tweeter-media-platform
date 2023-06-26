import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IGetUserAuthInfoRequest } from '../types';

// Middleware to verify the JWT token
export const authenticateToken = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user: { userId: string }) => {
    if (err) return res.sendStatus(403);
    req.currentUser = user;
    next();
  });
};
