import { applyDecorators } from '@nestjs/common';
import { JoinColumn, ObjectType, OneToOne as OneToOneTypeOrm } from 'typeorm';
import { RelationOptions } from 'typeorm/decorator/options/RelationOptions';
import { ArgumentOutOfRangeException, ArgumentUndefinedException } from '../../exceptions';
import { DecoratorHelper } from '../../helpers';
import { StringKeyOf } from '../../model';
import { ForeignKeyColumn } from '../columns';
import { OnDeleteHelper } from './on-delete-helper';

export function OneToOne<TEntity, TForeingKey>(
  entityTypeFunction: () => ObjectType<TEntity>,
  foreignKeyTypeFunction: () => ObjectType<TForeingKey>,
  foreignKeyColumnNameOrUndefined: string | undefined,
  foreignKeyIDPropertyOrUndefined: StringKeyOf<TEntity> | undefined,
  inverseSide?: (object: TForeingKey) => TEntity,
  nullable: boolean = true,
  extendedOptions?: RelationOptions): PropertyDecorator {
  const cascade = extendedOptions?.cascade ?? (foreignKeyColumnNameOrUndefined ? ['insert', 'update'] : []);
  const onDelete = OnDeleteHelper.get(cascade, extendedOptions);
  const oneToOneFunc = OneToOneTypeOrm(foreignKeyTypeFunction, inverseSide, {
    cascade,
    nullable,
    onDelete,
    ...extendedOptions,
  });

  if (foreignKeyColumnNameOrUndefined) {
    if (!foreignKeyIDPropertyOrUndefined) {
      throw new ArgumentUndefinedException('foreignKeyIDProperty');
    }

    if (!foreignKeyIDPropertyOrUndefined.endsWith('ID')) {
      console.warn(foreignKeyIDPropertyOrUndefined);

      throw new ArgumentOutOfRangeException('foreignKeyIDProperty', 'must ends with ID');
    }

    const oneToOneJoinColumnFunc = JoinColumn({
      name: foreignKeyColumnNameOrUndefined,
    });
    const foreignKeyColumnFunc = DecoratorHelper.buildOtherPropertyDecorator<TEntity>(foreignKeyIDPropertyOrUndefined, ForeignKeyColumn(foreignKeyColumnNameOrUndefined, nullable));

    return applyDecorators(oneToOneFunc, oneToOneJoinColumnFunc, foreignKeyColumnFunc);
  }

  return applyDecorators(oneToOneFunc);
}
