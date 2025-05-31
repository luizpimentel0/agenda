export class Contact {
  phone: string;
  message_phone?: string;
  email: string;
  address: string;
  user_id: number;

  constructor({ phone, message_phone, email, address, user_id }: {
    phone: string,
    message_phone?: string,
    email: string,
    address: string,
    user_id: number,
  }) {
    this.phone = phone;
    this.message_phone = message_phone;
    this.email = email;
    this.user_id = user_id;
    this.address = address;
  }
}
