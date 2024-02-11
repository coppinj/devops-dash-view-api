import { Generated } from 'typeorm';
import { EntityWithSchema, ManyToOne, UuidColumn } from '../../decorators';
import { AbstractEntity } from './abstract.entity';
import { Repository } from './repository.entity';

@EntityWithSchema('public.pipelines')
export class Pipeline extends AbstractEntity<Pipeline> {
  @UuidColumn('uuid', false, { unique: true })
  @Generated('uuid')
    uuid: string;

  @ManyToOne(() => Pipeline, () => Repository, 'repository_id', 'repositoryID', false)
    repository: Repository;
  repositoryID: number;
}
