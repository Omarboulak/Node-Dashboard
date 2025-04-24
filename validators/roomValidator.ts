import { RoomInterface } from "../interfaces/RoomInterface";

export class RoomValidator {
    static validateRoom(room: any, allUser: RoomInterface[]): RoomInterface | Boolean | string {

        const { room_id, room_type, description, photos, price, cancellation_policy, amenities } = room;
        if (!room_id) {
            return 'Tienes que introducir tu nombre completo'
        } else if (allUser.some(roomId => roomId.room_id === room.room_id)) {
            return 'el id no puede estar duplicado'
        } else if (room_type !== 'double superior' && room_type !== 'suite' && room_type !== 'single' && room_type !== 'double') {
            return 'tienes que poner una habitacion valida'
        } else if (!description) {
            return 'tienes que introducir una descripcion'
        } else if (!photos) {
            return 'tienes que introducir una foto de la habitacion'
        } else if (!price) {
            return 'tienes que introducir el precio de la habitacion'
        } else if (!price) {
            return 'tienes que introducir el precio de la habitacion'
        } else if (!cancellation_policy) {
            return 'tienes que introducir la politica de privacidad'
        } else if (!amenities) {
            return 'tienes que introducir las caracteristicas de la habitacion'
        }

        return room;
    }
}