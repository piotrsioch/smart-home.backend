import { v4 } from 'uuid';
import { AggregateRoot } from '@nestjs/cqrs';

export class BaseModel extends AggregateRoot {
  _id: string;
  createdAt: Date;
  updatedAt: Date = null;

  create(): BaseModel {
    this._id = v4();
    this.createdAt = new Date();
    this.updatedAt = new Date();

    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(...args: unknown[]): void {
    this.updatedAt = new Date();
  }
}
