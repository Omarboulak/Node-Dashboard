"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomRouter = void 0;
const express_1 = require("express");
const roomValidator_1 = require("../validators/roomValidator");
const roomServices_1 = require("../services/roomServices");
const roomService = new roomServices_1.RoomService();
exports.roomRouter = (0, express_1.Router)();
exports.roomRouter.get('/', async (req, res) => {
    try {
        const allRooms = await roomService.fetchAll();
        return res.status(200).json(allRooms);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.roomRouter.post('/', async (req, res) => {
    try {
        const newRoomData = req.body;
        const allRooms = await roomService.fetchAll();
        const validation = roomValidator_1.RoomValidator.validateRoom(newRoomData, allRooms);
        if (validation !== true) {
            return res.status(400).json({ error: validation });
        }
        const newRoom = await roomService.createRoom(newRoomData);
        return res.status(201).json(newRoom);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.roomRouter.put('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const updates = req.body;
        const existing = await roomService.getRoomById(id);
        if (!existing) {
            return res.status(404).json({ error: 'Room not found' });
        }
        const updatedRoom = await roomService.updateRoom(id, updates);
        return res.status(200).json(updatedRoom);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.roomRouter.delete('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await roomService.deleteRoom(id);
        if (result.deletedCount && result.deletedCount > 0) {
            return res.status(204).send();
        }
        else {
            return res.status(404).json({ message: 'Room not found' });
        }
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
