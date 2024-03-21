import { Column } from 'typeorm';
import { ColumnOptions } from 'typeorm/decorator/options/ColumnOptions';

export function VarcharColumn(name: string, nullable: boolean = true, extendedOptions?: ColumnOptions): PropertyDecorator {
  return Column({
    type: 'varchar',
    name,
    nullable,
    length: extendedOptions?.length ?? 255,
    ...extendedOptions,
  });
}