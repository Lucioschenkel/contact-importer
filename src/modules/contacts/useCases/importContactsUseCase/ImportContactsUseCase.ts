import queue from "@shared/infra/queue";

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
  execute({ file, columns_names, user_id }: IRequest): void {
    queue.add("ContactSheetProcessing", {
      file: file.path,
      columns_names,
      user_id,
    });
  }
}
