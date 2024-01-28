import { ColumnOptions } from 'typeorm/decorator/options/ColumnOptions';
import { VarcharColumn } from '../common';

export function EmailColumn(name: string = 'email', nullable: boolean = false, unique: boolean = true, extendedOptions?: ColumnOptions): PropertyDecorator {
  return VarcharColumn(name, nullable, {
    unique: unique,
    ... extendedOptions,
  });
}
