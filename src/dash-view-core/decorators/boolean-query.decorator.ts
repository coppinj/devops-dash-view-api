import { PipeTransform, Query } from '@nestjs/common';
import { Type } from '@nestjs/common/interfaces';
import { BooleanValidationPipe } from '../pipes';

export function BooleanQuery(property: string, mandatory: boolean = false, ...pipes: (Type<PipeTransform> | PipeTransform)[]): ParameterDecorator {
  return Query(property, new BooleanValidationPipe(mandatory), ...pipes);
}
