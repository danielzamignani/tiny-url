import { config as dotenvConfig } from 'dotenv';
import { DataSource } from 'typeorm';

dotenvConfig({ path: '.env' });

export const typeormConfig: any = {
  type: 'postgres',
  host: `${process.env.DATABASE_HOST}`,
  port: +process.env.DATABASE_PORT,
  username: `${process.env.DATABASE_USERNAME}`,
  password: `${process.env.DATABASE_PASSWORD}`,
  database: `${process.env.DATABASE_NAME}`,
  entities: [__dirname + '/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
};

export default new DataSource(typeormConfig);
