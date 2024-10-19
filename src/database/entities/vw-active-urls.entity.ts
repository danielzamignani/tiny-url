import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity('vw_active_urls')
export class VwActiveUrl {
    @ViewColumn()
    id: string;

    @ViewColumn()
    original_url: string;

    @ViewColumn()
    short_url: string;

    @ViewColumn()
    created_at: string;

    @ViewColumn()
    updated_at: string;

    @ViewColumn()
    user_id: string;
}
