import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "@modules/users/useCases/AuthenticateUser/AuthenticateUserUseCase";

export class AuthController {
  async create(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const token = await authenticateUserUseCase.execute({ username, password });

    return response.json({ token });
  }
}
