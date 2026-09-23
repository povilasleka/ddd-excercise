import { getConfig } from './config/config.ts';
import { buildDrizzleClient } from './infrastructure/postgres/client.ts';
import { DrizzleUserRepository } from './infrastructure/postgres/user-repository.ts';
import { RegisterUserUseCase } from './application/register-user/register-user.use-case.ts';
import { initExpressApp } from './infrastructure/http/index.ts';

function main() {
  const config = getConfig();
  const { db } = buildDrizzleClient(config.databaseUrl);

  const userRepository = new DrizzleUserRepository(db);
  const registerUserUseCase = new RegisterUserUseCase(userRepository);

  const app = initExpressApp({ registerUserUseCase });

  const port = process.env.PORT || 3003;
  app.listen(port);
}

main();
