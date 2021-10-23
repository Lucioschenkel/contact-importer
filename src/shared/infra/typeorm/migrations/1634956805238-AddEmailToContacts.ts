import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddEmailToContacts1634956805238 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "contacts",
      new TableColumn({
        name: "email",
        type: "varchar",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("contacts", "email");
  }
}
