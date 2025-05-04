import { Request, Response, Router } from 'express';
import { UserValidator } from '../validators/userValidator';
import { UserService } from '../services/userServices';
import { UsersInterface } from '../interfaces/UsersInterface';

const userService = new UserService();
export const userRouter = Router();

userRouter.get('/', async (req: Request, res: Response) => {
    try {
        const allUsers = await userService.fetchAll();
        return res.status(200).json(allUsers);
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
});

userRouter.post('/', async (req: Request, res: Response) => {
    try {
        const newUserData = req.body;
        const allUsers = await userService.fetchAll(); 
        
        const validation = UserValidator.validateUser(newUserData, allUsers);
        if (validation !== true) {
            return res.status(400).json({ error: validation });
        }
        
        const newUser = await userService.createUser(newUserData); 
        return res.status(201).json(newUser);
        
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
});

userRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const updates = req.body as Partial<UsersInterface>;
        
        const existing = await userService.getUserById(id);
        if (!existing) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        const updatedUser = await userService.updateUser(id, updates);
        return res.status(200).json(updatedUser);
        
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
});

userRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const result = await userService.deleteUser(id);
        
        if (result.deletedCount && result.deletedCount > 0) {
            return res.status(204).send();
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
});