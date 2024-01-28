import { applyDecorators } from '@nestjs/common';
import { ManyToOne as ManyToOneTypeOrm, ObjectType } from 'typeorm';
import { RelationOptions } from 'typeorm/decorator/options/RelationOptions';
import { ArgumentOutOfRangeException } from '../../exceptions';
import { DecoratorHelper } from '../../helpers';
import { StringKeyOf } from '../../model';
import { ForeignKeyColumn, ManyToOneJoinColumn } from '../columns';
import { OnDeleteHelper } from './on-delete-helper';

export function ManyToOne<TEntity, TForeingKey>(
  entityTypeFunction: () => ObjectType<TEntity>,
  foreignKeyTypeFunction: () => ObjectType<TForeingKey>,
  foreignKeyColumnName: string,
  foreignKeyIDProperty: StringKeyOf<TEntity>,
  nullable: boolean = true,
  inverseSide?: (object: TForeingKey) => TEntity[],
  extendedOptions?: RelationOptions): PropertyDecorator {
  if (!foreignKeyIDProperty.endsWith('ID')) {
    console.warn(foreignKeyIDProperty);

    throw new ArgumentOutOfRangeException('foreignKeyIDProperty', 'must ends with ID');
  }

  const cascade = extendedOptions?.cascade ?? ['insert', 'update'];
  const onDelete = OnDeleteHelper.get(cascade, extendedOptions);
  const manyToOneJoinColumnFunc = ManyToOneJoinColumn(foreignKeyColumnName);
  const manyToOneFunc = ManyToOneTypeOrm(foreignKeyTypeFunction, inverseSide, {
    nullable,
    cascade,
    onDelete,
    ...extendedOptions,
  });
  const foreignKeyColumnFunc = DecoratorHelper.buildOtherPropertyDecorator<TEntity>(foreignKeyIDProperty, ForeignKeyColumn(foreignKeyColumnName, nullable));

  return applyDecorators(manyToOneFunc, manyToOneJoinColumnFunc, foreignKeyColumnFunc);
}
