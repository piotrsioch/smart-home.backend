import { v4 } from 'uuid';
import { AggregateRoot } from '@nestjs/cqrs';

export class BaseModel extends AggregateRoot {
  id: string;
  createdAt: Date;

  create(): void {
    this.id = v4();
    this.createdAt = new Date();
  }
}
