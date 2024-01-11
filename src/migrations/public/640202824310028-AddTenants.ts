import { Migration } from '@mikro-orm/migrations';

export class Migration20210904083012 extends Migration {
  async up(): Promise<void> {
    this.addSql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    this.addSql(
      'DO $$ BEGIN CREATE TABLE IF NOT EXISTS "tenants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL); EXCEPTION WHEN duplicate_table THEN END $$;',
    );
  }

  async down(): Promise<void> {
    this.addSql('DROP TABLE IF EXISTS "tenants";');
  }
}
