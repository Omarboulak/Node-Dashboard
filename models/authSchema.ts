import mongoose, { Schema } from "mongoose";
import { AuthInterface } from "../interfaces/AuthInterface";

export const authSchema = new Schema<AuthInterface>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const AuthModel = mongoose.model<AuthInterface>('Auth', authSchema);

export default AuthModel;