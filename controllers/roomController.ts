import { Request, Response, Router } from 'express';
import { RoomValidator } from '../validators/roomValidator';
import { RoomService } from '../services/roomServices';
import { RoomInterface } from '../interfaces/RoomInterface';

const roomService = new RoomService();
export const roomRouter = Router();

roomRouter.get('/', async (req: Request, res: Response) => {
    try {
        const allRooms = await roomService.fetchAll();
        return res.status(200).json(allRooms);
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
});

roomRouter.post('/', async (req: Request, res: Response) => {
    try {
        const newRoomData = req.body;
        const allRooms = await roomService.fetchAll();
        
        const validation = RoomValidator.validateRoom(newRoomData, allRooms);
        if (validation.length > 0) {
            return res.status(400).json({ error: validation });
        }
        
        const newRoom = await roomService.createRoom(newRoomData);
        return res.status(201).json(newRoom);
        
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
});

roomRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const updates = req.body as Partial<RoomInterface>;
        
        const existing = await roomService.getRoomById(id);
        if (!existing) {
            return res.status(404).json({ error: 'Room not found' });
        }
        
        const updatedRoom = await roomService.updateRoom(id, updates);
        return res.status(200).json(updatedRoom);
        
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
});

roomRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid room ID' });
    }

    const result = await roomService.deleteRoom(id);
    
    if (result > 0) { 
      return res.status(204).send();
    } else {
      return res.status(404).json({ message: 'Room not found' });
    }
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});