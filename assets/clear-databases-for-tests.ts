import { createConnection } from 'typeorm';
import * as path from 'path';

const microservices = ['sensors', 'notifications'];

async function clearDatabase(microservice: string) {
  const configPath = path.join(
    __dirname,
    `../apps/${microservice}/src/app/infrastructure/persistence/type-orm/type-orm.config.ts`,
  );

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const typeOrmConfig = require(configPath).default;

  const connection = await createConnection(typeOrmConfig);

  for (const entity of connection.entityMetadatas) {
    const repository = connection.getRepository(entity.name);

    await repository.clear();
  }

  await connection.close();
}

microservices.forEach((microservice) =>
  clearDatabase(microservice)
    .then(() => console.log('Database cleared successfully'))
    .catch((error) => console.error('Failed to clear database', error)),
);
