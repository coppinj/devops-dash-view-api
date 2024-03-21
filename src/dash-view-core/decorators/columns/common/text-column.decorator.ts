import { Column } from 'typeorm';
import { ColumnOptions } from 'typeorm/decorator/options/ColumnOptions';

export function TextColumn(name: string, nullable: boolean = true, extendedOptions?: ColumnOptions): PropertyDecorator {
  return Column({
    type: 'text',
    name,
    nullable,
    ...extendedOptions,
  });
}