"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const userController_1 = require("./controllers/userController");
const bookingControler_1 = require("./controllers/bookingControler");
const authController_1 = require("./controllers/authController");
const contactControllers_1 = require("./controllers/contactControllers");
const midleware_1 = require("./midleware/midleware");
const connection_1 = __importDefault(require("./seed/connection"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
(0, connection_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/v1/auth', authController_1.AuthController);
app.use('/api/v1/users', midleware_1.authenticateToken, userController_1.userRouter);
app.use('/api/v1/booking', midleware_1.authenticateToken, bookingControler_1.bookingRouter);
app.use('/api/v1/contact', midleware_1.authenticateToken, contactControllers_1.contactRouter);
// export const handler = () =>{
//     connectDB().then(() =>{serverless(app)})
// }
app.listen(3001);
