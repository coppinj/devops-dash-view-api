import { CoreHttpException } from './common';

export class ArgumentMustBeArrayException extends CoreHttpException {
  constructor(property: string) {
    super(400, property ? `${property}: must be Array` : '');
  }
}