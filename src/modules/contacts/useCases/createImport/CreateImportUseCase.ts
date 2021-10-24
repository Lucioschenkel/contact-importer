import { inject, injectable } from "tsyringe";

import { IImport } from "@modules/contacts/domain/entities/IImport";
import { IImportsRepository } from "@modules/contacts/domain/repositories/IImportsRepository";

interface IRequest {
  file_name: string;
  owner_id: string;
}

@injectable()
export class CreateImportUseCase {
  constructor(
    @inject("ImportsRepository")
    private importsRepository: IImportsRepository
  ) {}

  async execute({ file_name, owner_id }: IRequest): Promise<IImport> {
    const imp = await this.importsRepository.create({
      file_name,
      owner_id,
      status: "HOLD",
    });

    return imp;
  }
}
