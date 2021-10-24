import { IImport } from "@modules/contacts/domain/entities/IImport";
import { IImportsRepository } from "@modules/contacts/domain/repositories/IImportsRepository";

interface IRequest {
  owner_id: string;
}

export class ListImportsUseCase {
  constructor(private importsRepository: IImportsRepository) {}

  async execute({ owner_id }: IRequest): Promise<IImport[]> {
    const imports = await this.importsRepository.findAllByOwnerId(owner_id);

    return imports;
  }
}
