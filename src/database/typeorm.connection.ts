import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './typeorm.config';

export const typeORMConnection = TypeOrmModule.forRoot(typeormConfig);
