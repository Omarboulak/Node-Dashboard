"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRouter = void 0;
const express_1 = require("express");
const contactValidator_1 = require("../validators/contactValidator");
const contactServices_1 = require("../services/contactServices");
const contactService = new contactServices_1.ContactService();
exports.contactRouter = (0, express_1.Router)();
exports.contactRouter.get('/', async (req, res) => {
    try {
        const allContacts = await contactService.fetchAll();
        return res.status(200).json(allContacts);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.contactRouter.post('/', async (req, res) => {
    try {
        const newContactData = req.body;
        const allContacts = await contactService.fetchAll();
        const validation = contactValidator_1.ContactValidator.validateContact(newContactData, allContacts);
        if (validation.length > 0) {
            return res.status(400).json({ error: validation });
        }
        const newContact = await contactService.createContact(newContactData);
        return res.status(201).json(newContact);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.contactRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const existing = await contactService.getContactById(id);
        if (!existing) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        const updatedContact = await contactService.updateContact(id, updates);
        return res.status(200).json(updatedContact);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.contactRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await contactService.deleteContact(id);
        if (result.deletedCount > 0) {
            return res.status(204).send();
        }
        else {
            return res.status(404).json({ message: 'Contact not found' });
        }
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
