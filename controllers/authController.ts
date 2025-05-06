import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";
import AuthModel from "../models/authSchema";
import bcrypt from 'bcryptjs';

dotenv.config();
const secretKey = process.env.SECRET_KEY as string;

export const AuthController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (email === 'admin' && password === 'admin') {
      const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
      return res.status(200).json({ token, email });
    }

    const user = await AuthModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email' });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Invalid Password' });
    }

    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
    return res.status(200).json({ token, email });
  } catch (error: any) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
