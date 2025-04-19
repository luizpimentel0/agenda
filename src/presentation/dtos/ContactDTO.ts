import { IsEmail, IsNotEmpty, IsOptional, Length } from "class-validator";

export class ContactDTO {
  @IsNotEmpty()
  user_id: number;

  @IsEmail({}, { message: "O e-mail informado é inválido" })
  @IsNotEmpty({ message: "O e-mail é um campo obrigatório" })
  email: string;

  @IsNotEmpty()
  @Length(11, 11)
  phone: string;

  @IsOptional()
  @Length(11, 11)
  phone_message?: string;

  @IsNotEmpty()
  @Length(4, 100)
  address: string;

  constructor(user_id: number, email: string, phone: string, address: string, phone_message?: string) {
    this.user_id = user_id;
    this.phone = phone;
    this.email = email;
    this.address = address;
    this.phone_message = phone_message;
  }
}
