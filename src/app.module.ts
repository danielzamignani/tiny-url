import { Module } from '@nestjs/common';
import { typeORMConnection } from './configs/typeorm.connection';

@Module({
  imports: [typeORMConnection],
  controllers: [],
  providers: [],
})
export class AppModule {}
