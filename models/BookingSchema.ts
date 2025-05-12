import { Schema, model, Document } from 'mongoose';
import { BookingInterface } from '../interfaces/BookingInterface';

export interface BookingDocument extends Omit<BookingInterface, 'id'>, Document { }

const Booking = new Schema<BookingDocument>(
  {

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
        values: ['Double Superior', 'Deluxe', 'Suite', 'Single'],
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
        values: ['checkIn', 'checkOut', 'In Progress'],
        message: 'no es un estado válido',
      },
    },
  },
  {
    timestamps: true,
  }
);

Booking.set('toJSON', {
  virtuals: true,      
  versionKey: false,   
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
  },
});


export const BookingSchema = model<BookingDocument>('Booking', Booking);
