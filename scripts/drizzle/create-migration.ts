import { execSync } from 'node:child_process';
import process from 'node:process';

function getMigrationName(): string | undefined {
  const args = process.argv.slice(2);

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--name=')) {
      return arg.slice(7).trim();
    }
    if (arg === '--name' && args[i + 1] && !args[i + 1].startsWith('-')) {
      return args[i + 1].trim();
    }
  }

  return args.find((arg) => !arg.startsWith('-'))?.trim();
}

const migrationName = getMigrationName();

if (!migrationName) {
  console.error('❌ Error: Please provide a migration name.');
  console.error('   Usage: pnpm db:generate --name <migration_name>');
  console.error('      or: pnpm db:generate <migration_name>');
  process.exit(1);
}

const sanitizedName = migrationName.replace(/[^a-zA-Z0-9_-]/g, '_');

execSync(`npx drizzle-kit generate --name=${sanitizedName}`, {
  stdio: 'inherit',
});
