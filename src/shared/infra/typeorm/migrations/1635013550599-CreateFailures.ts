import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFailures1635013550599 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "failures",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "provided_data",
            type: "json",
          },
          {
            name: "reason",
            type: "varchar",
          },
          {
            name: "import_id",
            type: "uuid",
          },
          {
            name: "owner_id",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["import_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "imports",
            name: "FKImportId",
          },
          {
            columnNames: ["owner_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            name: "FKFailureOwnerId",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("failures");
  }
}
