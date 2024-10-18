import { Module } from '@nestjs/common';
import { UserModule } from './domains/users/user.module';
import { typeORMConnection } from './database/typeorm.connection';

@Module({
    imports: [typeORMConnection, UserModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
