import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isUndefinedOrNull } from '../helpers';

@Injectable()
export class IntValidationPipe implements PipeTransform<string> {
  constructor(
    private readonly mandatory: boolean = true,
    private readonly allowZero: boolean = false,
  ) {
  }

  async transform(value: any, metadata: ArgumentMetadata): Promise<number | undefined> {
    const isInvalidInput = isUndefinedOrNull(value) || isNaN(value) || !isFinite(value);

    if (!this.mandatory && (isInvalidInput || (!this.allowZero && value === 0))) {
      return undefined;
    }

    if (isInvalidInput) {
      throw new BadRequestException();
    }

    if (!this.allowZero && value === 0) {
      throw new BadRequestException();
    }

    if (typeof value === 'number') {
      return Math.floor(value);
    }

    return parseInt(value, 10);
  }
}
