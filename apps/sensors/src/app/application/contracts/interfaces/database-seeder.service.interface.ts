export interface IDatabaseSeederService {
  seedAllEntities(): Promise<void>;
}

export abstract class IDatabaseSeederService implements IDatabaseSeederService {}
