import { Schema, model, Document } from 'mongoose';
import { ContactInterface } from '../interfaces/ContactInterface';

export interface ContactDocument extends ContactInterface, Document {}

const Contact = new Schema<ContactDocument>(
  {
    ID: {
      type: Number,
      required: true,
      unique: true,
    },
    Date: {
      type: String,
      required: [true, 'La fecha es obligatoria'],
    },
    first_name: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      minlength: [2, 'Debe tener al menos 2 caracteres'],
    },
    last_name: {
      type: String,
      required: [true, 'El apellido es obligatorio'],
      trim: true,
      minlength: [2, 'Debe tener al menos 2 caracteres'],
    },
    email: {
      type: String,
      required: [true, 'El correo es obligatorio'],
      unique: true,
      lowercase: true,
      match: [/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)/, 'El formato del email es inválido'],
    },
    phone: {
      type: String,
      required: [true, 'El teléfono es obligatorio'],
    },
    Subject: {
      type: String,
      required: [true, 'El asunto es obligatorio'],
    },
    Comment: {
      type: String,
      required: [true, 'El comentario es obligatorio'],
    },
    ARCHIVE: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const ContactSchema = model<ContactDocument>('Contact', Contact);
