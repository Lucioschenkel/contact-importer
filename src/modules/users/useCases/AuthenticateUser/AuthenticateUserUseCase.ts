import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import jwt from "@config/jwt";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { IHashProvider } from "@shared/providers/domain/hash/IHashProvider";

interface IRequest {
  username: string;
  password: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  async execute({ username, password }: IRequest): Promise<string> {
    const user = await this.usersRepository.findByUserName(username);

    if (!user) {
      throw new AppError("Incorrect username or password", 401);
    }

    const passwordMatch = await this.hashProvider.verify(
      password,
      user.password
    );

    if (!passwordMatch) {
      throw new AppError("Incorrect username or password");
    }

    const token = sign({}, jwt.secret, {
      subject: user.id,
      expiresIn: jwt.expiresIn,
    });

    return token;
  }
}
