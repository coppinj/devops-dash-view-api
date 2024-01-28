import { Entity } from 'typeorm';
import { ArgumentFormatMismatchException } from '../../exceptions';

export function EntityWithSchema(schemaDotName: string): ClassDecorator {
  if (schemaDotName.indexOf('.') === -1) {
    throw new ArgumentFormatMismatchException('schemaDotName', 'schema.table');
  }

  return Entity({
    schema: schemaDotName.split('.')[0],
    name: schemaDotName.split('.')[1],
  });
}
