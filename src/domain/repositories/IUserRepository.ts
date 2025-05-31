import { User } from "@domain/entities/User";
import { UserDTO } from "@presentation/dtos/UserDTO";

export interface IUserRepository {
  save(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  deleteById(id: number): Promise<boolean>;
  findAll(): Promise<UserDTO[] | null>;
}
