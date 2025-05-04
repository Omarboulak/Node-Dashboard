import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import AuthModel from "../models/authSchema";

dotenv.config();

const secretKey = process.env.SECRET_KEY as string;

export const AuthController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;
    try {
        const foundUser = await AuthModel.findOne({ email });
        if (!foundUser) {
            res.status(401).json({ message: "User not found "});
            return;
        }
        if (password != foundUser.password) {
            res.status(401).json({ message: "Incorrect password"});
            return;
        }
        const token = jwt.sign({ email: foundUser.email }, secretKey, {
            expiresIn: "1h",
        });
        res.status(200).json({
            token,
            email: foundUser.email,
            username: foundUser.username,
        });
    } 
    catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};