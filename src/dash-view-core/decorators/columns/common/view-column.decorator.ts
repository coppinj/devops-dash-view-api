import { ViewColumn as ViewColumnTypeORM } from 'typeorm';
import { ViewColumnOptions } from 'typeorm/decorator/options/ViewColumnOptions';

export function ViewColumn(name: string, extendedOptions?: ViewColumnOptions): PropertyDecorator {
  return ViewColumnTypeORM({
    name,
    ... extendedOptions,
  });
}