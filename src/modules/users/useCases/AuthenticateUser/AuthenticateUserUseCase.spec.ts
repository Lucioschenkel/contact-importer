import { verify } from "jsonwebtoken";

import jwt from "@config/jwt";
import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import { FakeUsersRepository } from "@modules/users/infra/repositories/fakes/FakeUsersRepository";
import { IHashProvider } from "@providers/domain/hash/IHashProvider";
import { FakeHashProvider } from "@providers/infra/hash/FakeHashProvider";

import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepository: IUsersRepository;
let hashProvider: IHashProvider;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("AuthenticateUserUseCase", () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepository,
      hashProvider
    );

    createUserUseCase = new CreateUserUseCase(usersRepository, hashProvider);
  });

  it("should not be able to authenticate a user if a non existent username is provided", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        username: "something",
        password: "some_password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to authenticate a user if a valid username and password combination is provided", async () => {
    const username = "john.doe";
    const password = "1234";

    const user = await createUserUseCase.execute({ username, password });

    const token = await authenticateUserUseCase.execute({
      username,
      password,
    });

    expect(token).toBeTruthy();

    const { sub } = verify(token, jwt.secret);
    expect(sub).toBe(user.id);
  });

  it("should be not able to authenticate a user if an invalid password is provided", async () => {
    expect(async () => {
      const username = "john.doe";
      const password = "1234";

      await createUserUseCase.execute({
        username,
        password,
      });

      await authenticateUserUseCase.execute({
        username,
        password: "the_wrong_password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
