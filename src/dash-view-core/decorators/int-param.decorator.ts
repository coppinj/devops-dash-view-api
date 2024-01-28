import { Param, ParseIntPipe, PipeTransform } from '@nestjs/common';
import { Type } from '@nestjs/common/interfaces';

export function IntParam(property: string, ...pipes: (Type<PipeTransform> | PipeTransform)[]): ParameterDecorator {
  return Param(property, new ParseIntPipe(), ...pipes);
}