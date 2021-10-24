import { IContactsRepository } from "@modules/contacts/domain/repositories/IContactsRepository";
import { FakeContactsRepository } from "@modules/contacts/infra/repositories/fakes/FakeContactsRepository";

import { ListContactsUseCase } from "./ListContactsUseCase";

let contactsRepository: IContactsRepository;
let listContactsUseCase: ListContactsUseCase;

describe("ListContactsUseCase", () => {
  beforeEach(() => {
    contactsRepository = new FakeContactsRepository();
    listContactsUseCase = new ListContactsUseCase(contactsRepository);
  });

  it("should return the paginated list of customers", async () => {
    await contactsRepository.create({
      address: "some_address",
      credit_card: "credit_card",
      credit_card_last_four_digits: "4444",
      date_of_birth: new Date(),
      email: "contato@me.com",
      franchise: "visa",
      name: "Some name",
      owner_id: "id",
      telephone: "some_telephone",
    });

    const paginatedContacts = await listContactsUseCase.execute({
      user_id: "id",
    });

    expect(paginatedContacts).toHaveProperty("per_page");
    expect(paginatedContacts.data.length).toBe(1);
  });
});
