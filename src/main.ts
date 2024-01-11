import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { tenantMiddleware } from './modules/tenancy/tenancy.middleware';
import { EntityManager, MikroORM } from '@mikro-orm/core';
import { getTenantConnection } from './modules/tenancy/tenancy.ultils';
import { mikroOrmConfig } from 'mikro-orm.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(tenantMiddleware);
  app.useGlobalPipes(new ValidationPipe());

  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  const em: EntityManager = orm.em;
  const schemas = await em
    .getConnection()
    .execute('select schema_name as name from information_schema.schemata;');

  for (let i = 0; i < schemas.length; i += 1) {
    const { name: schema } = schemas[i];

    if (schema.startsWith('tenant_')) {
      const tenantId = schema.replace('tenant_', '');
      const connection = await getTenantConnection(tenantId);
      await connection.getMigrator().up();
      await connection.close();
    }
  }

  await app.listen(3000);
}
bootstrap();
