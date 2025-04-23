import { BookingInterface } from "../interfaces/BookingInterface";

export class BookingValidator {
    static validateBooking(booking: any, allBookig: BookingInterface[]): BookingInterface | Boolean | string {

        const { first_name, last_Name, orderDate, checkIn, checkOut, specialRequest, roomType, roomNumber, status } = booking;
        if (!first_name) {
            return 'Tienes que introducir tu nombre completo'
        } else if (status !== 'checkIn' && status !== 'checkOut' && status !== 'In Progress') {
            return 'status solo puede ser ACTIVE o INACTIVE'
        } else if (allBookig.some(bookingId => bookingId.ID === booking.ID)) {
            return 'el id no puede estar duplicado'
        } else if (last_Name === '') {
            return 'tienes que poner una foto'
        } else if (!orderDate) {
            return 'tienes que introducir una fecha'
        } else if (!checkIn) {
            return 'tienes que introducir una descripcion del trabajo'
        } else if (!checkOut) {
            return 'tienes que introducir un numero de contacto'
        } else if (!checkOut) {
            return 'tienes que introducir el checkOut'
        } else if (!specialRequest) {
            return 'tienes que introducir el specialRequest'
        } else if (roomType !== 'Double Superior' && roomType !== 'Double' && roomType !== 'luxyry' && roomType !== 'Single Bed') {
            return 'La habitacion elegida no existe'
        } else if (!roomNumber) {
            return 'tienes que introducir el numero de la habitacion'
        } else if (!roomNumber) {
            return 'tienes que introducir el numero de la habitacion'
        }

        return booking;
    }
}