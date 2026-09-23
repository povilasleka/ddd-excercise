import { z } from 'zod';
import { procedure } from '../errors.ts';

const registerUserSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const registerUser = procedure
  .input(registerUserSchema)
  .mutation(({ ctx, input }) => ctx.registerUser(input));
