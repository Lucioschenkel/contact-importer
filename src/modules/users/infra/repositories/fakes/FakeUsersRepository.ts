import { IUser } from "@modules/users/domain/entities/IUser";
import {
  ICreateUserDTO,
  IUsersRepository,
} from "@modules/users/domain/repositories/IUsersRepository";

import { User } from "../../entities/User";

export class FakeUsersRepository implements IUsersRepository {
  private users: IUser[] = [];

  async create({ password, username }: ICreateUserDTO): Promise<IUser> {
    const user = new User();

    Object.assign(user, {
      username,
      password,
    });

    this.users.push(user);

    return user;
  }

  async findByUserName(username: string): Promise<IUser> {
    const user = this.users.find((u) => u.username === username);

    return user;
  }
}
