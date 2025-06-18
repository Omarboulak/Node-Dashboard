"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomValidator = void 0;
class RoomValidator {
    static validateRoom(room) {
        const error = [];
        const { room_type, description, photos, price, cancellation_policy, amenities } = room;
        if (room_type !== 'Double Superior' && room_type !== 'suite' && room_type !== 'single' && room_type !== 'double') {
            error.push('tienes que poner una habitacion valida');
        }
        else if (!description) {
            error.push('tienes que introducir una descripcion');
        }
        else if (!photos) {
            error.push('tienes que introducir una foto de la habitacion');
        }
        else if (!price) {
            error.push('tienes que introducir el precio de la habitacion');
        }
        else if (!price) {
            error.push('tienes que introducir el precio de la habitacion');
        }
        else if (!cancellation_policy) {
            error.push('tienes que introducir la politica de privacidad');
        }
        else if (!amenities) {
            error.push('tienes que introducir las caracteristicas de la habitacion');
        }
        return error;
    }
}
exports.RoomValidator = RoomValidator;
