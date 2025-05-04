import { RoomInterface } from '../interfaces/RoomInterface';
import { RoomSchema } from '../models/RoomSchema';

export class RoomService {
  async createRoom(room: RoomInterface) {
    const newRoom = new RoomSchema(room);
    return await newRoom.save();
  }

  async updateRoom(id: number, edit: Partial<RoomInterface>) {
    return await RoomSchema.findOneAndUpdate({ room_id: id }, edit, {
      new: true,
      runValidators: true
    });
  }

  async fetchAll() {
    return await RoomSchema.find();
  }

  async deleteRoom(id: number) {
    return await RoomSchema.deleteOne({ room_id: id });
  }

  async getRoomById(id: number) {
    return await RoomSchema.findOne({ room_id: id });
  }
}