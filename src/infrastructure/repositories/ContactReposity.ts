import { Contact } from "@domain/entities/Contact";
import { IContactRepository } from "@domain/repositories/IContactRepository";
import { Database } from "@infrastructure/config/Database";

export class ContactRepository implements IContactRepository {
  private pool = Database.getConnection();

  async save(contact: Contact): Promise<Contact> {
    try {
      await this.pool.execute(
        "INSERT INTO contacts (user_id, phone, message_phone, email, address) VALUES (?, ?, ?, ?, ?)",
        [contact.user_id, contact.phone, contact.message_phone ?? null, contact.email, contact.address]
      );

      return contact;
    } catch (error) {
      throw new Error(`Erro ao criar contato: ${error}`);
    }
  }

  async findContactsByUsername(name: string): Promise<Contact[] | null> {
    try {
      const [result] = await this.pool.execute(
        "SELECT c.email, c.phone, c.message_phone, c.address, u.name from contacts c INNER JOIN users u on c.user_id = u.user_id where u.name LIKE ?",
        [`%${name}%`]
      );

      if (Array.isArray(result) && result.length > 0) {
        return result as Contact[];
      }

      return null;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  }

  async findByEmailI(email: string): Promise<Contact | null> {
    try {
      const [result] = await this.pool.execute(
        "SELECT email from contacts where email = ?",
        [email]
      );

      if (Array.isArray(result) && result.length > 0) {
        return result[0] as Contact;
      }

      return null;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  }
}
