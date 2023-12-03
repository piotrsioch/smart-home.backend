import { v4 } from 'uuid';
import { AggregateRoot } from '@nestjs/cqrs';

export class BaseModel extends AggregateRoot {
  id: string;

  create(): void {
    this.id = v4();
  }
}
