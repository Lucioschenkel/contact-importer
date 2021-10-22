import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "@modules/users/useCases/CreateUser/CreateUserUseCase";

export default class UsersController {
  async create(request: Request, response: Response) {
    const { username, password } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      password,
      username,
    });

    return response.json(classToClass(user));
  }
}
