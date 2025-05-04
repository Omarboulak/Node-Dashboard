import dotenv from 'dotenv';
import express from 'express'
import serverless from 'serverless-http';
import { userRouter } from './controllers/userController';
import { authRouter } from './controllers/authController';
import { authenticateToken } from './midleware/midleware';
import connectDB from './seed/connection';

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/booking', authenticateToken, userRouter);

// export const handler = () =>{
//     connectDB().then(() =>{serverless(app)})
// }

app.listen(3000)