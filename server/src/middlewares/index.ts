import admin from '../config/firebase-config';
import { DecodedIdToken } from 'firebase-admin/auth';
import { Request, Response, NextFunction } from 'express';

class Middlewares {
  async decodeToken(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      try {
        const decodeValue: DecodedIdToken = await admin.auth().verifyIdToken(token);
        if (decodeValue) {
          return next();
        }
        return res.status(403).json({ message: 'Unauthorized' });
      } catch (e) {
        return res.status(500).json({ message: 'Internal Error' });
      }
    }
  }
}

export default new Middlewares();
