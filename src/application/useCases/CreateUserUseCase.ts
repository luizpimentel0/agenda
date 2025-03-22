import { IUserRepository } from "@domain/repositories/IUserRepository";
import { User } from "@domain/entities/User";

export class CreateUserUserCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(name: string, email: string): Promise<User> {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new Error("Já existe um usuário cadastrado com esse e-mail");
    }

    const user = new User(name, email);

    return await this.userRepository.save(user);
  }
}
