/* eslint-disable import/no-duplicates */
import { Exclude, Expose } from "class-transformer";
import format from "date-fns/format";
import enUS from "date-fns/locale/en-US";
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

  @Exclude()
  @Column()
  date_of_birth: Date;

  @Column()
  telephone: string;

  @Column()
  address: string;

  @Column()
  @Exclude()
  credit_card: string;

  @Expose({ name: "credit_card" })
  @Column()
  credit_card_last_four_digits: string;

  @Column()
  franchise: string;

  @OneToOne(() => User)
  @Column()
  owner_id: string;

  @Column()
  email: string;

  @Expose({ name: "birth_date" })
  getBirthDate() {
    return format(this.date_of_birth, "yyyy MMMM dd", {
      locale: enUS,
    });
  }

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
