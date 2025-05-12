import { BookingInterface } from '../interfaces/BookingInterface';
import { BookingSchema } from '../models/BookingSchema';

export class BookingService {
  async createBooking(booking: BookingInterface) {
    const newBooking = new BookingSchema(booking);
    return await newBooking.save();
  }

  async updateBooking(id: string, edit: Partial<BookingInterface>) {
    return await BookingSchema.findByIdAndUpdate(id, edit,{ new: true, runValidators: true });
  }
  async fetchAll() {
    return await BookingSchema.find();
  }

  async deleteBooking(id: string) {
    const deleted = await BookingSchema.findByIdAndDelete(id);
    return { deletedCount: deleted ? 1 : 0 };
  }

  async getBookingById(id: string) {
    return await BookingSchema.findById(id);
  }
}