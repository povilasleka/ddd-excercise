import express, { type Express, type Request, type Response } from 'express';
import { errorHandler } from './error-handler.ts';
import { createUserRouter, type UserRouterDependencies } from './router.ts';

export type AppDependencies = UserRouterDependencies;

export function initExpressApp(dependencies: AppDependencies): Express {
  const app: Express = express();
  app.use(express.json());

  app.get('/', (_req: Request, res: Response) => {
    res.send('Hello World!');
  });

  app.use(createUserRouter(dependencies));

  app.use(errorHandler);

  return app;
}
