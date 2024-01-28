import { CoreHttpException } from './common';

export class ArgumentFormatMismatchException extends CoreHttpException {
  constructor();
  constructor(property: string, expectedFormat: string);
  constructor(property?: string, expectedFormat?: string) {
    super(400, property ? `${property}: must have "${expectedFormat}" format` : '');
  }
}