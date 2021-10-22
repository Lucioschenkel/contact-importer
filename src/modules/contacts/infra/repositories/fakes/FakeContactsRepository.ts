import { IContact } from "@modules/contacts/domain/entities/IContact";

export class FakeContactsRepository {
  private contacts: IContact[] = [];
}
