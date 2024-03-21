import { DateTimeColumn, EntityWithSchema, ManyToOne } from '../../decorators';
import { AbstractEntity } from './abstract.entity';
import { Repository } from './repository.entity';
import { User } from './user.entity';

@EntityWithSchema('public.repository_user_accesses')
export class RepositoryUserAccess extends AbstractEntity<RepositoryUserAccess> {
  @DateTimeColumn('end_date', true)
  endDate: Date;

  @ManyToOne(() => RepositoryUserAccess, () => Repository, 'repository_id', 'repositoryID', false)
  repository: Repository;
  repositoryID: number;

  @ManyToOne(() => RepositoryUserAccess, () => User, 'user_id', 'userID', false)
  user: User;
  userID: number;
}
