import { Module } from '@nestjs/common';
import { typeORMConnection } from './database/typeorm.connection';

@Module({
  imports: [typeORMConnection],
  controllers: [],
  providers: [],
})
export class AppModule {}
