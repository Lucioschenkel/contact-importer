import { IUser } from "../entities/IUser";

export interface ICreateUserDTO {
  username: string;
  password: string;
}

export interface IUsersRepository {
  findByUserName(username: string): Promise<IUser>;
  create(data: ICreateUserDTO): Promise<IUser>;
}
