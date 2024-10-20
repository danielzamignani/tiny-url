import {
    Column,
    Entity,
    PrimaryColumn,
    BeforeInsert,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Url } from './urls.entity';

@Entity('url_access_logs')
export class UrlAccessLog {
    @PrimaryColumn({
        type: 'uuid',
        unique: true,
        name: 'id',
    })
    id: string;

    @Column({
        type: 'varchar',
        length: '45',
        nullable: false,
        name: 'ip_address',
    })
    ipAddress: string;

    @Column({
        type: 'text',
        nullable: false,
        name: 'user_agent',
    })
    userAgent: string;

    @Column({
        type: 'timestamp',
        nullable: false,
        default: Date.now(),
        name: 'accessed_at',
    })
    accessedAt: string | number;

    @Column({
        type: 'uuid',
        nullable: true,
        name: 'url_id',
    })
    urlId: string;

    @ManyToOne(() => Url, (url) => url.accessLogs)
    @JoinColumn({ name: 'url_id' })
    url?: Url;

    @BeforeInsert()
    generateId() {
        this.id = crypto.randomUUID();
    }
}
