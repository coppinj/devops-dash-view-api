import { CoreHttpException } from './common';

export class ArgumentArrayEmptyException extends CoreHttpException {
  constructor(property: string) {
    super(400, property ? `${property}: cannot be empty` : '');
  }
}