import { initTRPC, TRPCError, type TRPCDefaultErrorShape } from '@trpc/server';
import type { Dependencies } from '../../dependencies.ts';
import { AppError } from '../../application/ports/app-error.ts';
import z, { ZodError } from 'zod';

function errorFormatter({ shape, error }: { shape: TRPCDefaultErrorShape; error: TRPCError }) {
  const zodError =
    error.code === 'BAD_REQUEST' && error.cause instanceof ZodError ? error.cause : null;
  const appError = error.cause instanceof AppError ? error.cause : null;

  return {
    ...shape,
    message: zodError ? z.prettifyError(zodError) : shape.message,
    data: {
      code: shape.data.code,
      httpStatus: shape.data.httpStatus,
      path: shape.data.path,
      errorCode: appError ? appError.code : zodError ? 'VALIDATION_ERROR' : shape.data.code,
      zodError: zodError ? z.flattenError(zodError) : null,
    },
  };
}

const t = initTRPC.context<Dependencies>().create({
  isDev: process.env.NODE_ENV === 'development',
  errorFormatter: errorFormatter,
});

export const router = t.router;
export const middleware = t.middleware;
export const procedure = t.procedure;
