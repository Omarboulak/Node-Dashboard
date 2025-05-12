"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const ContactSchema_1 = require("../models/ContactSchema");
class ContactService {
    async createContact(contact) {
        const newContact = new ContactSchema_1.ContactSchema(contact);
        return await newContact.save();
    }
    async updateContact(id, edit) {
        return await ContactSchema_1.ContactSchema.findByIdAndUpdate(id, edit, { new: true, runValidators: true });
    }
    async fetchAll() {
        return await ContactSchema_1.ContactSchema.find();
    }
    async deleteContact(id) {
        const deleted = await ContactSchema_1.ContactSchema.findByIdAndDelete(id);
        return { deletedCount: deleted ? 1 : 0 };
    }
    async getContactById(id) {
        return await ContactSchema_1.ContactSchema.findById(id);
    }
}
exports.ContactService = ContactService;
