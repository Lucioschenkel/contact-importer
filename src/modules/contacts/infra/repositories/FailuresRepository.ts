import { getRepository, Repository } from "typeorm";

import { IFailure } from "@modules/contacts/domain/entities/IFailure";
import {
  ICreateFailureDTO,
  IFailuresRepository,
} from "@modules/contacts/domain/repositories/IFailuresRepository";

import { Failure } from "../entities/Failure";

export class FailuresRepository implements IFailuresRepository {
  private repository: Repository<Failure>;

  constructor() {
    this.repository = getRepository(Failure);
  }

  async create({
    import_id,
    owner_id,
    provided_data,
    reason,
  }: ICreateFailureDTO): Promise<IFailure> {
    const failure = this.repository.create({
      import_id,
      owner_id,
      provided_data,
      reason,
    });

    await this.repository.save(failure);

    return failure;
  }

  async findByOwnerId(owner_id: string): Promise<IFailure[]> {
    const failures = await this.repository.find({
      where: {
        owner_id,
      },
    });

    return failures;
  }
}
