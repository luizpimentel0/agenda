import { CreateContactUseCase } from "@application/useCases/CreateContactUseCase";
import { GetContactsByUsernameUseCase } from "@application/useCases/GetContactsByUsernameUseCase";
import { ContactRepository } from "@infrastructure/repositories/ContactReposity";
import { ContactDTO } from "@presentation/dtos/ContactDTO";
import { Request, Response } from "express";

export class ContactController {
  private createContactUseCase: CreateContactUseCase;
  private getContactsByUsernameUseCase: GetContactsByUsernameUseCase;

  constructor() {
    const contactRepository = new ContactRepository();
    this.createContactUseCase = new CreateContactUseCase(contactRepository);
    this.getContactsByUsernameUseCase = new GetContactsByUsernameUseCase(contactRepository);
  }

  async createContact(req: Request, res: Response) {
    try {
      const { user_id, email, phone, message_phone, address } = req.body;
      const contact = await this.createContactUseCase.execute({ user_id, email, phone, message_phone, address });

      return res.status(201).json(contact);
    } catch (error) {
      const erroMessage = (error as Error).message;

      return res.status(400).json({
        error: erroMessage
      });
    }
  }

  async getContactsByUsername(req: Request, res: Response) {
    try {
      const username = req.params.username;
      const contacts: ContactDTO[] | null = await this.getContactsByUsernameUseCase.execute(username);

      if (!contacts) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      return res.status(200).json(contacts);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }
}
