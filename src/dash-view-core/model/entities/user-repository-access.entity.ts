import { Repository, User } from '@dash-view-core';
import { DateTimeColumn, EntityWithSchema, ManyToOne } from '../../decorators';
import { AbstractEntity } from './abstract.entity';

@EntityWithSchema('public.parameters')
export class UserRepositoryAccess extends AbstractEntity<UserRepositoryAccess> {
  @DateTimeColumn('end_date', true)
    endDate: Date;

  @ManyToOne(() => UserRepositoryAccess, () => Repository, 'repository_id', 'repositoryID', false)
    repository: Repository;
  repositoryID: number;

  @ManyToOne(() => UserRepositoryAccess, () => User, 'user_id', 'userID', false)
    user: User;
  userID: number;
}
