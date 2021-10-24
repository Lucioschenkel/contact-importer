import { IImportsRepository } from "@modules/contacts/domain/repositories/IImportsRepository";
import { FakeImportsRepository } from "@modules/contacts/infra/repositories/fakes/FakeImportsRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateImportUseCase } from "../createImport/CreateImportUseCase";
import { UpdateImportUseCase } from "./UpdateImportUseCase";

let importsRepository: IImportsRepository;
let updateImportUseCase: UpdateImportUseCase;
let createImportUseCase: CreateImportUseCase;

describe("UpdateImportUseCase", () => {
  beforeEach(() => {
    importsRepository = new FakeImportsRepository();
    updateImportUseCase = new UpdateImportUseCase(importsRepository);
    createImportUseCase = new CreateImportUseCase(importsRepository);
  });

  it("should throw if there are no imports with the provided id", () => {
    expect(async () => {
      await updateImportUseCase.execute({
        status: "PROCESSING",
        import_id: "inexistent",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should update the status of an import with a valid status and id combination is given", async () => {
    let imp = await createImportUseCase.execute({
      file_name: "some_file_name",
      owner_id: "some_owner",
    });

    await updateImportUseCase.execute({
      import_id: imp.id,
      status: "FINISHED",
    });

    imp = await importsRepository.findById(imp.id);

    expect(imp.status).toBe("FINISHED");
  });
});
