import { router } from './trpc.ts';
import { registerUser } from './procedures/register-user.procedure.ts';
import { authenticateUser } from './procedures/authenticate-user.procedure.ts';

export const appRouter = router({
  registerUser,
  authenticateUser,
});

export type AppRouter = typeof appRouter;
