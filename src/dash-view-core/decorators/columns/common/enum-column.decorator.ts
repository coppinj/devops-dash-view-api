import { Column } from 'typeorm';
import { ColumnOptions } from 'typeorm/decorator/options/ColumnOptions';

export function EnumColumn(name: string, possibleValues: (string | number)[] | Object, nullable: boolean = true, extendedOptions?: ColumnOptions): PropertyDecorator {
  return Column({
    type: 'enum',
    name,
    nullable,
    enum: possibleValues,
    ... extendedOptions,
  });
}