import { Request, Response, Router } from 'express'
import { RoomValidator } from '../validators/roomValidator';
import { RoomService } from '../services/roomServices';
import { RoomInterface } from '../interfaces/RoomInterface';

const roomService = new RoomService();
export const roomRouter = Router();

roomRouter.get('/', (req: Request, res: Response) => {
    const allrooms = roomService.fetchAll()
    return res.status(200).json(allrooms);
})


roomRouter.post('/', (req: Request, res: Response) => {
    const newroom = roomService.createRoom(req.body);
    res.status(201).json(newroom);
    const allRoom = roomService.fetchAll();

    const validation = RoomValidator.validateRoom(newroom, allRoom);
    if (validation !== true) {
        return res.status(400).json({ error: validation });
    }
})


roomRouter.put('/:id', (req: Request, res: Response) => {
const id = Number(req.params.id);
    const updates = req.body as Partial<RoomInterface>;
    const existing = roomService.fetchAll().find(r => r.room_id === id);
  
    if (!existing) {
      return res.status(404).json({ error: 'User not found' });
    }

    roomService.updateRoom(id, updates);
    const updatedRoom = roomService.fetchAll().find(r => r.room_id === id);
    return res.status(200).json(updatedRoom);
  });


roomRouter.delete('/:id', (req: Request, res: Response) => {
    const deletedroom = roomService.deleteRoom(Number(req.params.id));
    if (deletedroom) {
        return res.status(204).json({ message: 'Server deleted' });
    } else {
        return res.status(404).json({ message: 'Server not found' });
    }
})