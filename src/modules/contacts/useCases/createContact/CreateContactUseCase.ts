import { Joi } from "celebrate";

import { IContactsRepository } from "@modules/contacts/domain/repositories/IContactsRepository";
import { IHashProvider } from "@shared/providers/domain/hash/IHashProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  address: string;
  credit_card: string;
  date_of_birth: string;
  email: string;
  name: string;
  owner_id: string;
  telephone: string;
}

export class CreateContactUseCase {
  constructor(
    private contactsRepository: IContactsRepository,
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
  }: IRequest): Promise<void> {
    const contactSchema = Joi.object({
      address: Joi.string().required().min(1),
      name: Joi.string()
        .required()
        .pattern(/^[A-Za-z0-9_-]*$/),
      email: Joi.string().required().email(),
      owner_id: Joi.string().required(),
      telephone: Joi.string()
        .required()
        .pattern(/\(\+\d\d\) [\d\d\d( |\-)]{16}/g),
    });

    const { value, error } = contactSchema.validate({
      address,
      email,
      name,
      owner_id,
      telephone,
    });

    if (error) {
      // TODO log in the database the reason for the failure
      throw error;
    }
  }
}
