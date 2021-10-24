import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListContactsUseCase } from "@modules/contacts/useCases/listContacts/ListContactsUseCase";

export class ContactsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { user } = request;

    const listContactsUseCase = container.resolve(ListContactsUseCase);

    const paginatedContactsData = await listContactsUseCase.execute({
      user_id: user.id,
    });

    return response.status(200).json({
      ...paginatedContactsData,
      data: classToClass(paginatedContactsData.data),
    });
  }
}
