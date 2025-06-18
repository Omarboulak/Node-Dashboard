"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRouter = void 0;
const express_1 = require("express");
const bookingValidator_1 = require("../validators/bookingValidator");
const bookinngServices_1 = require("../services/bookinngServices");
const bookingService = new bookinngServices_1.BookingService();
exports.bookingRouter = (0, express_1.Router)();
exports.bookingRouter.get('/', async (req, res) => {
    try {
        const allBookings = await bookingService.fetchAll();
        return res.status(200).json(allBookings);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.bookingRouter.post('/', async (req, res) => {
    try {
        const newBookingData = req.body;
        const allBookings = await bookingService.fetchAll();
        const validation = bookingValidator_1.BookingValidator.validateBooking(newBookingData, allBookings);
        if (validation.length > 0) {
            return res.status(400).json({ error: validation });
        }
        const newBooking = await bookingService.createBooking(newBookingData);
        return res.status(201).json(newBooking);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.bookingRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const existing = await bookingService.getBookingById(id);
        if (!existing) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        const updatedBooking = await bookingService.updateBooking(id, updates);
        return res.status(200).json(updatedBooking);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.bookingRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await bookingService.deleteBooking(id);
        if (result.deletedCount > 0) {
            return res.status(204).send();
        }
        else {
            return res.status(404).json({ message: 'Booking not found' });
        }
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
