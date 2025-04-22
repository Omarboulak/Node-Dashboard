import express, {Request, Response, Router} from 'express'
import users from '../public/users.json'
import { UserValidator } from '../validators/userValidator';
import { UserService } from '../services/userServices';
import { UsersInterface } from '../interfaces/UsersInterface';

const userService =  new UserService();
export const userRouter = Router();

userRouter.get('/', (req: Request, res: Response) =>{
    const allUsers = userService.fetchAll()
    return res.status(200).json(allUsers);
})


userRouter.post('/', (req: Request, res: Response) =>{
    const newUser = userService.createUser(req.body);
    res.status(201).json(newUser);
})


userRouter.put('/:id', (req: Request, res: Response) =>{
    const updatedUser =  userService.updateUser(Number(req.params.id), req.body);
    if (updatedUser !== null) {
        res.status(204).json(updatedUser);
    } else {
        res.status(404).json({ message: 'user not found' });
    }
})


userRouter.delete('/:id', (req: Request, res: Response) =>{
    const deletedUser = userService.deleteUser(Number(req.params.id));
    if (deletedUser) {
        res.status(204).json({ message: 'Server deleted' });
    } else {
        res.status(404).json({ message: 'Server not found' });
    }
})



