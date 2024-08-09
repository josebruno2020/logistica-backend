import { AppException, AppExceptionErrorType } from './app-exception';

export class AdapterException extends AppException {
  constructor(message: string) {
    super(AppExceptionErrorType.ADAPTER, message);
  }
}
