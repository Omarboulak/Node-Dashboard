import { RoomInterface } from "../interfaces/RoomInterface";

export class RoomValidator {
    static validateRoom(room: any, allUser: RoomInterface[]): string[] {
        const error: string[] = []
        const { room_number, room_type, description, photos, price, cancellation_policy, amenities } = room;

        if (!room_number) {
            error.push('Tienes que introducir tu numero de la habitacion')
        } else if (allUser.some(roomId => roomId.room_number === room.room_id)) {
            error.push('el id no puede estar duplicado')
        } else if (room_type !== 'Double superior' && room_type !== 'suite' && room_type !== 'single' && room_type !== 'double') {
            error.push('tienes que poner una habitacion valida')
        } else if (!description) {
            error.push('tienes que introducir una descripcion')
        } else if (!price) {
            error.push('tienes que introducir el precio de la habitacion')
        } else if (!price) {
            error.push('tienes que introducir el precio de la habitacion')
        } else if (!cancellation_policy) {
            error.push('tienes que introducir la politica de privacidad')
        } else if (!amenities) {
            error.push('tienes que introducir las caracteristicas de la habitacion')
        }

        return error;
    }
}