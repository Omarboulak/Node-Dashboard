import bcrypt from 'bcryptjs';
import { mysqlConnection } from './myqlConnection';

async function seed() {
  const username = 'admin';
  const plainPassword = 'admin';

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(plainPassword, salt);

  await mysqlConnection.execute(
    'INSERT IGNORE INTO users (username, password) VALUES (?, ?)',
    [username, hash]
  );

  console.log(`✅ Usuario '${username}' sembrado con contraseña 'admin' (hashed).`);
  process.exit(0);
}

seed();
