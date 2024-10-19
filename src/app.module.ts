import { Module } from '@nestjs/common';
import { UserModule } from './domains/users/user.module';
import { typeORMConnection } from './database/typeorm.connection';
import { AuthModule } from './domains/auth/auth.module';
import { UrlModule } from './domains/urls/url.module';

@Module({
    imports: [typeORMConnection, UserModule, AuthModule, UrlModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
