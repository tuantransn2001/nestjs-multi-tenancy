import * as dotenv from 'dotenv';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';

dotenv.config();

export const mikroOrmConfig: MikroOrmModuleSyncOptions = {
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: process.env.DB_DATABASE,
  clientUrl: `postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
  driver: PostgreSqlDriver,
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    path: process.cwd() + '/dist/src/migrations/public/',
  },
  extensions: [Migrator],
};
