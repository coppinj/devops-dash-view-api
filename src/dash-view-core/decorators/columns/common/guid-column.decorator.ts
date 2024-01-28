import { Column } from 'typeorm';
import { ColumnOptions } from 'typeorm/decorator/options/ColumnOptions';

export function GuidColumn(name: string, nullable: boolean = false, extendedOptions?: ColumnOptions): PropertyDecorator {
  return Column({
    type: 'uuid',
    name,
    nullable,
    ... extendedOptions,
  });
}