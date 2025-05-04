import { BookingInterface } from '../interfaces/BookingInterface';
import { BookingSchema } from '../models/BookingSchema';

export class BookingService {
  async createBooking(booking: BookingInterface) {
    const newBooking = new BookingSchema(booking);
    return await newBooking.save();
  }

  async updateBooking(id: number, edit: Partial<BookingInterface>) {
    return await BookingSchema.findOneAndUpdate({ ID: id }, edit, {
      new: true,
      runValidators: true
    }
    );
  }

  async fetchAll() {
    return await BookingSchema.find();
  }

  async deleteBooking(id: number) {
    return await BookingSchema.deleteOne({ ID: id });
  }

  async getBookingById(id: number) {
    return await BookingSchema.findOne({ ID: id });
  }
}