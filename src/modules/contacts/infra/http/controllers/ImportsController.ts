import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListImportsUseCase } from "@modules/contacts/useCases/listImports/ListImportsUseCase";

export class ImportsController {
  async index(request: Request, response: Response): Promise<Response> {
    const { user } = request;

    const listImportsUseCase = container.resolve(ListImportsUseCase);
    const imports = await listImportsUseCase.execute({ owner_id: user.id });

    return response.status(200).json(imports);
  }
}
