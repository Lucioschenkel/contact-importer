import { container } from "tsyringe";

import { IContactsRepository } from "@modules/contacts/domain/repositories/IContactsRepository";
import { IFailuresRepository } from "@modules/contacts/domain/repositories/IFailuresRepository";
import { IImportsRepository } from "@modules/contacts/domain/repositories/IImportsRepository";
import { ContactsRepository } from "@modules/contacts/infra/repositories/ContactsRepository";
import { FailuresRepository } from "@modules/contacts/infra/repositories/FailuresRepository";
import { ImportsRepository } from "@modules/contacts/infra/repositories/ImportsRepository";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import { UsersRepository } from "@modules/users/infra/repositories/UsersRepository";
import { IHashProvider } from "@shared/providers/domain/hash/IHashProvider";
import { BcryptHashProvider } from "@shared/providers/infra/hash/BcryptHashProvider";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IContactsRepository>(
  "ContactsRepository",
  ContactsRepository
);

container.registerSingleton<IImportsRepository>(
  "ImportsRepository",
  ImportsRepository
);

container.registerSingleton<IFailuresRepository>(
  "FailuresRepository",
  FailuresRepository
);

container.registerSingleton<IHashProvider>("HashProvider", BcryptHashProvider);
