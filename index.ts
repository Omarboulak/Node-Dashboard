import express, {Request, Response} from 'express'
import { userRouter } from './controllers/user';

const user = express();

user.use('api/vi/users', userRouter);

user.get('users', (req: Request, res: Response) => {
    res.send('Hello Word');
});

user.listen(3000, () =>{
    console.log('Server is running on port 3000');
})