import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListFailuresUseCase } from "@modules/contacts/useCases/listFailures/ListFailuresUseCase";

export class FailuresController {
  async index(request: Request, response: Response): Promise<Response> {
    const { user } = request;

    const listFailuresUseCase = container.resolve(ListFailuresUseCase);

    const failures = await listFailuresUseCase.execute({ owner_id: user.id });

    return response.status(200).json(failures);
  }
}
