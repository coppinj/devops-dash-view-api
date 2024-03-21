import { Column } from 'typeorm';
import { ColumnOptions } from 'typeorm/decorator/options/ColumnOptions';

export function IntColumn(name: string, nullable: boolean = true, extendedOptions?: ColumnOptions): PropertyDecorator {
  return Column({
    type: 'integer',
    name,
    nullable,
    ...extendedOptions,
  });
}