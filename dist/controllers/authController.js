"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const authSchema_1 = __importDefault(require("../models/authSchema"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
dotenv_1.default.config();
const secretKey = process.env.SECRET_KEY;
const AuthController = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (email === 'admin' && password === 'admin') {
            const token = jsonwebtoken_1.default.sign({ email }, secretKey, { expiresIn: '1h' });
            return res.status(200).json({ token, email });
        }
        const user = await authSchema_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email' });
        }
        const passwordIsValid = await bcryptjs_1.default.compare(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ message: 'Invalid Password' });
        }
        const token = jsonwebtoken_1.default.sign({ email }, secretKey, { expiresIn: '1h' });
        return res.status(200).json({ token, email });
    }
    catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.AuthController = AuthController;
