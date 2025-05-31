import { UserController } from "@presentation/controllers/UserController";
import { Request, Response } from "express";

const mockCreateUserUseCase = { execute: jest.fn() };
const mockGetAllUsersUseCase = { execute: jest.fn() };
const mockGetUserByEmailUseCase = { execute: jest.fn() };
const mockDeleteUserByIdUseCase = { execute: jest.fn() };

class MockUserController extends UserController {
  constructor() {
    super();
    // @ts-ignore
    this.createUserUseCase = mockCreateUserUseCase;
    // @ts-ignore
    this.getAllUsersUserCase = mockGetAllUsersUseCase;
    // @ts-ignore
    this.getUserByEmailUseCase = mockGetUserByEmailUseCase;
    // @ts-ignore
    this.deleteUserByIdUseCase = mockDeleteUserByIdUseCase;
  }
}

describe("UserController", () => {
  let userController: UserController;

  beforeEach(() => {
    jest.clearAllMocks();
    userController = new MockUserController();
  });

  it("should create a user", async () => {
    const req = {
      body: { name: "Luiz", email: "luiz@email.com" },
    } as Request;

    const jsonMock = jest.fn();
    const statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    const res = { status: statusMock } as unknown as Response;

    mockCreateUserUseCase.execute.mockResolvedValue({ name: "Luiz", email: "luiz@email.com" });

    await userController.createUser(req, res);

    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({ name: "Luiz", email: "luiz@email.com" });
    expect(mockCreateUserUseCase.execute).toHaveBeenCalledWith("Luiz", "luiz@email.com");
  });

  it('shoud return all users', async () => {
    const req = {} as Request;
    const users = [
      { id: 1, name: "Luiz", email: "luiz@email.com" },
      { id: 2, name: "Ana", email: "ana@email.com" },
    ];
    mockGetAllUsersUseCase.execute.mockResolvedValue(users);

    const jsonMock = jest.fn();
    const statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    const res = { status: statusMock } as unknown as Response;

    await userController.getAllUsers(req, res);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(users);
    expect(mockGetAllUsersUseCase.execute).toHaveBeenCalled();
  });

it("should delete a user by id", async () => {
    const req = { params: { id: "1" } } as unknown as Request;
    const jsonMock = jest.fn();
    const statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    const res = { status: statusMock } as unknown as Response;

    mockDeleteUserByIdUseCase.execute.mockResolvedValue(true);

    // @ts-ignore
    await userController.deleteUser(req, res);

    expect(mockDeleteUserByIdUseCase.execute).toHaveBeenCalledWith(1);
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ message: "User deleted successfully" });
  });
});
