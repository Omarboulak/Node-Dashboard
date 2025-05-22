import { faker } from '@faker-js/faker/locale/es';
import { RoomSchema } from '../models/RoomSchema';
import connectDB from './connection';

const roomTypes = ["Single", "Double", "Suite", "Deluxe", "Presidential"];
const cancellationPolicies = ["Flexible", "Moderate", "Strict"];
const amenitiesOptions = [
  "WiFi, TV, Aire acondicionado",
  "WiFi, Minibar, Servicio a la habitación",
  "TV, Aire acondicionado, Piscina",
  "WiFi, Gimnasio, Spa"
];

const generateFakeRooms = (count: number) => {
  const rooms = [];

  for (let i = 0; i < count; i++) {
    // Asigna de manera secuencial un room_id único
    const room_id = i + 1;
    const room_type = faker.helpers.arrayElement(roomTypes);
    const description = faker.lorem.sentence();
    const photos = `https://picsum.photos/640/480?random=${faker.number.int({ min: 1, max: 10000 })}`;
    const offer = faker.helpers.arrayElement([true, false]);
    const price = faker.number.int({ min: 50, max: 500 });
    const discount = faker.number.int({ min: 0, max: 100 });
    const cancellation_policy = faker.helpers.arrayElement(cancellationPolicies);
    const amenities = faker.helpers.arrayElement(amenitiesOptions);

    rooms.push({
      room_id,
      room_type,
      description,
      photos,
      offer,
      price,
      discount,
      cancellation_policy,
      amenities,
    });
  }

  return rooms;
};

const seedRooms = async () => {
  try {
    await connectDB();
    await RoomSchema.deleteMany({});
    const fakeRooms = generateFakeRooms(10);
    await RoomSchema.insertMany(fakeRooms);
    console.log(`Insertadas ${fakeRooms.length} habitaciones con éxito.`);
    process.exit(0);
  } catch (error) {
    console.error('Error al insertar habitaciones:', error);
    process.exit(1);
  }
};

seedRooms();
