import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { IContact } from "@modules/contacts/domain/entities/IContact";
import { User } from "@modules/users/infra/entities/User";

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

  @Column()
  credit_card_last_four_digits: string;

  @Column()
  franchise: string;

  @OneToOne(() => User)
  @Column()
  owner_id: string;

  email: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
