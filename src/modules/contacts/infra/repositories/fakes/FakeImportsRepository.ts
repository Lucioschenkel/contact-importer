import { IImport } from "@modules/contacts/domain/entities/IImport";
import {
  ICreateImportDTO,
  IImportsRepository,
} from "@modules/contacts/domain/repositories/IImportsRepository";

import { Import } from "../../entities/Import";

export class FakeImportsRepository implements IImportsRepository {
  private imports: IImport[] = [];

  async findAllByOwnerId(owner_id: string): Promise<IImport[]> {
    const imports = this.imports.filter((i) => i.owner_id === owner_id);

    return imports;
  }

  async create({
    file_name,
    owner_id,
    status,
    download_url,
  }: ICreateImportDTO): Promise<IImport> {
    const imp = new Import();

    Object.assign(imp, {
      file_name,
      owner_id,
      status,
      download_url,
    });

    this.imports.push(imp);

    return imp;
  }

  async findById(id: string): Promise<IImport> {
    const imp = this.imports.find((i) => i.id === id);

    return imp;
  }

  async update(imp: IImport): Promise<void> {
    this.imports = this.imports.map((i) => {
      if (i.id === imp.id) {
        return imp;
      }

      return i;
    });
  }

  async remove(imp: IImport): Promise<void> {
    this.imports = this.imports.filter((i) => i.id !== imp.id);
  }
}
