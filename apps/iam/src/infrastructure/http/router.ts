import { Router, type NextFunction, type Request, type Response } from 'express';
import type { RegisterUserUseCase } from '../../application/register-user/register-user.use-case.ts';

export interface UserRouterDependencies {
  registerUserUseCase: RegisterUserUseCase;
}

export function createUserRouter({ registerUserUseCase }: UserRouterDependencies): Router {
  const router = Router();

  router.post('/users', (req: Request, res: Response, next: NextFunction) => {
    registerUserUseCase
      .execute(req.body)
      .then((user) => res.status(201).json(user))
      .catch(next);
  });

  return router;
}
