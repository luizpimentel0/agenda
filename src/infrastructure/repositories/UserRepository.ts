import { IUserRepository } from "@domain/repositories/IUserRepository";
import { User } from "@domain/entities/User";
import { Database } from "@infrastructure/config/Database";
import { plainToInstance } from "class-transformer";
import { UserDTO } from "@presentation/dtos/UserDTO";

export class UserRepository implements IUserRepository {
  private pool = Database.getConnection();

  async findAll(): Promise<UserDTO[] | null> {
    try {
      const [result] = await this.pool.execute("SELECT*FROM users");

      return plainToInstance(UserDTO, result as object[]);
    } catch (error) {
      throw new Error(`Erro ao recuperar registros no bd ${error}`);
    }
  }

  async save(user: User): Promise<User> {
    try {
      const [result] = await this.pool.execute(
        "INSERT INTO users (name, email) VALUES (?, ?)",
        [user.name, user.email],
      );

      const insertId = (result as any).insertId;
      user.id = insertId;

      return user;
    } catch (error) {
      throw new Error(`Erro ao salvar usuário: ${error}`);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const [result] = await this.pool.execute(
        "SELECT * FROM users where email = ?",
        [email],
      );

      if (Array.isArray(result) && result.length > 0) {
        return result[0] as User;
      }

      return null;
    } catch (error) {
      console.error(error);
      throw new Error(
        `Erro ao recuperar o registro com o e-mail ${email}: ${error}`,
      );
    }
  }

  findById(id: number): Promise<User | null> {
    throw new Error("Method not implemented");
  }
}
