import { IFailuresRepository } from "@modules/contacts/domain/repositories/IFailuresRepository";
import { IImportsRepository } from "@modules/contacts/domain/repositories/IImportsRepository";
import { FakeFailuresRepository } from "@modules/contacts/infra/repositories/fakes/FakeFailuresRepository";
import { FakeImportsRepository } from "@modules/contacts/infra/repositories/fakes/FakeImportsRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateImportUseCase } from "../createImport/CreateImportUseCase";
import { CreateFailureUseCase } from "./CreateFailureUseCase";

let failuresRepository: IFailuresRepository;
let importsRepository: IImportsRepository;
let createFailureUseCase: CreateFailureUseCase;
let createImportUseCase: CreateImportUseCase;

describe("CreateFailureUseCase", () => {
  beforeEach(() => {
    failuresRepository = new FakeFailuresRepository();
    importsRepository = new FakeImportsRepository();
    createFailureUseCase = new CreateFailureUseCase(
      failuresRepository,
      importsRepository
    );
    createImportUseCase = new CreateImportUseCase(importsRepository);
  });

  it("should be able to create a failure register if valid data is passed", async () => {
    const imp = await createImportUseCase.execute({
      file_name: "some valid name",
      owner_id: "1234",
    });

    const failure = await createFailureUseCase.execute({
      import_id: imp.id,
      owner_id: "some_owner",
      provided_data: {
        data: "something",
      },
      reason: "It failed somehow",
    });

    expect(failure).toHaveProperty("id");
  });

  it("should throw if one of the required fields passed is empty", () => {
    expect(async () => {
      await createFailureUseCase.execute({
        import_id: "some_id",
        owner_id: "",
        provided_data: {
          data: "something",
        },
        reason: "",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should throw if the provided import id does not actually exist", () => {
    expect(async () => {
      await createFailureUseCase.execute({
        import_id: "some_id",
        owner_id: "some_owner",
        provided_data: {
          data: "something",
        },
        reason: "some_reason",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
