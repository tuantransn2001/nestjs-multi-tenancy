import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { Tenant } from './tenant.entity';
import { CreateTenantsDto } from '../dto/create-tenant.dto';
import { EntityManager } from '@mikro-orm/core';
import { getTenantConnection } from 'src/modules/tenancy/tenancy.ultils';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantsRepository: EntityRepository<Tenant>,
    private readonly em: EntityManager,
  ) {}

  public async create(createTenantsDto: CreateTenantsDto): Promise<Tenant> {
    const tenant = this.tenantsRepository.create(
      new Tenant({
        id: createTenantsDto.id,
        name: createTenantsDto.name,
      }),
    );

    const schemaName = `tenant_${tenant.id}`;

    const sql = `CREATE SCHEMA IF NOT EXISTS ${schemaName};`;
    await this.em.getConnection().execute(sql);

    const connection = await getTenantConnection(tenant.id);

    await connection.getMigrator().up();

    return tenant;
  }

  public async findAll() {
    return {};
  }
}
