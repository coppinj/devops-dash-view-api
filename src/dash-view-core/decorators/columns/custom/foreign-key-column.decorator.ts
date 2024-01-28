import { IntColumn } from '../common';

export function ForeignKeyColumn(name: string, nullable: boolean = true): PropertyDecorator {
  return IntColumn(name, nullable);
}