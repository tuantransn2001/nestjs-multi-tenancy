import { Migration } from '@mikro-orm/migrations';

export class Migration20210904083012 extends Migration {
  async up(): Promise<void> {
    this.addSql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    this.addSql(
      'CREATE TABLE "tenants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_a920abe6f6dd7764ee0f8108f57" PRIMARY KEY ("id"));',
    );
  }

  async down(): Promise<void> {
    this.addSql('DROP TABLE "tenants";');
  }
}
