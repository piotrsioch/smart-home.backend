import * as path from 'path';
import { exec } from 'child_process';

function seedDatabase(serviceName: string) {
  const cliPath = path.join(__dirname, `../apps/${serviceName}/src/seed/seed.ts`);

  exec(`ts-node -r tsconfig-paths/register ${cliPath}`, (error, stdout, stderr) => {
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

const serviceName = process.argv[2];
seedDatabase(serviceName);
