import express, {Request, Response} from 'express'
import { userRouter } from './controllers/user';

const user = express();

user.use('/api/v1/users', userRouter);

user.listen(3000, () =>{
    console.log('Server is running on port 3000');
})