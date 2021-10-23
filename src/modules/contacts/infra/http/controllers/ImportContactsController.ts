import { Request, Response } from "express";

import { ImportContactsUseCase } from "@modules/contacts/useCases/importContactsUseCase/ImportContactsUseCase";

export class ImportContactsController {
  create(request: Request, response: Response): Response {
    const {
      name_column,
      email_column,
      phone_column,
      date_of_birth_column,
      address_column,
      credit_card_column,
    } = request.body;

    const importContactsUseCase = new ImportContactsUseCase();

    importContactsUseCase.execute({
      file: request.file,
      columns_names: {
        address: address_column,
        credit_card: credit_card_column,
        date_of_birth: date_of_birth_column,
        phone: phone_column,
        email: email_column,
        name: name_column,
      },
      user_id: request.user.id,
    });

    return response
      .status(200)
      .json({ message: "Your file is being processed." });
  }
}
