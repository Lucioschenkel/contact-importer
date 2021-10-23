import creditCardType from "credit-card-type";
import { inject, injectable } from "tsyringe";

import patterns from "@config/patterns";
import { IContactsRepository } from "@modules/contacts/domain/repositories/IContactsRepository";
import { AppError } from "@shared/errors/AppError";
import { IHashProvider } from "@shared/providers/domain/hash/IHashProvider";
import contactValidator from "@utils/validators/contact";

interface IRequest {
  address: string;
  credit_card: string;
  date_of_birth: string;
  email: string;
  name: string;
  owner_id: string;
  telephone: string;
}

@injectable()
export class CreateContactUseCase {
  constructor(
    @inject("ContactsRepository")
    private contactsRepository: IContactsRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  async execute({
    address,
    credit_card,
    date_of_birth,
    email,
    name,
    owner_id,
    telephone,
  }: IRequest) {
    const isContactValid = contactValidator({
      address,
      credit_card,
      date_of_birth,
      email,
      name,
      owner_id,
      telephone,
    });

    if (!isContactValid) {
      throw new AppError("The provided contact is not valid");
    }

    const contactExists = await this.contactsRepository.findByEmail(
      email,
      owner_id
    );

    if (contactExists) {
      throw new AppError("A contact with that e-mail already exists");
    }

    const credit_card_last_four_digits = credit_card.slice(
      credit_card.length - 5
    );

    const franchise = creditCardType(credit_card)[0];

    const creditCardHash = await this.hashProvider.hash(credit_card);

    const contact = await this.contactsRepository.create({
      address,
      credit_card: creditCardHash,
      credit_card_last_four_digits,
      email,
      franchise: franchise.type,
      name,
      owner_id,
      telephone,
      date_of_birth: patterns.date["%Y%m%d"].test(date_of_birth)
        ? new Date(
            `${date_of_birth.slice(0, 4)}-${date_of_birth.slice(
              4,
              6
            )}-${date_of_birth.slice(6, 8)}`
          )
        : new Date(date_of_birth),
    });

    return contact;
  }
}
