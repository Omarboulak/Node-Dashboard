import { Request, Response, Router } from 'express'
import { UserValidator } from '../validators/userValidator';
import { UserService } from '../services/userServices';
import { UsersInterface } from '../interfaces/UsersInterface';

const userService = new UserService();
export const userRouter = Router();

userRouter.get('/', (req: Request, res: Response) => {
    const allUsers = userService.fetchAll()
    return res.status(200).json(allUsers);
})


userRouter.post('/', (req: Request, res: Response) => {
    const newUser = userService.createUser(req.body);
    res.status(201).json(newUser);
    const allUsers = userService.fetchAll();

    const validation = UserValidator.validateUser(newUser, allUsers);
    if (validation !== true) {
        return res.status(400).json({ error: validation });
    }
})


userRouter.put('/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const updates = req.body as Partial<UsersInterface>;
    const existing = userService.fetchAll().find(u => u.ID === id);
  
    if (!existing) {
      return res.status(404).json({ error: 'User not found' });
    }

    userService.updateUser(id, updates);
    const updatedUser = userService.fetchAll().find(u => u.ID === id);
    return res.status(200).json(updatedUser);
  });


userRouter.delete('/:id', (req: Request, res: Response) => {
    const deletedUser = userService.deleteUser(Number(req.params.id));
    if (deletedUser) {
        return res.status(204).json({ message: 'Server deleted' });
    } else {
        return res.status(404).json({ message: 'Server not found' });
    }
})
