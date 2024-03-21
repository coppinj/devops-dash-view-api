import { EntityWithSchema, VarcharColumn } from '../../decorators';
import { AbstractEntity } from './abstract.entity';

@EntityWithSchema('public.repositories')
export class Repository extends AbstractEntity<Repository> {
  @VarcharColumn('name', false)
  name: string;

  @VarcharColumn('url', false)
  url: string;
}
