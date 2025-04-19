import { Contact } from "@domain/entities/Contact";

export interface IContactRepository {
  save(contact: Contact): Promise<Contact>
  findContactsByUsername(name: string): Promise<Contact[] | null>
  findByEmailI(email: string): Promise<Contact | null>
}
