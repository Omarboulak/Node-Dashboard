import { Router, Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const key = process.env.SECRET_KEY as string;

export const authRouter = Router();

authRouter.post('/login', (req: Request, res: Response) => {
  const { user, pass } = req.body;
  if (user === 'admin' && pass === 'admin') {
    const token = jwt.sign({ user }, key, { expiresIn: '8h' });
    return res.json({ token });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});
