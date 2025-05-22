// seedBookings.ts

import { faker } from '@faker-js/faker/locale/es';
import { BookingSchema } from '../models/BookingSchema';
import connectDB from './connection';

connectDB();

const roomTypes = ['Double Superior', 'Deluxe', 'Suite', 'Single'];
const statuses = ['checkIn', 'checkOut', 'In Progress'];

const generateFakeBookings = (count: number) => {
    const bookings = [];

    for (let i = 0; i < count; i++) {
        const orderDateObj = faker.date.between({ from: '2023-01-01', to: '2023-12-31' });
        const checkInOffsetDays = faker.number.int({ min: 1, max: 5 });
        const checkInObj = new Date(orderDateObj.getTime() + checkInOffsetDays * 24 * 60 * 60 * 1000);
        const checkOutOffsetDays = faker.number.int({ min: 1, max: 10 });
        const checkOutObj = new Date(checkInObj.getTime() + checkOutOffsetDays * 24 * 60 * 60 * 1000);

        bookings.push({
            first_Name: faker.person.firstName(),
            last_Name: faker.person.lastName(),
            orderDate: orderDateObj.toISOString(),
            checkIn: checkInObj.toISOString(),
            checkOut: checkOutObj.toISOString(),
            specialRequest: faker.lorem.sentence(),
            roomType: faker.helpers.arrayElement(roomTypes),
            roomNumber: faker.number.int({ min: 1, max: 200 }),
            status: faker.helpers.arrayElement(statuses)
        });
    }

    return bookings;
};

const seedBookings = async () => {
    try {
        await BookingSchema.deleteMany({});
        const fakeBookings = generateFakeBookings(10);
        await BookingSchema.insertMany(fakeBookings);
        console.log(`Insertadas ${fakeBookings.length} reservas con éxito.`);
        process.exit(0);
    } catch (error) {
        console.error('Error al insertar reservas:', error);
        process.exit(1);
    }
};

seedBookings();
