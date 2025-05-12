"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const es_1 = require("@faker-js/faker/locale/es");
const UserSchema_1 = require("../models/UserSchema");
const connection_1 = __importDefault(require("./connection"));
(0, connection_1.default)();
const generateFakeUsers = (count) => {
    const users = [];
    for (let i = 0; i < count; i++) {
        users.push({
            ID: es_1.faker.number.int({ min: 0, max: 9999 }),
            Photo: es_1.faker.image.avatar(),
            FullName: es_1.faker.person.fullName(),
            Email: es_1.faker.internet.email(),
            StartDate: es_1.faker.date.between({ from: '2000-01-01', to: Date.now() }),
            JobDescription: es_1.faker.person.jobTitle(),
            Contact: es_1.faker.phone.number(),
            Status: es_1.faker.helpers.arrayElement(['ACTIVE', 'INACTIVE'])
        });
    }
    return users;
};
const seedUsers = async () => {
    try {
        await UserSchema_1.UserSchema.deleteMany({});
        const fakeUsers = generateFakeUsers(10);
        await UserSchema_1.UserSchema.insertMany(fakeUsers);
        process.exit();
    }
    catch (error) {
        process.exit(1);
    }
};
seedUsers();
