import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { mysqlConnection } from "../seed/myqlConnection";

dotenv.config();
const secretKey = process.env.SECRET_KEY as string;

export const AuthController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const [rows] = await mysqlConnection.execute(`SELECT id, username, password FROM users WHERE username = ?`, [username]);
    const users = rows as Array<{ id: number; username: string; password: string }>;

    if (users.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }
    const user = users[0];

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Contraseña inválida' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      secretKey,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        username: user.username
      }
    });
  } catch (error: any) {
    console.error("Error en AuthController:", error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};
