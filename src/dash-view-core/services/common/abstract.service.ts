import { EntityManager, Repository } from 'typeorm';
import { AbstractEntity } from '../../model';

export abstract class AbstractService<TEntity extends AbstractEntity<TEntity>> {
  protected constructor(protected readonly repo: Repository<TEntity>) {
  }

  getRepository(): Repository<TEntity> {
    return this.repo;
  }

  protected transaction<TResult>(runInTransaction: (entityManager: EntityManager) => Promise<TResult>): Promise<TResult> {
    return this.repo.manager.transaction(runInTransaction);
  }
}
