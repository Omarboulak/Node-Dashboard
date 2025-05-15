import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const mysqlConnection = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '1234',
  database: 'miranda',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

const testConnection = async () => {
  try {
    const connection = await mysqlConnection.getConnection();
    connection.release();
  } catch (error) {
    process.exit(1);
  }
};

export { mysqlConnection, testConnection };