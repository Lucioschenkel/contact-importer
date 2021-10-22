import { getRepository, Repository } from "typeorm";

import { Contact } from "../entities/Contact";

export class ContactsRepository {
  private repository: Repository<Contact>;

  constructor() {
    this.repository = getRepository(Contact);
  }
}
