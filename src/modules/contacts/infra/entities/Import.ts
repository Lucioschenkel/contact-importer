import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { IImport } from "@modules/contacts/domain/entities/IImport";

@Entity({ name: "imports" })
export class Import implements IImport {
  @PrimaryColumn()
  id: string;

  @Column()
  file_name: string;

  @Column()
  status: "HOLD" | "PROCESSING" | "FAILED" | "FINISHED";

  @Column({ nullable: true })
  download_url?: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  owner_id: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
