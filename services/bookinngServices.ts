import { mysqlConnection } from '../seed/myqlConnection';
import { BookingInterface } from '../interfaces/BookingInterface';

export class BookingService {
  async createBooking(booking: BookingInterface) {
    const [result] = await mysqlConnection.execute(
      `INSERT INTO bookings 
      (first_Name, last_Name, orderDate, checkIn, checkOut, specialRequest, roomType, roomNumber, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        booking.first_Name,
        booking.last_Name,
        booking.orderDate,
        booking.checkIn,
        booking.checkOut,
        booking.specialRequest,
        booking.roomType,
        booking.roomNumber,
        booking.status
      ]
    );
    
    const insertResult = result as any;
    return { id: insertResult.insertId, ...booking };
  }

  async updateBooking(id: number, edit: Partial<BookingInterface>) {
    const fields = Object.keys(edit)
      .map(key => `${key} = ?`)
      .join(', ');

    const values = [...Object.values(edit), id];

    const [result] = await mysqlConnection.execute(
      `UPDATE bookings SET ${fields} WHERE id = ?`,
      values
    );

    const updateResult = result as any;
    if (updateResult.affectedRows === 0) {
      throw new Error('Booking no encontrado');
    }
    return this.getBookingById(id);
  }

  async fetchAll(): Promise<BookingInterface[]> {
    const [rows] = await mysqlConnection.execute('SELECT * FROM bookings');
    return rows as BookingInterface[];
  }

  async deleteBooking(id: number): Promise<{ affectedRows: number }> {
    const [result] = await mysqlConnection.execute('DELETE FROM bookings WHERE id = ?', [id]);
    const deleteResult = result as any;
    return { affectedRows: deleteResult.affectedRows };
  }

  async getBookingById(id: number): Promise<BookingInterface | null> {
    const [rows] = await mysqlConnection.execute('SELECT * FROM bookings WHERE id = ?', [id]);
    const bookings = rows as BookingInterface[];
    return bookings.length > 0 ? bookings[0] : null;
  }
}