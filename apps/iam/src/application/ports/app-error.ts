export type ErrorType =
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'UNPROCESSABLE_CONTENT'
  | 'TOO_MANY_REQUESTS'
  | 'INTERNAL_SERVER_ERROR';

export abstract class AppError extends Error {
  public readonly code: string;
  public readonly type: ErrorType;

  constructor(message: string, code: string, type: ErrorType) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.type = type;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
