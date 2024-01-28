import { EntityWithSchema, ManyToOne } from '../../decorators';
import { AbstractEntity } from './abstract.entity';
import { Repository } from './repository.entity';

@EntityWithSchema('public.pipelines')
export class Pipeline extends AbstractEntity<Pipeline> {
  @ManyToOne(() => Pipeline, () => Repository, 'repository_id', 'repositoryID', false)
    repository: Repository;
  repositoryID: number;
}
