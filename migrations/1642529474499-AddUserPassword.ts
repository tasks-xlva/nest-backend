import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddUserPassword1642529474499 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(`user`)
    const columnConfig = {
      name: `password`,
      type: `character varying`,
    }

    await queryRunner.addColumn(
      table,
      new TableColumn({
        ...columnConfig,
        default: `'$2a$10$1GzIG2MzNFK9uxnj.ySk5.AR51N5pWTMoAaqoNP5hn5KI8I3SMQoy'`,
      }),
    )
    await queryRunner.changeColumn(
      table,
      `password`,
      new TableColumn(columnConfig),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns(`user`, [`password`])
  }
}
