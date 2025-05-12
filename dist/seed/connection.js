"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error("La variable de entorno MONGO_URI no está definida");
        }
        await mongoose_1.default.connect(mongoURI);
        console.log("Conexión a MongoDB exitosa");
    }
    catch (error) {
        console.error("Error al conectar", error);
        process.exit(1);
    }
};
exports.default = connectDB;
