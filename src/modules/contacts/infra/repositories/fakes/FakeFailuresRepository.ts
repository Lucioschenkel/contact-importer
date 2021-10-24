import { IFailure } from "@modules/contacts/domain/entities/IFailure";
import {
  ICreateFailureDTO,
  IFailuresRepository,
} from "@modules/contacts/domain/repositories/IFailuresRepository";

import { Failure } from "../../entities/Failure";

export class FakeFailuresRepository implements IFailuresRepository {
  private failures: IFailure[] = [];

  async create({
    import_id,
    owner_id,
    provided_data,
    reason,
  }: ICreateFailureDTO): Promise<IFailure> {
    const failure = new Failure();

    Object.assign(failure, {
      import_id,
      owner_id,
      provided_data,
      reason,
    });

    this.failures.push(failure);

    return failure;
  }

  async findByOwnerId(owner_id: string): Promise<IFailure[]> {
    const failures = this.failures.filter((f) => f.owner_id === owner_id);

    return failures;
  }
}
