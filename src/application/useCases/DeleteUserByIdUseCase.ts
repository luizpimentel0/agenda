import { IUserRepository } from "@domain/repositories/IUserRepository";

export class DeleteUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: number): Promise<boolean> {
    return (await this.userRepository.deleteById(id)) ?? false;
  }
}
