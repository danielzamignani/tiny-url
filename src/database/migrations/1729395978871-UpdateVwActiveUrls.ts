import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateVwActiveUrls1729395978871 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE OR REPLACE VIEW 
                "vw_active_urls"
            AS
                SELECT 
                    u.id,
                    u.original_url,
                    u.short_url,
                    u.created_at,
                    u.updated_at,
                    u.user_id,
                    COUNT(ual.id) AS total_access
                FROM 
                    urls u
                LEFT JOIN 
                    url_access_logs ual
                ON ual.url_id = u.id
                WHERE 
                    u.deleted_at IS NULL
                GROUP BY u.id
            ;  
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP VIEW "vw_active_urls"
            ;

            CREATE OR REPLACE VIEW 
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
}
