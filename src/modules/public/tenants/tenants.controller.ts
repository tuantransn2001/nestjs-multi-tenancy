import { Body, Controller, Get, Post } from '@nestjs/common';
import { Tenant } from './tenant.entity';
import { TenantsService } from './tenants.service';
import { CreateTenantsDto } from '../dto/create-tenant.dto';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  public async create(
    @Body() createTenantDto: CreateTenantsDto,
  ): Promise<Tenant> {
    return this.tenantsService.create(createTenantDto);
  }

  @Get()
  public async findAll() {
    return this.tenantsService.findAll();
  }
}
