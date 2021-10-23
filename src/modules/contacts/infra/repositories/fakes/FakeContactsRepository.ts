import { IContact } from "@modules/contacts/domain/entities/IContact";
import {
  IContactsRepository,
  ICreateContactDTO,
} from "@modules/contacts/domain/repositories/IContactsRepository";

import { Contact } from "../../entities/Contact";

export class FakeContactsRepository implements IContactsRepository {
  private contacts: IContact[] = [];

  async findByEmail(email: string, owner_id: string): Promise<IContact> {
    const contact = this.contacts.find(
      (c) => c.owner_id === owner_id && c.email === email
    );

    return contact;
  }

  async create({
    name,
    owner_id,
    address,
    credit_card,
    credit_card_last_four_digits,
    date_of_birth,
    email,
    franchise,
    telephone,
  }: ICreateContactDTO): Promise<IContact> {
    const contact = new Contact();

    Object.assign(contact, {
      name,
      owner_id,
      address,
      credit_card,
      credit_card_last_four_digits,
      date_of_birth,
      email,
      franchise,
      telephone,
    });

    this.contacts.push(contact);

    return contact;
  }
}
