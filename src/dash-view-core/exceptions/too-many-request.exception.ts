import { CoreHttpException } from './common';

export class TooManyRequestException extends CoreHttpException {
  constructor();
  constructor(message: string);
  constructor(message?: string) {
    super(429, message);
  }
}