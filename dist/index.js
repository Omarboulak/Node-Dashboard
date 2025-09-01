"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const serverless_http_1 = __importDefault(require("serverless-http"));
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./seed/connection"));
const dotenv_1 = __importDefault(require("dotenv"));
const userController_1 = require("./controllers/userController");
const bookingControler_1 = require("./controllers/bookingControler");
const authController_1 = require("./controllers/authController");
const contactControllers_1 = require("./controllers/contactControllers");
const roomController_1 = require("./controllers/roomController");
const midleware_1 = require("./midleware/midleware");
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
app.use('/api/v1/room', roomController_1.roomRouter);
exports.handler = (0, serverless_http_1.default)(app);
// app.listen(3001)
