import { inject, injectable } from "tsyringe";

import { IContact } from "@modules/contacts/domain/entities/IContact";
import { IContactsRepository } from "@modules/contacts/domain/repositories/IContactsRepository";

interface IPaginatedContacts {
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

interface IRequest {
  user_id: string;
}

@injectable()
export class ListContactsUseCase {
  constructor(
    @inject("ContactsRepository")
    private contactsRepository: IContactsRepository
  ) {}

  async execute({ user_id }: IRequest): Promise<IPaginatedContacts> {
    const contacts = await this.contactsRepository
      .createQueryBuilder()
      .where({
        owner_id: user_id,
      })
      .paginate(2);

    return contacts as IPaginatedContacts;
  }
}
