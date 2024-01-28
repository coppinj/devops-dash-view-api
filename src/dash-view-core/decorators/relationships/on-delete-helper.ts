import { RelationOptions } from 'typeorm/decorator/options/RelationOptions';
import { OnDeleteType } from 'typeorm/metadata/types/OnDeleteType';

export class OnDeleteHelper {
  static get(
    cascade: boolean | ('insert' | 'update' | 'remove' | 'soft-remove' | 'recover')[],
    extendedOptions?: RelationOptions,
  ): OnDeleteType {
    let onDelete: OnDeleteType = extendedOptions?.onDelete ?? 'NO ACTION';

    delete extendedOptions?.onDelete;

    if (Array.isArray(cascade)) {
      if (cascade.includes('remove')) {
        onDelete = 'CASCADE';
      }
    }

    return onDelete;
  }
}
