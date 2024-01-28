import { Index, ObjectType } from 'typeorm';
import { StringKeyOf } from '../../model';

export function UniqueIndex<TEntity>(objectType: ObjectType<TEntity>, ...columns: (StringKeyOf<TEntity>)[]): ClassDecorator {
  return Index(columns, {
    unique: true,
  });
}
