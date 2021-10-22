import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { IContact } from "@modules/contacts/domain/entities/IContact";

@Entity({ name: "contacts" })
export class Contact implements IContact {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  date_of_birth: Date;

  @Column()
  telephone: string;

  @Column()
  address: string;

  @Column()
  credit_card: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
