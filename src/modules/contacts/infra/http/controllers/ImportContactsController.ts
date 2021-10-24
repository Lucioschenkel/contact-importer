import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateImportUseCase } from "@modules/contacts/useCases/createImport/CreateImportUseCase";
import queue from "@shared/infra/queue";

export class ImportContactsController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      name_column,
      email_column,
      phone_column,
      date_of_birth_column,
      address_column,
      credit_card_column,
    } = request.body;
    const { file, user } = request;

    const createImportUseCase = container.resolve(CreateImportUseCase);

    const imp = await createImportUseCase.execute({
      file_name: file.originalname,
      owner_id: user.id,
    });

    queue.add("ContactSheetProcessing", {
      file: file.path,
      columns_names: {
        name: name_column,
        email: email_column,
        phone: phone_column,
        date_of_birth: date_of_birth_column,
        address: address_column,
        credit_card: credit_card_column,
      },
      user_id: user.id,
      import_id: imp.id,
    });

    return response
      .status(200)
      .json({ message: "Your file is being processed." });
  }
}
