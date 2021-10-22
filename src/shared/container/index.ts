import { container } from "tsyringe";

import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import { UsersRepository } from "@modules/users/infra/repositories/UsersRepository";
import { IHashProvider } from "@shared/providers/domain/hash/IHashProvider";
import { BcryptHashProvider } from "@shared/providers/infra/hash/BcryptHashProvider";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IHashProvider>("HashProvider", BcryptHashProvider);
