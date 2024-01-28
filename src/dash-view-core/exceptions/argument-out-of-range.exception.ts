import { CoreHttpException } from './common';

export class ArgumentOutOfRangeException extends CoreHttpException {
  constructor();
  constructor(message: string);
  constructor(property: string, message: string);
  constructor(propertyOrMessage?: string, propertyMessage?: string) {
    super(400, propertyMessage ? `${propertyOrMessage}: ${propertyMessage}` : propertyOrMessage ?? '');
  }
}