import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class CreateUrlAccessLogs1729391052915 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'url_access_logs',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },

                    {
                        name: 'ip_address',
                        type: 'varchar',
                        length: '45',
                        isNullable: false,
                    },
                    {
                        name: 'user_agent',
                        type: 'text',
                        isNullable: false,
                    },
                    {
                        name: 'accessed_at',
                        type: 'timestamp',
                        default: 'now()',
                        isNullable: false,
                    },
                    {
                        name: 'url_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            'url_access_logs',
            new TableForeignKey({
                name: 'FKUrlLog',
                columnNames: ['url_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'urls',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('url_access_logs', 'FKUrlLog');
        await queryRunner.dropTable('url_access_logs');
    }
}
