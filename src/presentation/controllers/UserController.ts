import { Request, Response } from "express";
import { CreateUserUserCase } from "@application/useCases/CreateUserUseCase";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { GetAllUsersUseCase } from "@application/useCases/GetAllUsersUseCase";
import { UserDTO } from "@presentation/dtos/UserDTO";
import { GetUserByEmailUseCase } from "@application/useCases/GetUserByEmailUseCase";
import { DeleteUserByIdUseCase } from "@application/useCases/DeleteUserByIdUseCase";

export class UserController {
  private createUserUseCase: CreateUserUserCase;
  private getAllUsersUserCase: GetAllUsersUseCase;
  private getUserByEmailUseCase: GetUserByEmailUseCase;
  private deleteUserByIdUseCase: DeleteUserByIdUseCase;

  constructor() {
    const userRepository = new UserRepository();
    this.createUserUseCase = new CreateUserUserCase(userRepository);
    this.getAllUsersUserCase = new GetAllUsersUseCase(userRepository);
    this.getUserByEmailUseCase = new GetUserByEmailUseCase(userRepository);
    this.deleteUserByIdUseCase = new DeleteUserByIdUseCase(userRepository);
  }

  async createUser(req: Request, res: Response) {
    try {
      const { name, email } = req.body;
      const user = await this.createUserUseCase.execute(name, email);

      return res.status(201).json(user);
    } catch (error) {
      const errorMessage = (error as Error).message;
      return res.status(400).json({
        error: errorMessage,
      });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users: UserDTO[] = await this.getAllUsersUserCase.execute();

      if (!users.length) {
        return res.status(404);
      }
 
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async getUserByEmail(req: Request, res: Response) {
    try {
      const email = req.params.email;
      const user: UserDTO | null =
        await this.getUserByEmailUseCase.execute(email);

      if (!user) {
        return res.status(404);
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const deleted = await this.deleteUserByIdUseCase.execute(id);
      if (!deleted) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }
}
