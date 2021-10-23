import { IContactsRepository } from "@modules/contacts/domain/repositories/IContactsRepository";
import { FakeContactsRepository } from "@modules/contacts/infra/repositories/fakes/FakeContactsRepository";
import { AppError } from "@shared/errors/AppError";
import { IHashProvider } from "@shared/providers/domain/hash/IHashProvider";
import { FakeHashProvider } from "@shared/providers/infra/hash/FakeHashProvider";
import { Joi } from "celebrate";

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

  // it("should be able to create a contact if valid data is provided", async () => {});

  it("should not create a contact if the provided name has special characters other than '-'", async () => {
    expect(async () => {
      await createContactUseCase.execute({
        address: "Valid address",
        credit_card: "444444444444",
        date_of_birth: "2021-08-10",
        email: "contato@lucioschenkel.com",
        owner_id: "some_id",
        telephone: "(+57) 320-432-05-09",
        name: "$someName1223",
      });
    }).rejects.toBeTruthy();
  });

  // it("should not create a contact if the provided date of birth is not valid", async () => {});

  // it("should not create a contact if the provided telephone is not valid", async () => {});

  // it("should not create a contact if the provided address is empty", async () => {});

  // it("should not create a contact if the provided credit card's length is invalid", async () => {});

  // it("should be able to identify the franchise from the credit card number", () => {});

  // it("should not create a contact if the provided email is invalid", () => {});

  // it("should not create a contact if the provided email is already in the contacts list of the user", async () => {});
});
