import dotenv from 'dotenv';
import express from 'express'
import serverless from 'serverless-http';
import { userRouter } from './controllers/userController';
import { bookingRouter } from './controllers/bookingControler';
import { AuthController } from './controllers/authController';
import { contactRouter } from './controllers/contactControllers';
import { roomRouter } from './controllers/roomController';
import { authenticateToken } from './midleware/midleware';
import connectDB from './seed/connection';
import cors from 'cors';
import {testConnection } from './seed/myqlConnection';

dotenv.config();
// connectDB();
testConnection();
const app = express();
app.use(express.json());
app.use(cors())


app.use('/api/v1/auth', AuthController);
app.use('/api/v1/users', authenticateToken, userRouter);
app.use('/api/v1/booking', bookingRouter);
app.use('/api/v1/contact', authenticateToken, contactRouter);
app.use('/api/v1/room', roomRouter);

// export const handler = () =>{
//     connectDB().then(() =>{serverless(app)})
// }

app.listen(3001)