import { inject, injectable } from "tsyringe";

import { IImportsRepository } from "@modules/contacts/domain/repositories/IImportsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  status: "PROCESSING" | "FAILED" | "FINISHED";
  import_id: string;
  download_url?: string;
}

@injectable()
export class UpdateImportUseCase {
  constructor(
    @inject("ImportsRepository")
    private importsRepository: IImportsRepository
  ) {}

  async execute({ status, import_id, download_url }: IRequest): Promise<void> {
    const imp = await this.importsRepository.findById(import_id);

    console.log(import_id);

    if (!imp) {
      throw new AppError("Import not found", 404);
    }

    imp.status = status;

    if (download_url) {
      imp.download_url = download_url;
    }

    await this.importsRepository.update(imp);

    console.log(`After update: ${imp.id}`);
  }
}
