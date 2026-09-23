import { TRPCError, type TRPC_ERROR_CODE_KEY } from '@trpc/server';
import { AppError, type ErrorType } from '../../application/ports/app-error.ts';
import { middleware, procedure as rawProcedure } from './trpc.ts';

const ERROR_TYPE_TO_TRPC_CODE: Record<ErrorType, TRPC_ERROR_CODE_KEY> = {
  BAD_REQUEST: 'BAD_REQUEST',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  UNPROCESSABLE_CONTENT: 'UNPROCESSABLE_CONTENT',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
};

const mapAppErrors = middleware(async ({ next }) => {
  const result = await next();
  if (!result.ok && result.error.cause instanceof AppError) {
    const cause = result.error.cause;
    throw new TRPCError({
      code: ERROR_TYPE_TO_TRPC_CODE[cause.type],
      message: cause.message,
      cause,
    });
  }
  return result;
});

export const procedure = rawProcedure.use(mapAppErrors);
