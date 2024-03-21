import { Column } from 'typeorm';
import { ColumnOptions } from 'typeorm/decorator/options/ColumnOptions';
import { isUndefinedOrNull } from '../../../helpers';

export function BooleanColumn(name: string, nullable: boolean = false, defaultValue: boolean | null = false, extendedOptions?: ColumnOptions): PropertyDecorator {
  return Column({
    type: 'boolean',
    name,
    nullable,
    default: isUndefinedOrNull(defaultValue) ? undefined : defaultValue,
    ...extendedOptions,
  });
}
