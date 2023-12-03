import { v4 } from 'uuid';

export class BaseModel {
  id: string;

  create(): void {
    this.id = v4();
  }
}
