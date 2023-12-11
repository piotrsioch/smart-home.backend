// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { ServiceEnum } from '@smart-home.backend/libs/common';

export interface IInfrastructureEvent<T = any> {
  readonly receivers: ServiceEnum[];
  readonly pattern: string;
  readonly data: T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class InfrastructureEvent<T = any> implements IInfrastructureEvent<T> {
  abstract readonly receivers: ServiceEnum[];
  abstract readonly pattern: string;

  constructor(readonly data: T) {}
}
