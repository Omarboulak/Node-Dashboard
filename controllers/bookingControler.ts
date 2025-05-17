import { Request, Response, Router } from 'express';
import { BookingValidator } from '../validators/bookingValidator';
import { BookingService } from '../services/bookinngServices';
import { BookingInterface } from '../interfaces/BookingInterface';

const bookingService = new BookingService();
export const bookingRouter = Router();

bookingRouter.get('/', async (req: Request, res: Response) => {
    try {
        const allBookings = await bookingService.fetchAll();
        return res.status(200).json(allBookings);
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
});

bookingRouter.post('/', async (req: Request, res: Response) => {
    try {
        const newBookingData = req.body;
        const allBookings = await bookingService.fetchAll();
        
        const validation = BookingValidator.validateBooking(newBookingData, allBookings);
        if (validation.length > 0) {
            return res.status(400).json({ error: validation });
        }
        
        const newBooking = await bookingService.createBooking(newBookingData);
        return res.status(201).json(newBooking);
        
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
});

bookingRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const updates = req.body as Partial<BookingInterface>;
        
        const existing = await bookingService.getBookingById(id);
        if (!existing) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        
        const updatedBooking = await bookingService.updateBooking(id, updates);
        return res.status(200).json(updatedBooking);
        
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
});

bookingRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id); 
        const result = await bookingService.deleteBooking(id);
        
        if (result > 0) {
            return res.status(204).send();
        } else {
            return res.status(404).json({ message: 'Booking not found' });
        }
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
});