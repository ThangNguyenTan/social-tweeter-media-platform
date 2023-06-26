import { Request } from 'express';

export interface IGetUserAuthInfoRequest extends Request {
  currentUser?: { userId: string } | null;
}
