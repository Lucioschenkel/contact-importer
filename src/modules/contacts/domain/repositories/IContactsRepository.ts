import { IContact } from "../entities/IContact";

export interface ICreateContactDTO {
  name: string;
  date_of_birth: Date;
  telephone: string;
  address: string;
  credit_card: string;
  credit_card_last_four_digits: string;
  franchise: string;
  owner_id: string;
  email: string;
}

export interface IContactsRepository {
  findByEmail(email: string, owner_id: string): Promise<IContact>;
  create(data: ICreateContactDTO): Promise<IContact>;
}
