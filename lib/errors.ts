export class AppError<TCode extends string = string> extends Error {
  public readonly code: TCode;
  public readonly userMessage: string;

  constructor(code: TCode, userMessage: string, options?: ErrorOptions) {
    super(userMessage, options);
    this.name = 'AppError';
    this.code = code;
    this.userMessage = userMessage;
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

export function getUserMessage(error: unknown): string {
  return isAppError(error) ? error.userMessage : 'An unexpected error occurred.';
}
