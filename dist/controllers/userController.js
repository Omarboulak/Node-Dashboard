"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const userServices_1 = require("../services/userServices");
const userValidator_1 = require("../validators/userValidator");
const svc = new userServices_1.UserService();
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get('/', async (_req, res) => {
    const all = await svc.fetchAll();
    res.json(all);
});
exports.userRouter.post('/', async (req, res) => {
    const data = req.body;
    const all = await svc.fetchAll();
    const valid = userValidator_1.UserValidator.validateUser(data, all);
    if (valid !== true) {
        return res.status(400).json({ error: valid });
    }
    const created = await svc.createUser(data);
    res.status(201).json(created);
});
exports.userRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const exists = await svc.getUserById(id);
    if (!exists) {
        return res.status(404).json({ error: 'User not found' });
    }
    ;
    const updated = await svc.updateUser(id, req.body);
    res.json(updated);
});
exports.userRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await svc.deleteUser(id);
    if (result.deletedCount > 0) {
        return res.status(204).send();
    }
    res.status(404).json({ message: 'User not found' });
});
