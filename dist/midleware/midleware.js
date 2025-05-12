"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const key = process.env.SECRET_KEY;
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({ message: 'Error. No token provided.' });
        return;
    }
    try {
        jsonwebtoken_1.default.verify(token, key);
        next();
    }
    catch (error) {
        res.status(403).json({ message: 'Error. Invalid token.' });
        return;
    }
};
exports.authenticateToken = authenticateToken;
