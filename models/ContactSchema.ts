import { Schema, model, Document } from 'mongoose';
import { ContactInterface } from '../interfaces/ContactInterface';

export interface ContactDocument extends Omit<ContactInterface, 'id'>, Document {}

const Contact = new Schema<ContactDocument>({
  Date:      { type: String, required: [true, 'La fecha es obligatoria'] },
  first_name:{ type: String, required: [true, 'El nombre es obligatorio'], minlength: 2, trim: true },
  last_name: { type: String, required: [true, 'El apellido es obligatorio'], minlength: 2, trim: true },
  email:     { type: String, required: [true, 'El correo es obligatorio'], unique: true,
               match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'El formato del email es inválido'] },
  phone:     { type: String, required: [true, 'El teléfono es obligatorio'] },
  Subject:   { type: String, required: [true, 'El asunto es obligatorio'] },
  Comment:   { type: String, required: [true, 'El comentario es obligatorio'] },
  ARCHIVE:   { type: String, required: [true, 'El si es Archive es obligatorio'] },
}, {
  timestamps: true,
});

Contact.set('toJSON', {
  virtuals: true,       
  versionKey: false,    
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();  
    delete ret._id;               
  },
});

export const ContactSchema = model<ContactDocument>('Contact', Contact);
