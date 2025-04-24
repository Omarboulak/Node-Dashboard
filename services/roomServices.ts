import room from '../public/Rooms.json' 
import { RoomInterface } from '../interfaces/RoomInterface'

export class RoomService {

    private roomList : RoomInterface[] = room;
    
    createRoom(room: RoomInterface){
        this.roomList.push(room)
        return room;
    }

    updateRoom(id: number, edit: Partial<RoomInterface>){
        this.roomList = this.roomList.map(row => row.room_id === id ? {...row, ...edit} : row)
    }

    fetchAll(){
        return this.roomList;
    }

    deleteRoom(id: number){
        return this.roomList = this.roomList.filter(room => room.room_id !== id)
    }
}