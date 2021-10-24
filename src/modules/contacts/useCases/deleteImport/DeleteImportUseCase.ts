import { inject, injectable } from "tsyringe";

import { IImportsRepository } from "@modules/contacts/domain/repositories/IImportsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  import_id: string;
}

@injectable()
export class DeleteImportUseCase {
  constructor(
    @inject("ImportsRepository")
    private importsRepository: IImportsRepository
  ) {}

  async execute({ import_id }: IRequest): Promise<void> {
    const imp = await this.importsRepository.findById(import_id);

    if (!imp) {
      throw new AppError("The specified import does not exist");
    }

    await this.importsRepository.remove(imp);
  }
}
