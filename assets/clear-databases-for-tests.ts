import { createConnection } from 'typeorm';
import * as path from 'path';

async function clearDatabase(typeOrmConfig) {
  const connection = await createConnection(typeOrmConfig);

  for (const entity of connection.entityMetadatas) {
    const repository = connection.getRepository(entity.name);
    await repository.clear();
  }

  await connection.close();
}

const configPath = path.join(
  __dirname,
  `../apps/sensors/src/app/infrastructure/persistence/type-orm/type-orm.config.ts`,
);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sensorsTypeOrmConfig = require(configPath).default;

clearDatabase(sensorsTypeOrmConfig)
  .then(() => console.log('Database cleared successfully'))
  .catch((error) => console.error('Failed to clear database', error));
