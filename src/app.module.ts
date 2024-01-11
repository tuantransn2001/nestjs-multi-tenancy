import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { TenantsModule } from './modules/public/tenants/tenants.module';
import { TenancyModule } from './modules/tenancy/tenancy.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { mikroOrmConfig } from 'mikro-orm.config';

dotenv.config();

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    TenantsModule,
    TenancyModule,
  ],
})
export class AppModule {}
