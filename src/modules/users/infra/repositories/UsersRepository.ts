import { getRepository, Repository } from "typeorm";

import { IUser } from "@modules/users/domain/entities/IUser";
import {
  ICreateUserDTO,
  IUsersRepository,
} from "@modules/users/domain/repositories/IUsersRepository";

import { User } from "../entities/User";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ username, password }: ICreateUserDTO): Promise<IUser> {
    const user = this.repository.create({
      username,
      password,
    });

    await this.repository.save(user);

    return user;
  }

  async findByUserName(username: string): Promise<IUser> {
    const user = await this.repository.findOne({
      where: {
        username,
      },
    });

    return user;
  }
}
