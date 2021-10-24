import { inject, injectable } from "tsyringe";

import { IFailure } from "@modules/contacts/domain/entities/IFailure";
import { IFailuresRepository } from "@modules/contacts/domain/repositories/IFailuresRepository";

interface IRequest {
  owner_id: string;
}

@injectable()
export class ListFailuresUseCase {
  constructor(
    @inject("FailuresRepository")
    private failuresRepository: IFailuresRepository
  ) {}

  async execute({ owner_id }: IRequest): Promise<IFailure[]> {
    const failures = await this.failuresRepository.findByOwnerId(owner_id);

    return failures;
  }
}
