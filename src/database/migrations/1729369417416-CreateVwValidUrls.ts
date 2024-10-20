import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateVwActiveUrls1729369417416 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE VIEW 
                "vw_active_urls"
            AS
                SELECT 
                    u.id,
                    u.original_url,
                    u.short_url,
                    u.created_at,
                    u.updated_at,
                    u.user_id
                FROM 
                    urls u
                WHERE
                    u.deleted_at IS NULL
            ;  
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP VIEW "vw_active_urls"');
    }
}
