"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const es_1 = require("@faker-js/faker/locale/es");
const RoomSchema_1 = require("../models/RoomSchema");
const connection_1 = __importDefault(require("./connection"));
const roomTypes = ["Single", "Double", "Suite", "Deluxe", "Presidential"];
const cancellationPolicies = ["Flexible", "Moderate", "Strict"];
const amenitiesOptions = [
    "WiFi, TV, Aire acondicionado",
    "WiFi, Minibar, Servicio a la habitación",
    "TV, Aire acondicionado, Piscina",
    "WiFi, Gimnasio, Spa"
];
const generateFakeRooms = (count) => {
    const rooms = [];
    for (let i = 0; i < count; i++) {
        // Asigna de manera secuencial un room_id único
        const room_id = i + 1;
        const room_type = es_1.faker.helpers.arrayElement(roomTypes);
        const description = es_1.faker.lorem.sentence();
        const photos = `https://picsum.photos/640/480?random=${es_1.faker.number.int({ min: 1, max: 10000 })}`;
        const offer = es_1.faker.helpers.arrayElement([true, false]);
        const price = es_1.faker.number.int({ min: 50, max: 500 });
        const discount = es_1.faker.number.int({ min: 0, max: 100 });
        const cancellation_policy = es_1.faker.helpers.arrayElement(cancellationPolicies);
        const amenities = es_1.faker.helpers.arrayElement(amenitiesOptions);
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
        await (0, connection_1.default)();
        await RoomSchema_1.RoomSchema.deleteMany({});
        const fakeRooms = generateFakeRooms(10);
        await RoomSchema_1.RoomSchema.insertMany(fakeRooms);
        console.log(`Insertadas ${fakeRooms.length} habitaciones con éxito.`);
        process.exit(0);
    }
    catch (error) {
        console.error('Error al insertar habitaciones:', error);
        process.exit(1);
    }
};
seedRooms();
