import { Column } from 'typeorm';
import { ColumnOptions } from 'typeorm/decorator/options/ColumnOptions';

export function UuidColumn(name: string, nullable: boolean = true, extendedOptions?: ColumnOptions): PropertyDecorator {
  return Column({
    type: 'uuid',
    name,
    nullable,
    unique: extendedOptions?.unique,
    ...extendedOptions,
  });
}
