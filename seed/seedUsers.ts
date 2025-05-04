import { faker } from '@faker-js/faker/locale/es';
import { UserSchema } from '../models/UserSchema';
import connectDB from './connection';

connectDB();

const generateFakeUsers = (count: number) => {
  const users = [];
  
  for (let i = 0; i < count; i++) {
    users.push({
      ID: faker.number.int({ min: 0, max: 9999 }),
      Photo: faker.image.avatar(),
      FullName: faker.person.fullName(),
      Email: faker.internet.email(),
      StartDate: faker.date.between({ from: '2000-01-01', to: Date.now() }),
      JobDescription: faker.person.jobTitle(),
      Contact: faker.phone.number(),
      Status: faker.helpers.arrayElement(['ACTIVE', 'INACTIVE'])
    });
  }
  
  return users;
};

const seedUsers = async () => {
  try {
    await UserSchema.deleteMany({});     
    const fakeUsers = generateFakeUsers(10); 
    await UserSchema.insertMany(fakeUsers);
    
    process.exit();
  } catch (error) {
    process.exit(1);
  }
};

seedUsers();