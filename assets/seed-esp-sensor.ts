import * as path from 'path';
import { exec } from 'child_process';

function seedDatabase() {
  const cliPath = path.join(__dirname, `../apps/sensors/src/seed/esp-seed.ts`);

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

seedDatabase();
