import { v4 as uuidv4 } from 'uuid';
import { Entity, PrimaryKey, Property, UuidType } from '@mikro-orm/core';

export interface IUser {
  id: string;
  name: string;
}

@Entity()
export class User implements IUser {
  @PrimaryKey({ type: UuidType, defaultRaw: uuidv4() })
  id: string;
  @Property()
  name: string;

  constructor(user?: IUser) {
    if (user) {
      this.id = user.id || uuidv4();
      this.name = user.name || '';
    }
  }

  public toDto() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
