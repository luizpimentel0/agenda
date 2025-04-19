import { Contact } from "@domain/entities/Contact";
import { IContactRepository } from "@domain/repositories/IContactRepository";

export class CreateContactUseCase {
  constructor(private contactRepository: IContactRepository) { }

  async execute({ user_id, email, phone, message_phone, address }:
    { user_id: number, email: string, phone: string, message_phone?: string, address: string }
  ): Promise<Contact> {

    const contactExists = await this.contactRepository.findByEmailI(email);

    if (contactExists) {
      throw new Error("Já existe um contato cadastrado com esse e-mail.");
    }

    const contact = new Contact({
      user_id,
      email,
      phone,
      message_phone,
      address,
    });

    return await this.contactRepository.save(contact);
  }
}
