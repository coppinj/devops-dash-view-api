import { Column } from 'typeorm';
import { ColumnOptions } from 'typeorm/decorator/options/ColumnOptions';

export function JsonColumn(name: string, nullable: boolean = true, extendedOptions?: ColumnOptions): PropertyDecorator {
  return Column({
    type: 'json',
    name,
    nullable,
    ...extendedOptions,
  });
}