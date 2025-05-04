import { BookingInterface } from "../interfaces/BookingInterface";

export class BookingValidator {
    static validateBooking(booking: any, allBookig: BookingInterface[]): BookingInterface | Boolean | string {
        const error: string[] = []
        const { first_Name, last_Name, orderDate, checkIn, checkOut, specialRequest, roomType, roomNumber, status } = booking;
        if (!first_Name) {
           error.push('Tienes que introducir tu nombre completo')
        } else if (status !== 'checkIn' && status !== 'checkOut' && status !== 'In Progress') {
           error.push('status solo puede ser ACTIVE o INACTIVE')
        } else if (allBookig.some(bookingId => bookingId.ID === booking.ID)) {
           error.push('el id no puede estar duplicado')
        } else if (!last_Name) {
           error.push('tienes que introducir el apellido')
        } else if (!orderDate) {
           error.push('tienes que introducir una fecha')
        } else if (!checkIn) {
           error.push('tienes que introducir el chek in')
        } else if (!checkOut) {
           error.push('tienes que introducir el check out')
        } else if (!specialRequest) {
           error.push('tienes que introducir el specialRequest')
        } else if (roomType !== 'Double Superior' && roomType !== 'Double' && roomType !== 'luxyry' && roomType !== 'Single Bed') {
           error.push('La habitacion elegida no existe')
        } else if (!roomNumber) {
           error.push('tienes que introducir el numero de la habitacion')
        } else if (!roomNumber) {
           error.push('tienes que introducir el numero de la habitacion')
        }

       return error.length === 0 ? true : booking;
    }
}