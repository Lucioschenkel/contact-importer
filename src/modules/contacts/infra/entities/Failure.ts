/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { IFailure } from "@modules/contacts/domain/entities/IFailure";

@Entity({ name: "failures" })
export class Failure implements IFailure {
  @PrimaryColumn()
  id: string;

  @Column({ type: "json" })
  provided_data: any;

  @Column()
  reason: string;

  @Column()
  import_id: string;

  @Column()
  owner_id: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
