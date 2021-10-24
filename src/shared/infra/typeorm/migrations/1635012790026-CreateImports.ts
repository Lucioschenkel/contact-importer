import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateImports1635012790026 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "imports",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "file_name",
            type: "varchar",
          },
          {
            name: "status",
            type: "enum",
            enum: ["HOLD", "PROCESSING", "FAILED", "FINISHED"],
          },
          {
            name: "download_url",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "owner_id",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["owner_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            name: "FKImportOwner",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("imports");
  }
}
