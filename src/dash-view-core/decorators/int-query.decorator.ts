import { PipeTransform, Query } from '@nestjs/common';
import { Type } from '@nestjs/common/interfaces';
import { IntValidationPipe } from '../pipes';

export function IntQuery(property: string, mandatory: boolean = true, allowZero: boolean = false, ...pipes: (Type<PipeTransform> | PipeTransform)[]): ParameterDecorator {
  return Query(property, new IntValidationPipe(mandatory, allowZero), ...pipes);
}
