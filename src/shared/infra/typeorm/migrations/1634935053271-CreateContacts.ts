import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateContacts1634935053271 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "contacts",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "date_of_birth",
            type: "timestamp",
          },
          {
            name: "telephone",
            type: "varchar",
          },
          {
            name: "address",
            type: "varchar",
          },
          {
            name: "credit_card",
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("contacts");
  }
}
