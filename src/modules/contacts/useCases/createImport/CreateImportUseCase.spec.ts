import { IImportsRepository } from "@modules/contacts/domain/repositories/IImportsRepository";
import { FakeImportsRepository } from "@modules/contacts/infra/repositories/fakes/FakeImportsRepository";

import { CreateImportUseCase } from "./CreateImportUseCase";

let importsRepository: IImportsRepository;
let createImportUseCase: CreateImportUseCase;

describe("CreateImportUseCase", () => {
  beforeEach(() => {
    importsRepository = new FakeImportsRepository();
    createImportUseCase = new CreateImportUseCase(importsRepository);
  });

  it("should create a new import", async () => {
    const imp = await createImportUseCase.execute({
      file_name: "Nice file name",
      owner_id: "nice_owner",
    });

    expect(imp).toHaveProperty("id");
  });

  it("should create a new import register with the status set to HOLD", async () => {
    const imp = await createImportUseCase.execute({
      file_name: "Nice file name",
      owner_id: "nice_owner",
    });

    expect(imp.status).toBe("HOLD");
  });
});
