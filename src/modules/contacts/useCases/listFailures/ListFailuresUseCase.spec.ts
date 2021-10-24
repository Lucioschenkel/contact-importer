import { IFailuresRepository } from "@modules/contacts/domain/repositories/IFailuresRepository";
import { FakeFailuresRepository } from "@modules/contacts/infra/repositories/fakes/FakeFailuresRepository";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import { FakeUsersRepository } from "@modules/users/infra/repositories/fakes/FakeUsersRepository";

import { ListFailuresUseCase } from "./ListFailuresUseCase";

let listFailuresUseCase: ListFailuresUseCase;
let failuresRepository: IFailuresRepository;
let usersRepository: IUsersRepository;

describe("ListFailuresUseCase", () => {
  beforeEach(() => {
    failuresRepository = new FakeFailuresRepository();
    usersRepository = new FakeUsersRepository();
    listFailuresUseCase = new ListFailuresUseCase(failuresRepository);
  });

  it("should list the failures associated with a specific user", async () => {
    const user1 = await usersRepository.create({
      password: "1234",
      username: "user1",
    });

    const user2 = await usersRepository.create({
      password: "1234",
      username: "user2",
    });

    await failuresRepository.create({
      import_id: "some_id",
      owner_id: user2.id,
      provided_data: {
        data: "some_data",
      },
      reason: "some_reason",
    });

    await failuresRepository.create({
      import_id: "some_id_2",
      owner_id: user1.id,
      provided_data: {
        data: "some_data",
      },
      reason: "some_reason_2",
    });

    const failures = await listFailuresUseCase.execute({ owner_id: user1.id });

    expect(failures.length).toBe(1);
    expect(failures[0].owner_id).toBe(user1.id);
  });
});
