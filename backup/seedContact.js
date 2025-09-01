"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const es_1 = require("@faker-js/faker/locale/es");
const ContactSchema_1 = require("../models/ContactSchema");
const connection_1 = __importDefault(require("./connection"));
const generateFakeContacts = (count) => {
    const contacts = [];
    for (let i = 0; i < count; i++) {
        const DateValue = es_1.faker.date.recent({ days: 10 }).toISOString();
        const first_name = es_1.faker.person.firstName();
        const last_name = es_1.faker.person.lastName();
        const email = es_1.faker.internet.email({ firstName: first_name, lastName: last_name });
        const phone = es_1.faker.string.numeric(10);
        const Subject = es_1.faker.lorem.words({ min: 3, max: 50 });
        const Comment = es_1.faker.lorem.sentence();
        const ARCHIVE = es_1.faker.helpers.arrayElement(["true", "false"]);
        contacts.push({
            Date: DateValue,
            first_name,
            last_name,
            email,
            phone,
            Subject,
            Comment,
            ARCHIVE,
        });
    }
    return contacts;
};
const seedContacts = async () => {
    try {
        await (0, connection_1.default)();
        await ContactSchema_1.ContactSchema.deleteMany({});
        const fakeContacts = generateFakeContacts(10);
        await ContactSchema_1.ContactSchema.insertMany(fakeContacts);
        console.log(`Insertados ${fakeContacts.length} contactos correctamente.`);
        process.exit(0);
    }
    catch (error) {
        console.error('Error al insertar contactos:', error);
        process.exit(1);
    }
};
seedContacts();
