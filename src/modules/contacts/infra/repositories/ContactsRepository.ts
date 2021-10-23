import { getRepository, Repository } from "typeorm";

import { IContact } from "@modules/contacts/domain/entities/IContact";
import {
  IContactsRepository,
  ICreateContactDTO,
} from "@modules/contacts/domain/repositories/IContactsRepository";

import { Contact } from "../entities/Contact";

export class ContactsRepository implements IContactsRepository {
  private repository: Repository<Contact>;

  constructor() {
    this.repository = getRepository(Contact);
  }

  async create({
    owner_id,
    telephone,
    name,
    address,
    email,
    credit_card,
    credit_card_last_four_digits,
    date_of_birth,
    franchise,
  }: ICreateContactDTO): Promise<IContact> {
    const contact = this.repository.create({
      owner_id,
      telephone,
      name,
      address,
      email,
      credit_card,
      credit_card_last_four_digits,
      date_of_birth,
      franchise,
    });

    await this.repository.save(contact);

    return contact;
  }

  async findByEmail(email: string, owner_id: string): Promise<IContact> {
    const contact = await this.repository.findOne({
      where: {
        owner_id,
        email,
      },
    });

    return contact;
  }
}
