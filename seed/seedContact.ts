import { faker } from '@faker-js/faker/locale/es';
import { sequelize } from '../models/sequalize';
import { QueryTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

interface ContactInterface {
  id?: number;
  booking_id: number;
  Date: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  Subject: string;
  Comment: string;
  ARCHIVE?: string;
}

const generateFakeContacts = (count: number, bookingIds: number[]): ContactInterface[] => {
  const contacts: ContactInterface[] = [];
  for (let i = 0; i < count; i++) {
    const date = faker.date.recent({ days: 30 });
    contacts.push({
      booking_id: faker.helpers.arrayElement(bookingIds),
      Date: date.toISOString().split('T')[0],
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      Subject: faker.lorem.sentence(3),
      Comment: faker.lorem.paragraph(),
      ARCHIVE: faker.lorem.words(3),
    });
  }
  return contacts;
};

const seedContacts = async () => {
  try {
    await sequelize.query('DELETE FROM contact', { type: QueryTypes.DELETE });

    const bookings = await sequelize.query<{ id: number }>(
      'SELECT id FROM bookings',
      { type: QueryTypes.SELECT }
    );
    const bookingIds = bookings.map(b => b.id);
    if (bookingIds.length === 0) {
      console.error('No se encontraron bookings. Asegúrate de sembrar la tabla bookings primero.');
      process.exit(1);
    }

    const contacts = generateFakeContacts(20, bookingIds);

    const sql = `
      INSERT INTO contact
        (booking_id, Date, first_name, last_name, email, phone, Subject, Comment, ARCHIVE)
      VALUES
        (:booking_id, :Date, :first_name, :last_name, :email, :phone, :Subject, :Comment, :ARCHIVE)
    `;

    for (const contact of contacts) {
      await sequelize.query(sql, {
        replacements: {
          booking_id: contact.booking_id,
          Date: contact.Date,
          first_name: contact.first_name,
          last_name: contact.last_name,
          email: contact.email,
          phone: contact.phone,
          Subject: contact.Subject,
          Comment: contact.Comment,
          ARCHIVE: contact.ARCHIVE,
        },
        type: QueryTypes.INSERT,
      });
    }

    console.log("Seed de 'contact' completado.");
    process.exit(0);
  } catch (error) {
    console.error("Error al sembrar 'contact':", error);
    process.exit(1);
  }
};

seedContacts();
