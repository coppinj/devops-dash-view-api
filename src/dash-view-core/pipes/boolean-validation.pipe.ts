import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ConverterHelper } from '../helpers';

@Injectable()
export class BooleanValidationPipe implements PipeTransform<string> {
  constructor(
    private readonly mandatory: boolean = false,
  ) {
  }

  async transform(value: any, _metadata: ArgumentMetadata): Promise<boolean | undefined> {
    if (!this.mandatory && value === undefined) {
      return undefined;
    }

    return ConverterHelper.toBoolean(value);
  }
}
