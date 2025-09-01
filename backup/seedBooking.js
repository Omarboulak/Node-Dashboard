"use strict";
// seedBookings.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const es_1 = require("@faker-js/faker/locale/es");
const BookingSchema_1 = require("../models/BookingSchema");
const connection_1 = __importDefault(require("./connection"));
(0, connection_1.default)();
const roomTypes = ['Double Superior', 'Deluxe', 'Suite', 'Single'];
const statuses = ['checkIn', 'checkOut', 'In Progress'];
const generateFakeBookings = (count) => {
    const bookings = [];
    for (let i = 0; i < count; i++) {
        const orderDateObj = es_1.faker.date.between({ from: '2023-01-01', to: '2023-12-31' });
        const checkInOffsetDays = es_1.faker.number.int({ min: 1, max: 5 });
        const checkInObj = new Date(orderDateObj.getTime() + checkInOffsetDays * 24 * 60 * 60 * 1000);
        const checkOutOffsetDays = es_1.faker.number.int({ min: 1, max: 10 });
        const checkOutObj = new Date(checkInObj.getTime() + checkOutOffsetDays * 24 * 60 * 60 * 1000);
        bookings.push({
            first_Name: es_1.faker.person.firstName(),
            last_Name: es_1.faker.person.lastName(),
            orderDate: orderDateObj.toISOString(),
            checkIn: checkInObj.toISOString(),
            checkOut: checkOutObj.toISOString(),
            specialRequest: es_1.faker.lorem.sentence(),
            roomType: es_1.faker.helpers.arrayElement(roomTypes),
            roomNumber: es_1.faker.number.int({ min: 1, max: 200 }),
            status: es_1.faker.helpers.arrayElement(statuses)
        });
    }
    return bookings;
};
const seedBookings = async () => {
    try {
        await BookingSchema_1.BookingSchema.deleteMany({});
        const fakeBookings = generateFakeBookings(10);
        await BookingSchema_1.BookingSchema.insertMany(fakeBookings);
        console.log(`Insertadas ${fakeBookings.length} reservas con éxito.`);
        process.exit(0);
    }
    catch (error) {
        console.error('Error al insertar reservas:', error);
        process.exit(1);
    }
};
seedBookings();
