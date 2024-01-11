import { mikroOrmConfig } from 'mikro-orm.config';

export const tenantsOrmConfig = {
  ...mikroOrmConfig,
  // entities: ['dist/**/*.entity{.ts,.js}'],
  // migrations: ['dist/src/migrations/public/*{.ts,.js}'],
};
