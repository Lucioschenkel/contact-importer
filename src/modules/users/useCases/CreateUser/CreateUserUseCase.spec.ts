import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import { FakeUsersRepository } from "@modules/users/infra/repositories/fakes/FakeUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { IHashProvider } from "@shared/providers/domain/hash/IHashProvider";
import { FakeHashProvider } from "@shared/providers/infra/hash/FakeHashProvider";

import { CreateUserUseCase } from "./CreateUserUseCase";

let hashProvider: IHashProvider;
let usersRepository: IUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("CreateUserUseCase", () => {
  beforeEach(() => {
    hashProvider = new FakeHashProvider();
    usersRepository = new FakeUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository, hashProvider);
  });

  it("should create a user when valid data is provided", async () => {
    const user = await createUserUseCase.execute({
      password: "123456",
      username: "some_username",
    });

    expect(user).toHaveProperty("id");
  });

  it("should throw an error with someone tries to use username that is already take", async () => {
    expect(async () => {
      await createUserUseCase.execute({
        password: "123456",
        username: "some_username",
      });

      await createUserUseCase.execute({
        password: "ad_bcd",
        username: "some_username",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
