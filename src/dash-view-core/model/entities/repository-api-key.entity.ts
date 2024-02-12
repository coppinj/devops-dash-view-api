import { Generated } from 'typeorm';
import { DateTimeColumn, EntityWithSchema, ManyToOne, UuidColumn } from '../../decorators';
import { AbstractEntity } from './abstract.entity';
import { Repository } from './repository.entity';

@EntityWithSchema('public.repository_api_keys')
export class RepositoryApiKey extends AbstractEntity<RepositoryApiKey> {
  @UuidColumn('api_key', false, { unique: true })
  @Generated('uuid')
    apiKey: string;

  @DateTimeColumn('expiration_date', true)
    expirationDate: Date | null;

  @DateTimeColumn('last_accessed_date', true)
    lastAccessedDate: Date | null;

  @ManyToOne(() => RepositoryApiKey, () => Repository, 'repository_id', 'repositoryID', false)
    repository: Repository;
  repositoryID: number;
}
