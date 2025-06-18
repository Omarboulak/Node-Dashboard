"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomService = void 0;
const RoomSchema_1 = require("../models/RoomSchema");
class RoomService {
    async createRoom(booking) {
        const newRoom = new RoomSchema_1.RoomSchema(booking);
        return await newRoom.save();
    }
    async updateRoom(id, edit) {
        return await RoomSchema_1.RoomSchema.findByIdAndUpdate(id, edit, { new: true, runValidators: true });
    }
    async fetchAll() {
        return await RoomSchema_1.RoomSchema.find();
    }
    async deleteRoom(id) {
        const deleted = await RoomSchema_1.RoomSchema.findByIdAndDelete(id);
        return { deletedCount: deleted ? 1 : 0 };
    }
    async getRoomById(id) {
        return await RoomSchema_1.RoomSchema.findById(id);
    }
}
exports.RoomService = RoomService;
