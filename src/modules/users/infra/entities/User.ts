import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { IUser } from "@modules/users/domain/entities/IUser";

@Entity({ name: "users" })
export class User implements IUser {
  @PrimaryColumn()
  id: string;

  @Index()
  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
