import { container } from "tsyringe";

import queue from "@shared/infra/queue";

import { CreateImportUseCase } from "../createImport/CreateImportUseCase";

interface IRequest {
  file: Express.Multer.File;
  user_id: string;
  columns_names: {
    name: string;
    email: string;
    phone: string;
    date_of_birth: string;
    address: string;
    credit_card: string;
  };
}

export class ImportContactsUseCase {
  async execute({ file, columns_names, user_id }: IRequest): Promise<void> {
    const createImportUseCase = container.resolve(CreateImportUseCase);

    const imp = await createImportUseCase.execute({
      file_name: file.originalname,
      owner_id: user_id,
    });

    queue.add("ContactSheetProcessing", {
      file: file.path,
      columns_names,
      user_id,
      import_id: imp.id,
    });
  }
}
