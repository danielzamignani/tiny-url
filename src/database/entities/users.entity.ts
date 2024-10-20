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
        name: 'id',
    })
    id: string;

    @Column({
        type: 'varchar',
        length: '150',
        nullable: false,
        name: 'name',
    })
    name: string;

    @Column({
        type: 'varchar',
        length: '255',
        nullable: false,
        name: 'email',
    })
    email: string;

    @Column({
        type: 'varchar',
        length: '255',
        nullable: false,
        name: 'password',
    })
    password: string;

    @Column({
        type: 'timestamp',
        nullable: false,
        default: Date.now(),
        name: 'created_at',
    })
    createdAt: string;

    @OneToMany(() => Url, (url) => url.user)
    urls?: Url[];

    @BeforeInsert()
    generateId() {
        this.id = crypto.randomUUID();
    }
}
