import { Router, Request, Response } from 'express';
import { UserService } from '../services/userServices';
import { UserValidator } from '../validators/userValidator';

const svc = new UserService();
export const userRouter = Router();

userRouter.get('/', async (_req, res) => {
    const all = await svc.fetchAll();
    res.json(all);
});

userRouter.post('/', async (req, res) => {
    const data = req.body;
    const all = await svc.fetchAll();
    const valid = UserValidator.validateUser(data, all);
    if (valid !== true) {
        return res.status(400).json({ error: valid });
    }
    const created = await svc.createUser(data);
    res.status(201).json(created);
});

userRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const exists = await svc.getUserById(id);
    if (!exists) {
        return res.status(404).json({ error: 'User not found' })
    };
    const updated = await svc.updateUser(id, req.body);
    res.json(updated);
});

userRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await svc.deleteUser(id);
    if (result.deletedCount > 0) {
        return res.status(204).send();
    }
    res.status(404).json({ message: 'User not found' });
});
