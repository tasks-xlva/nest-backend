import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddGroupUUID1643941225651 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(`group`)
    await queryRunner.addColumn(
      table,
      new TableColumn({
        name: `uuid`,
        type: `uuid`,
        isUnique: true,
        isGenerated: true,
        generationStrategy: 'uuid',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(`group`)
    await queryRunner.dropColumn(table, `uuid`)
  }
}
