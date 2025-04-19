import { IContactRepository } from "@domain/repositories/IContactRepository";
import { ContactDTO } from "@presentation/dtos/ContactDTO";

export class GetContactsByUsernameUseCase {
  constructor(private contactRepository: IContactRepository) { }

  async execute(name: string): Promise<ContactDTO[] | null> {
    return await this.contactRepository.findContactsByUsername(name);
  }
}
