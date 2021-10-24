import { IImportsRepository } from "@modules/contacts/domain/repositories/IImportsRepository";
import { FakeImportsRepository } from "@modules/contacts/infra/repositories/fakes/FakeImportsRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateImportUseCase } from "../createImport/CreateImportUseCase";
import { DeleteImportUseCase } from "./DeleteImportUseCase";

let deleteImportUseCase: DeleteImportUseCase;
let createImportUseCase: CreateImportUseCase;
let importsRepository: IImportsRepository;

describe("DeleteImportUseCase", () => {
  beforeEach(() => {
    importsRepository = new FakeImportsRepository();
    createImportUseCase = new CreateImportUseCase(importsRepository);
    deleteImportUseCase = new DeleteImportUseCase(importsRepository);
  });

  it("should throw if the provided import id does not exist", () => {
    expect(async () => {
      await deleteImportUseCase.execute({ import_id: "some_invalid_id" });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("delete the specified import", async () => {
    let imp = await createImportUseCase.execute({
      file_name: "some_file_name",
      owner_id: "some_owner_id",
    });

    await deleteImportUseCase.execute({ import_id: imp.id });

    imp = await importsRepository.findById(imp.id);

    expect(imp).toBeFalsy();
  });
});
