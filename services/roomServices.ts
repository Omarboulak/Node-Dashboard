import { QueryTypes } from 'sequelize';
import { sequelize } from '../models/sequalize';
import { RoomInterface } from '../interfaces/RoomInterface';

export class RoomService {
  async createRoom(room: RoomInterface) {
    const sql = `
      INSERT INTO rooms
        (room_number, room_type, description, photos, offer, price, discount, cancellation_policy, amenities)
      VALUES
        (:room_number, :room_type, :description, :photos, :offer, :price, :discount, :cancellation_policy, :amenities)
    `;
    await sequelize.query(sql, {
      replacements: {
        room_number: room.room_number,
        room_type: room.room_type,
        description: room.description,
        photos: room.photos,
        offer: room.offer ? 1 : 0,
        price: room.price,
        discount: room.discount,
        cancellation_policy: room.cancellation_policy,
        amenities: room.amenities,
      },
      type: QueryTypes.INSERT,
    });
    return room;
  }

  async updateRoom(room_number: number, edit: Partial<RoomInterface>) {
    const sets: string[] = [];
    const replacements: any = { room_number };
    Object.entries(edit).forEach(([key, val], idx) => {
      sets.push(`${key} = :val${idx}`);
      replacements[`val${idx}`] = val;
    });
    const sql = `
      UPDATE rooms
         SET ${sets.join(', ')}
       WHERE room_number = :room_number
    `;
    const [_, metadata] = await sequelize.query(sql, {
      replacements,
      type: QueryTypes.UPDATE,
    });
    if (metadata === 0) {
      throw new Error('Room no encontrado');
    }
    return this.getRoomById(room_number);
  }

  async fetchAll(): Promise<RoomInterface[]> {
    const sql = `SELECT * FROM rooms`;
    const rooms = await sequelize.query<RoomInterface>(sql, {
      type: QueryTypes.SELECT,
    });
    return rooms;
  }


  async deleteRoom(id: number) {
    const [_, metadata] = await sequelize.query('DELETE FROM rooms WHERE room_number = ?', {
      replacements: [id],
    });

    return (metadata as { affectedRows: number }).affectedRows;
  }


  async getRoomById(room_number: number): Promise<RoomInterface | null> {
    const sql = `SELECT * FROM rooms WHERE room_number = :room_number`;
    const rooms = await sequelize.query<RoomInterface>(sql, {
      replacements: { room_number },
      type: QueryTypes.SELECT,
    });
    return rooms.length > 0 ? rooms[0] : null;
  }
}
