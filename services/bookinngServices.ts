import { QueryTypes } from 'sequelize';
import { sequelize } from '../models/sequalize';
import { BookingInterface } from '../interfaces/BookingInterface';

export class BookingService {

  async createBooking(booking: BookingInterface): Promise<BookingInterface> {
    const sql = `
      INSERT INTO bookings 
        (first_Name, last_Name, orderDate, checkIn, checkOut, specialRequest, roomType, roomNumber, status)
      VALUES
        (:first_Name, :last_Name, :orderDate, :checkIn, :checkOut, :specialRequest, :roomType, :roomNumber, :status)
    `;
    await sequelize.query(sql, {
      replacements: {
        first_Name: booking.first_Name,
        last_Name: booking.last_Name,
        orderDate: booking.orderDate,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        specialRequest: booking.specialRequest,
        roomType: booking.roomType,
        roomNumber: booking.roomNumber,
        status: booking.status,
      },
      type: QueryTypes.INSERT,
    });
    return booking;
  }


  async updateBooking(id: number, edit: Partial<BookingInterface>): Promise<BookingInterface | null> {
    const sets: string[] = [];
    const replacements: any = { id };
    Object.entries(edit).forEach(([key, val], idx) => {
      sets.push(`${key} = :val${idx}`);
      replacements[`val${idx}`] = val;
    });
    const sql = `
      UPDATE bookings
         SET ${sets.join(', ')}
       WHERE id = :id
    `;
    const [, metadata] = await sequelize.query(sql, {
      replacements,
      type: QueryTypes.UPDATE,
    });
    if (metadata === 0) {
      throw new Error('Booking no encontrado');
    }
    return this.getBookingById(id);
  }

  async fetchAll(): Promise<BookingInterface[]> {
    const sql = `SELECT * FROM bookings`;
    const bookings = await sequelize.query<BookingInterface>(sql, {
      type: QueryTypes.SELECT,
    });
    return bookings;
  }


  async deleteBooking(id: number): Promise<number> {
    const [, metadata] = await sequelize.query('DELETE FROM bookings WHERE id = ?', {
      replacements: [id],
    });
    return (metadata as { affectedRows: number }).affectedRows;
  }


  async getBookingById(id: number): Promise<BookingInterface | null> {
    const sql = `SELECT * FROM bookings WHERE id = :id`;
    const bookings = await sequelize.query<BookingInterface>(sql, {
      replacements: { id },
      type: QueryTypes.SELECT,
    });
    return bookings.length > 0 ? bookings[0] : null;
  }
}
