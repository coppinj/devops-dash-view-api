import { ColumnOptions } from 'typeorm/decorator/options/ColumnOptions';
import { VarcharColumn } from '../common';

export function UniqueCodeColumn(name: string = 'code', nullable: boolean = false, unique: boolean = true, extendedOptions?: ColumnOptions): PropertyDecorator {
  return VarcharColumn(name, nullable, {
    unique: unique,
    ...extendedOptions,
  });
}
