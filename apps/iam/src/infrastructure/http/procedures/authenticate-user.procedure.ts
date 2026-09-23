import { z } from 'zod';
import { procedure } from '../errors.ts';

const authenticateUserSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const authenticateUser = procedure
  .input(authenticateUserSchema)
  .mutation(({ ctx, input }) => ctx.authenticateUser(input));
