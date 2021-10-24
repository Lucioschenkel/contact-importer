import { getRepository, Repository } from "typeorm";

import { IImport } from "@modules/contacts/domain/entities/IImport";
import {
  ICreateImportDTO,
  IImportsRepository,
} from "@modules/contacts/domain/repositories/IImportsRepository";

import { Import } from "../entities/Import";

export class ImportsRepository implements IImportsRepository {
  private repository: Repository<Import>;

  constructor() {
    this.repository = getRepository(Import);
  }

  async findAllByOwnerId(owner_id: string): Promise<IImport[]> {
    const imports = await this.repository.find({
      where: {
        owner_id,
      },
    });

    return imports;
  }

  async create({
    download_url,
    file_name,
    owner_id,
    status,
  }: ICreateImportDTO): Promise<IImport> {
    const imp = this.repository.create({
      download_url,
      file_name,
      owner_id,
      status,
    });

    await this.repository.save(imp);

    return imp;
  }

  async findById(id: string): Promise<IImport> {
    const imp = await this.repository.findOne(id);

    return imp;
  }

  async update(imp: Import) {
    await this.repository.save(imp);
  }

  async remove(imp: Import): Promise<void> {
    await this.repository.remove(imp);
  }
}
