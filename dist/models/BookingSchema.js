"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingSchema = void 0;
// src/models/BookingSchema.ts
const mongoose_1 = require("mongoose");
const Booking = new mongoose_1.Schema({
    ID: {
        type: Number,
        required: true,
        unique: true,
    },
    first_Name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        minlength: [2, 'Debe tener al menos 2 caracteres'],
    },
    last_Name: {
        type: String,
        required: [true, 'El apellido es obligatorio'],
        minlength: [2, 'Debe tener al menos 2 caracteres'],
    },
    orderDate: {
        type: String,
        required: [true, 'La fecha de reserva es obligatoria'],
    },
    checkIn: {
        type: String,
        required: [true, 'La fecha de entrada es obligatoria'],
    },
    checkOut: {
        type: String,
        required: [true, 'La fecha de salida es obligatoria'],
    },
    specialRequest: {
        type: String,
        required: false,
        trim: true,
    },
    roomType: {
        type: String,
        required: [true, 'El tipo de habitación es obligatorio'],
        enum: {
            values: ['Double', 'Deluxe', 'Suite', 'Single'],
            message: 'No es un tipo de habitación válido',
        },
    },
    roomNumber: {
        type: Number,
        required: [true, 'El número de habitación es obligatorio'],
        min: [1, 'Número de habitación debe ser positivo'],
    },
    status: {
        type: String,
        required: [true, 'El estado de la reserva es obligatorio'],
        enum: {
            values: ['checkedIn', 'checkedOut', 'In Progress'],
            message: 'no es un estado válido',
        },
    },
}, {
    timestamps: true,
});
exports.BookingSchema = (0, mongoose_1.model)('Booking', Booking);
