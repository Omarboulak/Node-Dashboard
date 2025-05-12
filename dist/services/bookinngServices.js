"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const BookingSchema_1 = require("../models/BookingSchema");
class BookingService {
    async createBooking(booking) {
        const newBooking = new BookingSchema_1.BookingSchema(booking);
        return await newBooking.save();
    }
    async updateBooking(id, edit) {
        return await BookingSchema_1.BookingSchema.findOneAndUpdate({ ID: id }, edit, {
            new: true,
            runValidators: true
        });
    }
    async fetchAll() {
        return await BookingSchema_1.BookingSchema.find();
    }
    async deleteBooking(id) {
        return await BookingSchema_1.BookingSchema.deleteOne({ ID: id });
    }
    async getBookingById(id) {
        return await BookingSchema_1.BookingSchema.findOne({ ID: id });
    }
}
exports.BookingService = BookingService;
