import { Generated } from 'typeorm';
import { DateTimeColumn, EntityWithSchema, ManyToOne, UuidColumn } from '../../decorators';
import { AbstractEntity } from './abstract.entity';
import { Repository } from './repository.entity';

@EntityWithSchema('public.pipelines')
export class Pipeline extends AbstractEntity<Pipeline> {
  @DateTimeColumn('complete_date', true)
    completeDate: Date;
  
  @UuidColumn('uuid', false, { unique: true })
  @Generated('uuid')
    uuid: string;

  @ManyToOne(() => Pipeline, () => Repository, 'repository_id', 'repositoryID', false)
    repository: Repository;
  repositoryID: number;
}
