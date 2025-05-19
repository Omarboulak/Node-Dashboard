import { faker } from '@faker-js/faker/locale/es';
import { sequelize } from '../models/sequalize'; 
import { QueryTypes } from 'sequelize';
import dotenv from 'dotenv';
import { UsersInterface } from '../interfaces/UsersInterface';

dotenv.config();

const generateFakeUsers = (count: number): UsersInterface[] => {
  const users: UsersInterface[] = [];
  for (let i = 0; i < count; i++) {
    users.push({
      Photo: faker.image.avatar(),
      FullName: faker.person.fullName(),
      Email: faker.internet.email(),
      StartDate:  faker.date.past({ years: 1 }).toISOString().split('T')[0], 
      JobDescription: faker.person.jobTitle() + ' - ' + faker.lorem.sentence(),
      Contact: faker.number.int({ min: 100000000, max: 999999999 }),
      Status: faker.helpers.arrayElement(['active', 'inactive']),
    });
  }
  return users;
};

const seedUsers = async () => {
  try {
    await sequelize.query('DELETE FROM usersEmp', { type: QueryTypes.DELETE });
    
    const users = generateFakeUsers(20);
    const sql = `INSERT INTO usersEmp (Photo, FullName, Email, StartDate, JobDescription, Contact, status)
      VALUES (:Photo, :FullName, :Email, :StartDate, :JobDescription, :Contact, :status)`;
    
    for (const user of users) {
      await sequelize.query(sql, {
        replacements: {
          Photo: user.Photo,
          FullName: user.FullName,
          Email: user.Email,
          StartDate: user.StartDate,
          JobDescription: user.JobDescription,
          Contact: user.Contact,
          status: user.Status,
        },
        type: QueryTypes.INSERT,
      });
    }
    
    console.log('Seed de users completado.');
    process.exit(0);
  } catch (error) {
    console.error('Error en seedUsers:', error);
    process.exit(1);
  }
};

seedUsers();
