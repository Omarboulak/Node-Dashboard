import { RoomInterface } from '../interfaces/RoomInterface';
import { RoomSchema } from '../models/RoomSchema';

export class RoomService {
 async createRoom(booking: RoomInterface) {
    const newRoom = new RoomSchema(booking);
    return await newRoom.save();
  }

  async updateRoom(id: string, edit: Partial<RoomInterface>) {
    return await RoomSchema.findByIdAndUpdate(id, edit,{ new: true, runValidators: true });
  }
  async fetchAll() {
    return await RoomSchema.find();
  }

  async deleteRoom(id: string) {
    const deleted = await RoomSchema.findByIdAndDelete(id);
    return { deletedCount: deleted ? 1 : 0 };
  }

  async getRoomById(id: string) {
    return await RoomSchema.findById(id);
  }
}