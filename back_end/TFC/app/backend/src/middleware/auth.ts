import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const headers = req.headers.authorization;
    if (!headers) return res.status(401).json({ error: 'Token not found' });

    let token = '';
    if (typeof headers === 'string') token = headers;

    const SECRET = fs.readFileSync('jwt.evaluation.key', 'utf8');

    const decoded = jwt.verify(token, SECRET) as jwt.JwtPayload;

    res.locals.tokenData = decoded;

    return next();
  } catch (error: any) {
    if (error.name.includes('Token')) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
  }
};

export default auth;
