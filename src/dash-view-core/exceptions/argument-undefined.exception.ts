import { CoreHttpException } from './common';

export class ArgumentUndefinedException extends CoreHttpException {
  constructor(property: string) {
    super(400, property ? `${property}: cannot be undefined` : '');
  }
}