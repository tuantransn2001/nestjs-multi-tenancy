import { v4 as uuidv4 } from 'uuid';
import { Entity, PrimaryKey, Property, UuidType } from '@mikro-orm/core';

export interface ITenant {
  id: string;
  name: string;
}

@Entity()
export class Tenant implements ITenant {
  @PrimaryKey({ type: UuidType, defaultRaw: uuidv4() })
  id: string;
  @Property()
  name: string;

  constructor(t?: ITenant) {
    if (t) {
      this.id = t.id || uuidv4();
      this.name = t.name || '';
    }
  }

  public toDto() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
