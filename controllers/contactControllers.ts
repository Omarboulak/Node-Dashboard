import { Request, Response, Router } from 'express';
import { ContactValidator } from '../validators/contactValidator';
import { ContactService } from '../services/contactServices';
import { ContactInterface } from '../interfaces/ContactInterface';

const contactService = new ContactService();
export const contactRouter = Router();

contactRouter.get('/', async (req: Request, res: Response) => {
    try {
        const allContacts = await contactService.fetchAll();
        return res.status(200).json(allContacts);
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
});

contactRouter.post('/', async (req: Request, res: Response) => {
    try {
        const newContactData = req.body;
        const allContacts = await contactService.fetchAll();
        
        const validation = ContactValidator.validateContact(newContactData, allContacts);
        if (validation.length > 0) {
            return res.status(400).json({ error: validation });
        }
        
        const newContact = await contactService.createContact(newContactData);
        return res.status(201).json(newContact);
        
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
});

contactRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const updates = req.body as Partial<ContactInterface>;
        
        const existing = await contactService.getContactById(id);
        if (!existing) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        
        const updatedContact = await contactService.updateContact(id, updates);
        return res.status(200).json(updatedContact);
        
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
});

contactRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await contactService.deleteContact(id);
        
        if (result.deletedCount && result.deletedCount > 0) {
            return res.status(204).send();
        } else {
            return res.status(404).json({ message: 'Contact not found' });
        }
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
});