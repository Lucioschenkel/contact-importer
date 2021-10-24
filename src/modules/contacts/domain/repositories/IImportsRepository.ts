import { IImport } from "../entities/IImport";

export interface ICreateImportDTO {
  file_name: string;
  status: "HOLD" | "PROCESSING" | "FAILED" | "FINISHED";
  download_url?: string;
  owner_id: string;
}

export interface IImportsRepository {
  findAllByOwnerId(owner_id: string): Promise<IImport[]>;
  create(data: ICreateImportDTO): Promise<IImport>;
  findById(id: string): Promise<IImport>;
  update(imp: IImport): Promise<void>;
  remove(imp: IImport): Promise<void>;
}
