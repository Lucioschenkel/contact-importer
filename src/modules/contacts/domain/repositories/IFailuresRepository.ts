/* eslint-disable @typescript-eslint/no-explicit-any */
import { IFailure } from "../entities/IFailure";

export interface ICreateFailureDTO {
  provided_data: any;
  reason: string;
  import_id: string;
  owner_id: string;
}

export interface IFailuresRepository {
  create(data: ICreateFailureDTO): Promise<IFailure>;
  findByOwnerId(owner_id: string): Promise<IFailure[]>;
}
