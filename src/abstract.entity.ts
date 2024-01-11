import {
  Entity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export abstract class AbstractEntity {
  @PrimaryKey()
  _id: string;

  @SerializedPrimaryKey()
  id: string;

  @Property({ columnType: 'timestamptz', onCreate: () => new Date() })
  createdAt: Date;

  @Property({
    columnType: 'timestamptz',
    onUpdate: () => new Date(),
    nullable: true,
  })
  updatedAt: Date;

  constructor() {
    this._id = v4();
    this.id = this._id;
  }
}
