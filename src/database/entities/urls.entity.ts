import {
    Column,
    Entity,
    PrimaryColumn,
    BeforeInsert,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from './users.entity';

@Entity('urls')
export class Url {
    @PrimaryColumn({
        type: 'uuid',
        unique: true,
    })
    id: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    original_url: string;

    @Column({
        type: 'char',
        nullable: false,
        length: 6,
        unique: true,
    })
    short_url: string;

    @Column({
        type: 'timestamp',
        nullable: false,
        default: Date.now(),
    })
    created_at: string;

    @Column({
        type: 'timestamp',
        nullable: false,
        default: Date.now(),
    })
    updated_at: string;

    @Column({
        type: 'timestamp',
        nullable: false,
        default: Date.now(),
    })
    deleted_at: string | null;

    @Column({
        type: 'uuid',
        nullable: true,
    })
    user_id: string;

    @ManyToOne(() => User, (user) => user.urls)
    @JoinColumn({ name: 'user_id' })
    user?: User;

    @BeforeInsert()
    generateId() {
        this.id = crypto.randomUUID();
    }
}
