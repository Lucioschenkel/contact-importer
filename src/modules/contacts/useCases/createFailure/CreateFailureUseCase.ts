/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, injectable } from "tsyringe";

import { IFailure } from "@modules/contacts/domain/entities/IFailure";
import { IFailuresRepository } from "@modules/contacts/domain/repositories/IFailuresRepository";
import { IImportsRepository } from "@modules/contacts/domain/repositories/IImportsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  provided_data: any;
  reason: string;
  import_id: string;
  owner_id: string;
}

@injectable()
export class CreateFailureUseCase {
  constructor(
    @inject("FailuresRepository")
    private failuresRepository: IFailuresRepository,
    @inject("ImportsRepository")
    private importsRepository: IImportsRepository
  ) {}

  async execute({
    reason,
    provided_data,
    import_id,
    owner_id,
  }: IRequest): Promise<IFailure> {
    if (!import_id || !reason || !owner_id) {
      throw new AppError("One or more required fields were not provided");
    }

    const importExists = await this.importsRepository.findById(import_id);

    if (!importExists) {
      throw new AppError("The provided import does not exist");
    }

    const failure = await this.failuresRepository.create({
      import_id,
      owner_id,
      provided_data,
      reason,
    });

    return failure;
  }
}
