import { ObjectType, OneToMany as OneToManyTypeOrm } from 'typeorm';
import { RelationOptions } from 'typeorm/decorator/options/RelationOptions';

export function OneToMany<T>(
  typeFunction: () => ObjectType<T>,
  inverseSide: (entity: T) => any,
  eager: boolean = false,
  cascade: boolean | ('insert' | 'update' | 'remove' | 'soft-remove' | 'recover')[] = ['insert', 'update'],
  extendedOptions?: RelationOptions): PropertyDecorator {
  return OneToManyTypeOrm(typeFunction, inverseSide, {
    cascade,
    eager,
    ...extendedOptions,
  });
}
