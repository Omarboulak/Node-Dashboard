import { Document, Types } from 'mongoose';
import { ContactInterface } from '../interfaces/ContactInterface';
import { ContactSchema, ContactDocument } from '../models/ContactSchema';

export class ContactService {
  async createContact(contact: ContactInterface): Promise<ContactDocument> {
    const newContact = new ContactSchema(contact);
    return await newContact.save();
  }

  async updateContact(id: string, edit: Partial<ContactInterface>) {
    return await ContactSchema.findByIdAndUpdate(id, edit,{ new: true, runValidators: true });
  }

  async fetchAll() {
    return await ContactSchema.find();
  }

  async deleteContact(id: string) {
    const deleted = await ContactSchema.findByIdAndDelete(id);
    return { deletedCount: deleted ? 1 : 0 };
  }

  async getContactById(id: string) {
    return await ContactSchema.findById(id);
  }
}
