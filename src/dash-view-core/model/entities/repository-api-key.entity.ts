import { DateTimeColumn, Repository, VarcharColumn } from '@dash-view-core';
import { EntityWithSchema, ManyToOne } from '../../decorators';
import { AbstractEntity } from './abstract.entity';

@EntityWithSchema('public.repository_api_keys')
export class RepositoryApiKey extends AbstractEntity<RepositoryApiKey> {
  @VarcharColumn('api_key', false, { unique: true })
    apiKey: string;

  @DateTimeColumn('expiration_date', true)
    expirationDate: Date;
  
  @DateTimeColumn('last_access_date', true)
    lastAccessDate: Date;

  @ManyToOne(() => RepositoryApiKey, () => Repository, 'repository_id', 'repositoryID', false)
    repository: Repository;
  repositoryID: number;
}
