import dotenv from 'dotenv';

import express from 'express'
import { userRouter } from './controllers/userController';
import { authRouter } from './controllers/authController';
import { authenticateToken } from './midleware/midleware';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticateToken, userRouter);

app.listen(3000, () =>{
    console.log('Server is running on port 3000');
})