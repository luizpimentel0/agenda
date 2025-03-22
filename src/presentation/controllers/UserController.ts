import { Request, Response } from "express";
import { CreateUserUserCase } from "@application/useCases/CreateUserUseCase";
import { UserRepository } from "@infrastructure/repositories/UserRepository";

export class UserController {
  private createUserUseCase: CreateUserUserCase;

  constructor() {
    const userRepository = new UserRepository();
    this.createUserUseCase = new CreateUserUserCase(userRepository);
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
}
