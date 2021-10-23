import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateContacts1634956051861 implements MigrationInterface {
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
          {
            name: "credit_card_last_four_digits",
            type: "varchar",
          },
          {
            name: "franchise",
            type: "varchar",
          },
          {
            name: "owner_id",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            name: "FKOwnerId",
            columnNames: ["owner_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("contacts");
  }
}
