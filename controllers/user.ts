import express, {Request, Response, Router} from 'express'
import users from '../public/users.json'

export const userRouter = Router();

userRouter.get('/', (req: Request, res: Response) =>{
    res.status(200);
    res.json(users);
})


userRouter.post('/', (req: Request, res: Response) =>{
    res.send('Hello Word')
})


userRouter.put('/', (req: Request, res: Response) =>{
    res.send('Hello Word')
})


userRouter.delete('/', (req: Request, res: Response) =>{
    res.send('Hello Word')
})



