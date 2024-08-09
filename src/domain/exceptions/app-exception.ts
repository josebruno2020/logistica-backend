export enum AppExceptionErrorType {
  ADAPTER = 'ADAPTER',
}

export class AppException extends Error {
  constructor(type: AppExceptionErrorType, message: string) {
    super(`[${type}] - ${message}`);
  }
}
