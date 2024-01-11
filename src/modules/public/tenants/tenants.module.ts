import { Module } from '@nestjs/common';
import { Tenant } from './tenant.entity';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
@Module({
  imports: [MikroOrmModule.forFeature([Tenant])],
  controllers: [TenantsController],
  providers: [TenantsService],
  exports: [TenantsService],
})
export class TenantsModule {}
