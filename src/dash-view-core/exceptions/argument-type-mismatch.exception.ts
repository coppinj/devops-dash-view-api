import { CoreHttpException } from './common';

export class ArgumentTypeMismatchException extends CoreHttpException {
  constructor();
  constructor(property: string, expectedType: string);
  constructor(property?: string, expectedType?: string) {
    super(400, property ? `${property}: must be of type ${expectedType}` : '');
  }
}