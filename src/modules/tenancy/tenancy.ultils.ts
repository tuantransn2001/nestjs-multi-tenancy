import { MikroORM } from '@mikro-orm/core';
import { tenantsOrmConfig } from '../../../tenant-orm.config';

const connections = new Map<string, MikroORM>();

export async function getTenantConnection(tenantId: string): Promise<MikroORM> {
  const connectionName = `tenant_${tenantId}`;

  if (connections.has(connectionName)) {
    const orm = connections.get(connectionName);

    if (!orm.isConnected()) {
      await orm.connect();
    }

    return orm;
  }

  const orm = await MikroORM.init({
    ...tenantsOrmConfig,
    dbName: connectionName,
    schema: connectionName,
  });

  connections.set(connectionName, orm);

  return orm;
}
