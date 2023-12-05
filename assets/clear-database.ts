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

const serviceName = process.argv[2];

const configPath = path.join(
  __dirname,
  `../apps/${serviceName}/src/app/infrastructure/persistence/type-orm/type-orm.config.ts`,
);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const typeOrmConfig = require(configPath).default;

clearDatabase(typeOrmConfig)
  .then(() => console.log('Database cleared successfully'))
  .catch((error) => console.error('Failed to clear database', error));
