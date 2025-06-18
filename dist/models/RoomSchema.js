"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomSchema = void 0;
const mongoose_1 = require("mongoose");
const Room = new mongoose_1.Schema({
    room_type: {
        type: String,
        required: [true, 'El tipo de habitación es obligatorio'],
        minlength: [3, 'Debe tener al menos 3 caracteres'],
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
    },
    photos: {
        type: String,
        required: false,
        default: null,
    },
    offer: {
        type: Boolean,
        required: true,
        default: false,
    },
    price: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo'],
    },
    discount: {
        type: Number,
        required: true,
        min: [0, 'El descuento no puede ser negativo'],
        max: [100, 'El descuento no puede superar 100%'],
    },
    cancellation_policy: {
        type: String,
        required: [true, 'La política de cancelación es obligatoria'],
    },
    amenities: {
        type: String,
        required: [true, 'Las amenities son obligatorias'],
    },
}, {
    timestamps: true,
});
exports.RoomSchema = (0, mongoose_1.model)('Room', Room);
