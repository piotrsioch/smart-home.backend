import { v4 } from 'uuid';
import { AggregateRoot } from '@nestjs/cqrs';

export class BaseModel extends AggregateRoot {
  _id: string;
  createdAt: Date;

  create(): void {
    this._id = v4();
    this.createdAt = new Date();
  }
}
