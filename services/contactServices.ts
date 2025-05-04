import { ContactInterface } from '../interfaces/ContactInterface';
import { ContactSchema } from '../models/ContactSchema';

export class ContactService {
  async createContact(contact: ContactInterface) {
    const newContact = new ContactSchema(contact);
    return await newContact.save();
  }

  async updateContact(id: number, edit: Partial<ContactInterface>) {
    return await ContactSchema.findOneAndUpdate({ ID: id }, edit, {
      new: true,
      runValidators: true
    });
  }

  async fetchAll() {
    return await ContactSchema.find();
  }

  async deleteContact(id: number) {
    return await ContactSchema.deleteOne({ ID: id });
  }

  async getContactById(id: number) {
    return await ContactSchema.findOne({ ID: id });
  }
}