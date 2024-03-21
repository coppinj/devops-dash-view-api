import { applyDecorators } from '@nestjs/common';
import { JoinTable, ManyToMany as ManyToManyTypeOrm, ObjectType } from 'typeorm';
import { RelationOptions } from 'typeorm/decorator/options/RelationOptions';

export function ManyToMany<T>(
  withJoinTable: boolean,
  typeFunction: () => ObjectType<T>,
  inverseSide?: (object: T) => any,
  cascade: boolean | ('insert' | 'update' | 'remove' | 'soft-remove' | 'recover')[] = ['insert', 'update'],
  extendedOptions?: RelationOptions): PropertyDecorator {
  const joinTableFunc = JoinTable();
  const manyToManyFunc = ManyToManyTypeOrm(typeFunction, inverseSide, {
    cascade,
    ...extendedOptions,
  });

  if (withJoinTable) {
    return applyDecorators(manyToManyFunc, joinTableFunc);
  }

  return applyDecorators(manyToManyFunc);
}