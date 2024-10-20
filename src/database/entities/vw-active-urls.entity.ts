import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity('vw_active_urls')
export class VwActiveUrl {
    @ViewColumn({
        name: 'id',
    })
    id: string;

    @ViewColumn({
        name: 'original_url',
    })
    originalUrl: string;

    @ViewColumn({
        name: 'short_url',
    })
    shortUrl: string;

    @ViewColumn({
        name: 'created_at',
    })
    createdAt: string;

    @ViewColumn({
        name: 'updated_at',
    })
    updatedAt: string;

    @ViewColumn({
        name: 'user_id',
    })
    userId: string;

    @ViewColumn({
        name: 'total_access',
    })
    totalAccess: number;
}
