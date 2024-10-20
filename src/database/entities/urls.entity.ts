import {
    Column,
    Entity,
    PrimaryColumn,
    BeforeInsert,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import { User } from './users.entity';
import { UrlAccessLog } from './url-access-logs.entity';

@Entity('urls')
export class Url {
    @PrimaryColumn({
        type: 'uuid',
        unique: true,
        name: 'id',
    })
    id: string;

    @Column({
        type: 'text',
        nullable: false,
        name: 'original_url',
    })
    originalUrl: string;

    @Column({
        type: 'char',
        nullable: false,
        length: 6,
        unique: true,
        name: 'short_url',
    })
    shortUrl: string;

    @Column({
        type: 'timestamp',
        nullable: false,
        default: Date.now(),
        name: 'created_at',
    })
    createdAt: string | number;

    @Column({
        type: 'timestamp',
        nullable: false,
        default: Date.now(),
        name: 'updated_at',
    })
    updatedAt: string | number;

    @Column({
        type: 'timestamp',
        nullable: false,
        default: Date.now(),
        name: 'deleted_at',
    })
    deletedAt: string | null | number;

    @Column({
        type: 'uuid',
        nullable: true,
        name: 'user_id',
    })
    userId: string;

    @ManyToOne(() => User, (user) => user.urls)
    @JoinColumn({ name: 'user_id' })
    user?: User;

    @OneToMany(() => UrlAccessLog, (urlAccessLog) => urlAccessLog.url)
    accessLogs?: UrlAccessLog[];

    @BeforeInsert()
    generateId() {
        this.id = crypto.randomUUID();
    }
}
