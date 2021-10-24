import { IContact } from "@modules/contacts/domain/entities/IContact";
import {
  IContactsRepository,
  ICreateContactDTO,
} from "@modules/contacts/domain/repositories/IContactsRepository";

import { Contact } from "../../entities/Contact";

interface IMockPaginatedContacts {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  last_page: number;
  data: IContact[];
}

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

  createQueryBuilder() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    return {
      where({ owner_id }: { owner_id: string }) {
        return {
          paginate(per_page = 1): IMockPaginatedContacts {
            return {
              current_page: 1,
              data: self.contacts
                .filter((c) => c.owner_id === owner_id)
                .slice(0, per_page),
              from: 1,
              to: 2,
              total: self.contacts.length,
              last_page: null,
              next_page: null,
              per_page,
              prev_page: null,
            };
          },
        };
      },
    };
  }
}
