import { faker } from '@faker-js/faker/locale/es';
import { sequelize } from '../models/sequalize';
import { QueryTypes } from 'sequelize';
import dotenv from 'dotenv';
import { RoomInterface } from '../interfaces/RoomInterface';

dotenv.config();

const generateFakeRooms = (count: number): RoomInterface[] => {
    const types = ['Single', 'Double', 'Suite', 'Double Superior'];
    const amenitiesList = ['WiFi', 'TV', 'Aire acondicionado', 'Minibar', 'Caja fuerte'];
    const rooms: RoomInterface[] = [];
    for (let i = 0; i < count; i++) {
        rooms.push({
            room_number: faker.number.int({ min: 100, max: 999 }),
            room_type: faker.helpers.arrayElement(types),
            description: faker.lorem.sentences(2),
            photos: faker.image.urlLoremFlickr({ category: 'hotel', width: 640, height: 480 }),
            offer: faker.datatype.boolean(),
            price: parseFloat(faker.commerce.price({ min: 50, max: 300, dec: 2 })),
            discount: parseFloat(faker.commerce.price({ min: 0, max: 100, dec: 2 })),
            cancellation_policy: faker.lorem.sentence(),
            amenities: faker.helpers.arrayElements(amenitiesList, faker.number.int({ min: 1, max: amenitiesList.length })).join(', ')
        });
    }
    return rooms;
};

const seedRooms = async () => {
    await sequelize.query('DELETE FROM rooms', { type: QueryTypes.DELETE });
    const rooms = generateFakeRooms(20);

    const sql = `
    INSERT INTO rooms
      (room_number, room_type, description, photos, offer, price, discount, cancellation_policy, amenities)
    VALUES
      (:room_number, :room_type, :description, :photos, :offer, :price, :discount, :cancellation_policy, :amenities)
  `;

    for (const room of rooms) {
        await sequelize.query(sql, {
            replacements: {
                room_number: room.room_number,
                room_type: room.room_type,
                description: room.description,
                photos: room.photos,
                offer: room.offer ? 1 : 0,
                price: room.price,
                discount: room.discount,
                cancellation_policy: room.cancellation_policy,
                amenities: room.amenities,
            },
            type: QueryTypes.INSERT,
        });
    }

    process.exit(0);
};

seedRooms();
