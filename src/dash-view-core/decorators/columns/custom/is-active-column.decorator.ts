import { ColumnOptions } from 'typeorm/decorator/options/ColumnOptions';
import { BooleanColumn } from '../common';

export function IsActiveColumn(extendedOptions?: ColumnOptions): PropertyDecorator {
  return BooleanColumn('is_active', false, true, extendedOptions);
}
