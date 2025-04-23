import bookings from '../public/Booking.json' 
import { BookingInterface } from '../interfaces/BookingInterface'

export class BookingService {

    private bookingList : BookingInterface[] = bookings;
    
    createBooking(booking: BookingInterface){
        this.bookingList.push(booking)
        return booking;
    }

    updateBooking(id: number, edit: Partial<BookingInterface>){
        this.bookingList = this.bookingList.map(row => row.ID === id ? {...row, ...edit} : row)
    }

    fetchAll(){
        return this.bookingList;
    }

    deleteBooking(id: number){
        return this.bookingList = this.bookingList.filter(Booking => Booking.ID !== id)
    }
}