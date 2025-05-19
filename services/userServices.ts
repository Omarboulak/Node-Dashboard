import { QueryTypes } from 'sequelize';
import { sequelize } from '../models/sequalize';
import { UsersInterface } from '../interfaces/UsersInterface';

export class UserService {
  async createUser(user: UsersInterface): Promise<UsersInterface> {
    const sql = `
      INSERT INTO users
        (Photo, FullName, Email, StartDate, JobDescription, Contact, status)
      VALUES
        (:Photo, :FullName, :Email, :StartDate, :JobDescription, :Contact, :status)
    `;
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
    return user;
  }

  async updateUser(id: number, edit: Partial<UsersInterface>): Promise<UsersInterface | null> {
    const sets: string[] = [];
    const replacements: any = { id };
    Object.entries(edit).forEach(([key, val], idx) => {
      sets.push(`${key} = :val${idx}`);
      replacements[`val${idx}`] = val;
    });
    const sql = `UPDATE users SET ${sets.join(', ')} WHERE id = :id`;
    const [_, metadata] = await sequelize.query(sql, {
      replacements,
      type: QueryTypes.UPDATE,
    });
    if (metadata === 0) {
      throw new Error('User not found');
    }
    return this.getUserById(id);
  }

  async fetchAll(): Promise<UsersInterface[]> {
    const sql = `SELECT * FROM users`;
    const users = await sequelize.query<UsersInterface>(sql, {
      type: QueryTypes.SELECT,
    });
    return users;
  }

  async deleteUser(id: number): Promise<number> {
    const result: any = await sequelize.query('DELETE FROM users WHERE id = ?', {
      replacements: [id],
      type: QueryTypes.DELETE,
    });
    return result.affectedRows || 0;
  }

  async getUserById(id: number): Promise<UsersInterface | null> {
    const sql = `SELECT * FROM users WHERE id = :id`;
    const users = await sequelize.query<UsersInterface>(sql, {
      replacements: { id },
      type: QueryTypes.SELECT,
    });
    return users.length > 0 ? users[0] : null;
  }
}
