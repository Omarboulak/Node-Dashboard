import { Request, Response, Router } from 'express'
import { BookingValidator } from '../validators/bookingValidator';
import { BookingService } from '../services/bookinngServices';
import { BookingInterface } from '../interfaces/BookingInterface';

const bookingService = new BookingService();
export const bookingRouter = Router();

bookingRouter.get('/', (req: Request, res: Response) => {
    const allbookings = bookingService.fetchAll()
    return res.status(200).json(allbookings);
})


bookingRouter.post('/', (req: Request, res: Response) => {
    const newbooking = bookingService.createBooking(req.body);
    res.status(201).json(newbooking);
    const allBooking = bookingService.fetchAll();

    const validation = BookingValidator.validateBooking(newbooking, allBooking);
    if (validation !== true) {
        return res.status(400).json({ error: validation });
    }
})


bookingRouter.put('/:id', (req: Request, res: Response) => {
const id = Number(req.params.id);
    const updates = req.body as Partial<BookingInterface>;
    const existing = bookingService.fetchAll().find(b => b.ID === id);
  
    if (!existing) {
      return res.status(404).json({ error: 'User not found' });
    }

    bookingService.updateBooking(id, updates);
    const updatedBooking = bookingService.fetchAll().find(b => b.ID === id);
    return res.status(200).json(updatedBooking);
  });


bookingRouter.delete('/:id', (req: Request, res: Response) => {
    const deletedbooking = bookingService.deleteBooking(Number(req.params.id));
    if (deletedbooking) {
        return res.status(204).json({ message: 'Server deleted' });
    } else {
        return res.status(404).json({ message: 'Server not found' });
    }
})



