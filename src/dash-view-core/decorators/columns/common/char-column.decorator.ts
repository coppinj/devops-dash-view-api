import { Column } from 'typeorm';
import { ColumnOptions } from 'typeorm/decorator/options/ColumnOptions';

export function CharColumn(name: string, length: number, nullable: boolean = true, extendedOptions?: ColumnOptions): PropertyDecorator {
  return Column({
    type: 'char',
    name,
    nullable,
    length,
    ...extendedOptions,
  });
}