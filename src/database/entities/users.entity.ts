import {
    Column,
    Entity,
    PrimaryColumn,
    BeforeInsert,
    OneToMany,
} from 'typeorm';
import { Url } from './urls.entity';

@Entity('users')
export class User {
    @PrimaryColumn({
        type: 'uuid',
        unique: true,
    })
    id: string;

    @Column({
        type: 'varchar',
        length: '150',
        nullable: false,
    })
    name: string;

    @Column({
        type: 'varchar',
        length: '255',
        nullable: false,
    })
    email: string;

    @Column({
        type: 'varchar',
        length: '255',
        nullable: false,
    })
    password: string;

    @Column({
        type: 'timestamp',
        nullable: false,
        default: Date.now(),
    })
    created_at: string;

    @OneToMany(() => Url, (url) => url.user)
    urls?: Url[];

    @BeforeInsert()
    generateId() {
        this.id = crypto.randomUUID();
    }
}
