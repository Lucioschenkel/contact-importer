import { IContactsRepository } from "@modules/contacts/domain/repositories/IContactsRepository";
import { FakeContactsRepository } from "@modules/contacts/infra/repositories/fakes/FakeContactsRepository";
import { AppError } from "@shared/errors/AppError";
import { IHashProvider } from "@shared/providers/domain/hash/IHashProvider";
import { FakeHashProvider } from "@shared/providers/infra/hash/FakeHashProvider";

import { CreateContactUseCase } from "./CreateContactUseCase";

let contactsRepository: IContactsRepository;
let hashProvider: IHashProvider;
let createContactUseCase: CreateContactUseCase;

describe("CreateContactUseCase", () => {
  beforeEach(() => {
    contactsRepository = new FakeContactsRepository();
    hashProvider = new FakeHashProvider();
    createContactUseCase = new CreateContactUseCase(
      contactsRepository,
      hashProvider
    );
  });

  it("should be able to create a contact if valid data is provided", async () => {
    const contact = await createContactUseCase.execute({
      address: "A valid address",
      credit_card: "4444444444444444",
      date_of_birth: "2020-10-02",
      email: "contato@lucioschenkel.com",
      name: "Valid name",
      telephone: "(+00) 000-000-00-00",
      owner_id: "c9b5d808-0529-437e-94a9-ad0bbdac64e7",
    });

    expect(contact).toHaveProperty("id");
  });

  it("should be able to get the franchise from the credit card number", async () => {
    const contact = await createContactUseCase.execute({
      address: "A valid address",
      credit_card: "4444444444444444",
      date_of_birth: "2020-10-02",
      email: "contato@lucioschenkel.com",
      name: "Valid name",
      telephone: "(+00) 000-000-00-00",
      owner_id: "c9b5d808-0529-437e-94a9-ad0bbdac64e7",
    });

    expect(contact.franchise).toBe("visa");
  });

  it("should not create a contact if one of the fields is invalid", async () => {
    expect(async () => {
      await createContactUseCase.execute({
        address: "A valid address",
        credit_card: "444455556666777", // Invalid credit card length
        date_of_birth: "2020-10-02",
        email: "contato@lucioschenkel.com",
        name: "Valid name",
        telephone: "(+00) 000-000-00-00",
        owner_id: "c9b5d808-0529-437e-94a9-ad0bbdac64e7",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not create a contact if the user already has a contact with that email", async () => {
    expect(async () => {
      await createContactUseCase.execute({
        address: "A valid address",
        credit_card: "4444444444444444",
        date_of_birth: "2020-10-02",
        email: "contato@lucioschenkel.com",
        name: "Valid name",
        telephone: "(+00) 000-000-00-00",
        owner_id: "c9b5d808-0529-437e-94a9-ad0bbdac64e7",
      });

      await createContactUseCase.execute({
        address: "A valid address",
        credit_card: "4444444444444444",
        date_of_birth: "2020-10-02",
        email: "contato@lucioschenkel.com",
        name: "Valid name",
        telephone: "(+00) 000-000-00-00",
        owner_id: "c9b5d808-0529-437e-94a9-ad0bbdac64e7",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
