"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomService = void 0;
const RoomSchema_1 = require("../models/RoomSchema");
class RoomService {
    async createRoom(room) {
        const newRoom = new RoomSchema_1.RoomSchema(room);
        return await newRoom.save();
    }
    async updateRoom(id, edit) {
        return await RoomSchema_1.RoomSchema.findOneAndUpdate({ room_id: id }, edit, {
            new: true,
            runValidators: true
        });
    }
    async fetchAll() {
        return await RoomSchema_1.RoomSchema.find();
    }
    async deleteRoom(id) {
        return await RoomSchema_1.RoomSchema.deleteOne({ room_id: id });
    }
    async getRoomById(id) {
        return await RoomSchema_1.RoomSchema.findOne({ room_id: id });
    }
}
exports.RoomService = RoomService;
