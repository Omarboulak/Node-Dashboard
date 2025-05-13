import { Schema, model, Document } from 'mongoose';
import { UsersInterface } from '../interfaces/UsersInterface';

export interface UserDocument extends Omit<UsersInterface,'id'>, Document {}

const User = new Schema<UserDocument>({
  Photo: {
    type: String,
    required: false,
  },
  FullName: {
    type: String,
    required: [true, 'El nombre completo es obligatorio'],
    trim: true,
    minlength: [3, 'El nombre debe tener al menos 3 caracteres']
  },
  Email: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true,
    match: [ /^[\w-+.']+(\.[\w-+']+)*@[\w-]+(\.[\w-]+)*(\.[a-z]{2,})$/i, 'El formato del email es inválido']
  },
  StartDate: {
    type: String,
    required: [true, 'La fecha de inicio es obligatoria']
  },
  JobDescription: {
    type: String,
    required: [true, 'La descripción del trabajo es obligatoria'],
    trim: true
  },
  Contact: {
    type: String,
    required: [true, 'El contacto es obligatorio'],
  },
  Status: {
    type: String,
    required: [true, 'El estado es obligatorio'],
    enum: {
      values: ['ACTIVE', 'INACTIVE'],
      message: '`{VALUE}` no es un estado válido'
    }
  }
}, {
  timestamps: true   
});

User.set('toJSON', {
  virtuals:    true,
  versionKey:  false,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
  },
});

export const UserSchema = model<UserDocument>('User', User);
