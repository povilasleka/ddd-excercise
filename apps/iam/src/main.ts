import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { registerDependencies } from './dependencies.ts';
import { appRouter } from './infrastructure/http/router.ts';

async function main() {
  const dependencies = await registerDependencies();

  const server = createHTTPServer({
    router: appRouter,
    createContext: () => dependencies,
  });

  const port = process.env.PORT || 3003;
  server.listen(port);
}

await main();
