import { QueryTypes } from 'sequelize';
import { sequelize } from '../models/sequalize';
import { ContactInterface } from '../interfaces/ContactInterface';

export class ContactService {
  async createContact(contact: ContactInterface): Promise<ContactInterface> {
    const sql = `
      INSERT INTO contact
        (booking_id, Date, first_name, last_name, email, phone, Subject, Comment, ARCHIVE)
      VALUES
        (:booking_id, :Date, :first_name, :last_name, :email, :phone, :Subject, :Comment, :ARCHIVE)
    `;
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
    return contact;
  }

  async updateContact(id: number, edit: Partial<ContactInterface>): Promise<ContactInterface | null> {
    const sets: string[] = [];
    const replacements: any = { id };
    Object.entries(edit).forEach(([key, val], idx) => {
      sets.push(`${key} = :val${idx}`);
      replacements[`val${idx}`] = val;
    });
    const sql = `UPDATE contact SET ${sets.join(', ')} WHERE id = :id`;
    const [_, metadata] = await sequelize.query(sql, {
      replacements,
      type: QueryTypes.UPDATE,
    });
    if (metadata === 0) {
      throw new Error('Contact no encontrado');
    }
    return this.getContactById(id);
  }

  async fetchAll(): Promise<ContactInterface[]> {
    const sql = `SELECT * FROM contact`;
    const contacts = await sequelize.query<ContactInterface>(sql, {
      type: QueryTypes.SELECT,
    });
    return contacts;
  }

  async deleteContact(id: number): Promise<number> {
    const [_, metadata] = await sequelize.query('DELETE FROM contact WHERE id = ?', {
      replacements: [id],
    });
    return (metadata as { affectedRows: number }).affectedRows;
  }

  async getContactById(id: number): Promise<ContactInterface | null> {
    const sql = `SELECT * FROM contact WHERE id = :id`;
    const contacts = await sequelize.query<ContactInterface>(sql, {
      replacements: { id },
      type: QueryTypes.SELECT,
    });
    return contacts.length > 0 ? contacts[0] : null;
  }
}
