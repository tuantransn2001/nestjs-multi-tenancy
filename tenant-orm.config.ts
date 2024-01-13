import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { mikroOrmConfig } from 'mikro-orm.config';

export const tenantsOrmConfig: MikroOrmModuleSyncOptions = {
  ...mikroOrmConfig,
  // entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: {
    path: process.cwd() + '/dist/src/migrations/public/tenants/',
  },
};
