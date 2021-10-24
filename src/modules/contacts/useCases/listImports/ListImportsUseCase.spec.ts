import { IImportsRepository } from "@modules/contacts/domain/repositories/IImportsRepository";
import { FakeImportsRepository } from "@modules/contacts/infra/repositories/fakes/FakeImportsRepository";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import { FakeUsersRepository } from "@modules/users/infra/repositories/fakes/FakeUsersRepository";

import { ListImportsUseCase } from "./ListImportsUseCase";

let importsRepository: IImportsRepository;
let listImportsUseCase: ListImportsUseCase;
let usersRepository: IUsersRepository;

describe("ListImportsUseCase", () => {
  beforeEach(() => {
    importsRepository = new FakeImportsRepository();
    usersRepository = new FakeUsersRepository();
    listImportsUseCase = new ListImportsUseCase(importsRepository);
  });

  it("should only list imports from the user logged in", async () => {
    const user1 = await usersRepository.create({
      password: "1234",
      username: "user1",
    });

    const user2 = await usersRepository.create({
      password: "12345",
      username: "user2",
    });

    await importsRepository.create({
      file_name: "some_file",
      owner_id: user2.id,
      status: "HOLD",
    });

    await importsRepository.create({
      file_name: "some_file",
      owner_id: user1.id,
      status: "FAILED",
    });

    const imports = await listImportsUseCase.execute({ owner_id: user1.id });

    expect(imports.length).toBe(1);
    expect(imports[0].status).toBe("FAILED");
  });
});
