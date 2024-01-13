import { Global, Module, Scope } from '@nestjs/common';
import { CONNECTION } from './tenancy.symbols';
import { Request } from 'express';
import { getTenantConnection } from './tenancy.ultils';
import { REQUEST } from '@nestjs/core';

const connectionFactory = {
  provide: CONNECTION,
  scope: Scope.REQUEST,
  useFactory: (request: Request) => {
    const tenantId = request['tenantId'];

    if (!tenantId) return null;

    return getTenantConnection(tenantId);
  },
  inject: [REQUEST],
};

@Global()
@Module({
  providers: [connectionFactory],
  exports: [CONNECTION],
})
export class TenancyModule {}
