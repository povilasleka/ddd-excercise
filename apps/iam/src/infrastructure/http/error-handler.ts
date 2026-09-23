import type { ErrorRequestHandler } from 'express';
import { BaseError } from '@packages/common';

export const errorHandler: ErrorRequestHandler = (err: Error, _req, res, _next) => {
  if (err instanceof BaseError) {
    res.status(err.statusCode).json({ code: err.code, message: err.message });
    return;
  }

  console.error(err);
  res.status(500).json({ code: 'INTERNAL_SERVER_ERROR', message: 'Something went wrong' });
};
