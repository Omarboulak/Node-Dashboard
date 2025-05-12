"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const userValidator_1 = require("../validators/userValidator");
const userServices_1 = require("../services/userServices");
const userService = new userServices_1.UserService();
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get('/', async (req, res) => {
    try {
        const allUsers = await userService.fetchAll();
        return res.status(200).json(allUsers);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.userRouter.post('/', async (req, res) => {
    try {
        const newUserData = req.body;
        const allUsers = await userService.fetchAll();
        const validation = userValidator_1.UserValidator.validateUser(newUserData, allUsers);
        if (validation !== true) {
            return res.status(400).json({ error: validation });
        }
        const newUser = await userService.createUser(newUserData);
        return res.status(201).json(newUser);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.userRouter.put('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const updates = req.body;
        const existing = await userService.getUserById(id);
        if (!existing) {
            return res.status(404).json({ error: 'User not found' });
        }
        const updatedUser = await userService.updateUser(id, updates);
        return res.status(200).json(updatedUser);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.userRouter.delete('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await userService.deleteUser(id);
        if (result.deletedCount && result.deletedCount > 0) {
            return res.status(204).send();
        }
        else {
            return res.status(404).json({ message: 'User not found' });
        }
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
