import { Request, Response, Router } from 'express'
import { ContactValidator } from '../validators/contactValidator';
import { ContactService } from '../services/contactServices';
import { ContactInterface } from '../interfaces/ContactInterface';

const contactService = new ContactService();
export const contactRouter = Router();

contactRouter.get('/', (req: Request, res: Response) => {
    const allcontacts = contactService.fetchAll()
    return res.status(200).json(allcontacts);
})


contactRouter.post('/', (req: Request, res: Response) => {
    const newcontact = contactService.createContact(req.body);
    res.status(201).json(newcontact);
    const allContact = contactService.fetchAll();

    const validation = ContactValidator.validateContact(newcontact, allContact);
    if (validation !== true) {
        return res.status(400).json({ error: validation });
    }
})


contactRouter.put('/:id', (req: Request, res: Response) => {
const id = Number(req.params.id);
    const updates = req.body as Partial<ContactInterface>;
    const existing = contactService.fetchAll().find(c => c.ID === id);
  
    if (!existing) {
      return res.status(404).json({ error: 'User not found' });
    }

    contactService.updateContact(id, updates);
    const updatedContact = contactService.fetchAll().find(c => c.ID === id);
    return res.status(200).json(updatedContact);
  });


contactRouter.delete('/:id', (req: Request, res: Response) => {
    const deletedcontact = contactService.deleteContact(Number(req.params.id));
    if (deletedcontact) {
        return res.status(204).json({ message: 'Server deleted' });
    } else {
        return res.status(404).json({ message: 'Server not found' });
    }
})



