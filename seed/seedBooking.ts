import { faker } from '@faker-js/faker/locale/es';
import { sequelize } from '../models/sequalize';
import { QueryTypes } from 'sequelize';
import dotenv from 'dotenv';
import { BookingInterface } from '../interfaces/BookingInterface';

dotenv.config();

const generateFakeBookings = (count: number, roomNumbers: number[]): BookingInterface[] => {
  const statuses = ['In Progress', 'checkIn', 'checkOut'];
  const types = ['Single', 'Double', 'Suite', 'Double Superior'];
  const bookings: BookingInterface[] = [];
  
  for (let i = 0; i < count; i++) {
    const checkIn = faker.date.future({ years: 1 });
    const checkOut = faker.date.soon({ days: 7, refDate: checkIn });
    
    bookings.push({
      id: 0, 
      first_Name: faker.person.firstName(),
      last_Name: faker.person.lastName(),
      orderDate: faker.date.past({ years: 1 }).toISOString().split('T')[0],
      checkIn: checkIn.toISOString().split('T')[0],
      checkOut: checkOut.toISOString().split('T')[0],
      specialRequest: faker.lorem.sentence(),
      roomType: faker.helpers.arrayElement(types),
      roomNumber: faker.helpers.arrayElement(roomNumbers),
      status: faker.helpers.arrayElement(statuses),
    });
  }
  return bookings;
};

const seedBookings = async () => {
  try {
    await sequelize.query('DELETE FROM bookings', { type: QueryTypes.DELETE });

    const rooms = await sequelize.query<{ room_number: number }>('SELECT room_number FROM rooms', {
      type: QueryTypes.SELECT,
    });
    const roomNumbers = rooms.map(room => room.room_number);
    if (roomNumbers.length === 0) {
      console.error('No se encontraron habitaciones. Asegúrate de haber sembrado las rooms primero.');
      process.exit(1);
    }

    const bookings = generateFakeBookings(20, roomNumbers);

    const sql = `
      INSERT INTO bookings
        (first_Name, last_Name, orderDate, checkIn, checkOut, specialRequest, roomType, roomNumber, status)
      VALUES
        (:first_Name, :last_Name, :orderDate, :checkIn, :checkOut, :specialRequest, :roomType, :roomNumber, :status)
    `;

    for (const booking of bookings) {
      await sequelize.query(sql, {
        replacements: {
          first_Name: booking.first_Name,
          last_Name: booking.last_Name,
          orderDate: booking.orderDate,
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
          specialRequest: booking.specialRequest,
          roomType: booking.roomType,
          roomNumber: booking.roomNumber,
          status: booking.status,
        },
        type: QueryTypes.INSERT,
      });
    }

    console.log('Seed de bookings completado.');
    process.exit(0);
  } catch (error) {
    console.error('Error al sembrar bookings:', error);
    process.exit(1);
  }
};

seedBookings();
