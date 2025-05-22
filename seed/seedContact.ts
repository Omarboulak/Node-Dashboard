import { faker } from '@faker-js/faker/locale/es';
import { ContactSchema } from '../models/ContactSchema';
import connectDB from './connection';

const generateFakeContacts = (count: number) => {
    const contacts = [];

    for (let i = 0; i < count; i++) {
        const DateValue = faker.date.recent({ days: 10 }).toISOString();
        const first_name = faker.person.firstName();
        const last_name = faker.person.lastName();
        const email = faker.internet.email({ firstName: first_name, lastName: last_name });
        const phone = faker.string.numeric(10);
        const Subject = faker.lorem.words({ min: 3, max: 50 });
        const Comment = faker.lorem.sentence();
        const ARCHIVE = faker.helpers.arrayElement(["true", "false"]);

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
        await connectDB();
        await ContactSchema.deleteMany({});
        const fakeContacts = generateFakeContacts(10);
        await ContactSchema.insertMany(fakeContacts);

        console.log(`Insertados ${fakeContacts.length} contactos correctamente.`);
        process.exit(0);
    } catch (error) {
        console.error('Error al insertar contactos:', error);
        process.exit(1);
    }
};

seedContacts();
