import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { IHashProvider } from "@shared/providers/domain/hash/IHashProvider";

interface IRequest {
  username: string;
  password: string;
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  async execute({ password, username }: IRequest) {
    const userExists = await this.usersRepository.findByUserName(username);

    if (userExists) {
      throw new AppError("The provided username is already taken");
    }

    const hashedPassword = await this.hashProvider.hash(password);

    const user = await this.usersRepository.create({
      password: hashedPassword,
      username,
    });

    return user;
  }
}
