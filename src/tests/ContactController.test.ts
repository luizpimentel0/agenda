import { ContactController } from '@presentation/controllers/ContactController';
import { Request, Response } from 'express';

const mockCreateContactUseCase = { execute : jest.fn() };
const mockGetContactsByUsernameUseCase = { execute: jest.fn() };
class MockContactController extends ContactController {
  constructor() {
    super();
    // @ts-ignore
    this.createContactUseCase = mockCreateContactUseCase;
    // @ts-ignore
    this.getContactsByUsernameUseCase = mockGetContactsByUsernameUseCase;
  }
}

describe("ContactController", () => {
  let contactController: ContactController;

  beforeEach(() => {
    jest.clearAllMocks();
    contactController = new MockContactController();
  });

  it("should create a contact", async () => {
    const req = {
      body: { user_id: 1, email: 'luiz@email.com', phone: '11998800331', message_phone: null, address: 'Cotia'},
    } as Request;

    const jsonMock = jest.fn();
    const statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    const res = { status: statusMock } as unknown as Response;

    mockCreateContactUseCase.execute.mockResolvedValue({user_id: 1, phone: "11998800331", email: "luiz@contato.com", address: "Cotia"});

    await contactController.createContact(req, res);

    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({user_id: 1, phone: "11998800331", email: "luiz@contato.com", address: "Cotia"});
  });

  it("should retrieve user contacts by username", async () => {
    const req = {
      params: { username: "luiz" },
    } as unknown as Request;

    const jsonMock = jest.fn();
    const statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    const res = { status: statusMock } as unknown as Response;

    const contacts = [
      {
        user_id: 1,
        phone: "11998800331",
        email: "luiz@contato.com",
        address: "Cotia",
      },
      {
        user_id: 1,
        phone: "11998800332",
        email: "ana@contato.com",
        address: "São Paulo",
      },
    ];

    mockGetContactsByUsernameUseCase.execute.mockResolvedValue(contacts);

    await contactController.getContactsByUsername(req, res);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(contacts);
    expect(mockGetContactsByUsernameUseCase.execute).toHaveBeenCalledWith("luiz");
  });
});
