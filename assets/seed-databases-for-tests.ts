import * as path from 'path';
import { exec } from 'child_process';

const microservices = ['sensors', 'notifications'];

function seedDatabase(microservice: string) {
  const cliPath = path.join(__dirname, `../apps/${microservice}/src/seed/seed.ts`);

  exec(`NODE_ENV=test ts-node -r tsconfig-paths/register ${cliPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    console.log(`stdout: ${stdout}`);
  });
}

microservices.forEach((microservice) => seedDatabase(microservice));
