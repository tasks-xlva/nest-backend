import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableColumnOptions,
} from 'typeorm'

export class ChangeUserPK1643161889117 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable(`user`)
        await queryRunner.changeColumn(
          table,
          `email`,
          new TableColumn({ ...this.defaultEmailColumnConfig, isPrimary: true }),
        )
        await queryRunner.dropColumn(table, `id`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable(`user`)
        await queryRunner.addColumn(table, new TableColumn(this.idColumnConfig))
        await queryRunner.changeColumn(
          table,
          `email`,
          new TableColumn(this.defaultEmailColumnConfig),
        )
    }

    private defaultEmailColumnConfig: TableColumnOptions = {
        name: `email`,
        type: `character varying`,
        isUnique: true,
    }

    private idColumnConfig: TableColumnOptions = {
        name: `id`,
        type: `integer`,
        isPrimary: true,
        isGenerated: true,
        generationStrategy: `increment`,
    }
}
